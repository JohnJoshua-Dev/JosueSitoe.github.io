/**
 * Collects job openings in my area, scores them against my CV and writes vagas/jobs.json.
 * Runs twice a day in .github/workflows/vagas.yml, which publishes the file to the `vagas-data` branch
 * (so main's history stays clean). Locally:  node tools/fetch-jobs.mjs  (file is gitignored).
 *
 * Sources (all public, no keys):
 *   emprego.co.mz  — Mozambique, IT categories (HTML + JSON-LD on each job page)
 *   Himalayas, Remotive, Jobicy, Remote OK — remote jobs (JSON APIs; each asks for a link back, kept in `url`)
 *
 * Env:
 *   DIGEST_FILE  — if set, writes a Markdown alert (new strong matches + closing deadlines) there,
 *                  and only when there is something to alert. The workflow turns it into a GitHub issue.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { matchJob, guessLang } from '../vagas/match.mjs';

const ROOT = new URL('..', import.meta.url);
const OUTPUT = new URL('vagas/jobs.json', ROOT);
const UA = 'Mozilla/5.0 (compatible; portfolio-job-feed/1.0)';
const DAY = 86400000;

const MIN_SCORE = 40;          // remote jobs below this are dropped
const MIN_SCORE_LOCAL = 20;    // Mozambique jobs are fewer, keep more of them
const MAX_AGE_DAYS = 30;       // remote jobs older than this are dropped
const MAX_JOBS = 200;
const ALERT_SCORE = 60;        // a new job at or above this goes in the alert
const DEADLINE_ALERT_DAYS = 3;
const EXPIRED_KEEP_DAYS = 30;  // closed jobs stay listed (as "prazo terminou") this long after the deadline
const MAX_EXPIRED = 100;

// ---------- helpers ----------
async function get(url, type = 'json') {
    const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: type === 'json' ? 'application/json' : 'text/html' }, signal: AbortSignal.timeout(30000) });
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return type === 'json' ? res.json() : res.text();
}

const decode = (s) => String(s || '')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;|&apos;/g, "'")
    .replace(/&[a-z]+;/gi, ' ');

const toText = (html) => decode(String(html || '')
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<\/(p|li|h\d|div|br)>|<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' '))
    .replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim();

const iso = (v) => {
    if (v == null || v === '') return null;
    const d = typeof v === 'number' || /^\d+$/.test(v) ? new Date(+v * (String(v).length <= 10 ? 1000 : 1)) : new Date(v);
    return isNaN(d) ? null : d.toISOString();
};

const asArray = (v) => Array.isArray(v) ? v : (v ? [v] : []);

// ---------- sources ----------
const MZ_CATEGORIES = ['tecnologias-de-informacao-e-telecomunicacoes', 'infra-estruturas-e-redes'];

async function empregoMz() {
    const open = new Map();
    for (const cat of MZ_CATEGORIES) {
        for (const page of [1, 2]) {
            const url = `https://www.emprego.co.mz/categoria/${cat}/${page > 1 ? `page/${page}/` : ''}`;
            let html;
            try { html = await get(url, 'html'); } catch { break; }
            for (const m of html.matchAll(/<li\s+class=clearfix>([\s\S]*?)<\/li>/g)) {
                const block = m[1];
                const status = block.match(/class="col-1-7 left lowlight">\s*([^<]*?)\s*<\/div>/)?.[1];
                const link = block.match(/href=(https:\/\/www\.emprego\.co\.mz\/vaga\/[^\s>]+)/)?.[1];
                if (!link || !status || /expirado/i.test(status)) continue;
                open.set(link, status);
            }
        }
    }

    const jobs = [];
    for (const [url, status] of open) {
        try {
            const html = await get(url, 'html');
            const ld = [...html.matchAll(/<script type="?application\/ld\+json"?>([\s\S]*?)<\/script>/g)]
                .map(x => { try { return JSON.parse(x[1]); } catch { return null; } })
                .find(x => x && x['@type'] === 'JobPosting') || {};
            const start = html.indexOf('class=medium-large-text>');
            const body = start > 0 ? toText(html.slice(start + 24, start + 20000).split(/<div\s+class="?(share|related|tags)/)[0]) : '';
            const notes = body.split(/\nNotas\n/)[1] || '';
            const [d, mth, y] = status.split('.');
            jobs.push({
                id: `mz-${url.split('/vaga/')[1].replace(/\/$/, '')}`,
                source: 'emprego.co.mz',
                title: decode(ld.title) || url,
                company: decode(ld.hiringOrganization?.name) || '',
                location: `${decode(ld.jobLocation?.address?.addressLocality || 'Moçambique')}, MZ`,
                url,
                posted: iso(ld.datePosted),
                deadline: iso(ld.validThrough) || (y ? iso(`${y}-${mth}-${d}T23:59:00+02:00`) : null),
                tags: [decode(ld.industry)].filter(Boolean),
                description: body || decode(ld.description),
                howToApply: notes.slice(0, 700),
                local: true,
            });
        } catch (e) {
            console.warn(`  ! ${url}: ${e.message}`);
        }
    }
    return jobs;
}

// country=Mozambique returns only jobs open to candidates living in Mozambique.
const HIMALAYAS_QUERIES = ['.net', 'c#', 'asp.net', 'sql server', 'sql', 'laravel', 'php', 'backend', 'full stack', 'software developer', 'software engineer', 'web developer'];
async function himalayas() {
    const seen = new Map();
    for (const q of HIMALAYAS_QUERIES) {
        for (const page of [1, 2]) {
            let d;
            try { d = await get(`https://himalayas.app/jobs/api/search?q=${encodeURIComponent(q)}&country=Mozambique&page=${page}`); } catch { break; }
            for (const j of d.jobs || []) {
                const id = `hi-${j.guid}`;
                if (seen.has(id)) continue;
                const loc = asArray(j.locationRestrictions);
                const location = !loc.length ? 'Worldwide'
                    : loc.length > 6 && loc.includes('Mozambique') ? `${loc.length} países (inclui Mozambique)` : loc.join(', ');
                seen.set(id, {
                    id, source: 'Himalayas', title: j.title, company: j.companyName, location,
                    url: j.applicationLink || j.guid, posted: iso(j.pubDate), deadline: iso(j.expiryDate),
                    tags: asArray(j.categories).slice(0, 8), description: toText(j.description || j.excerpt),
                });
            }
            if (!(d.jobs || []).length || (d.jobs || []).length < 20) break;
        }
    }
    return [...seen.values()];
}

async function remotive() {
    const d = await get('https://remotive.com/api/remote-jobs');
    return (d.jobs || []).map(j => ({
        id: `re-${j.id}`, source: 'Remotive', title: j.title, company: j.company_name,
        location: j.candidate_required_location || 'Worldwide', url: j.url, posted: iso(j.publication_date), deadline: null,
        tags: asArray(j.tags), description: toText(j.description),
    }));
}

async function jobicy() {
    const d = await get('https://jobicy.com/api/v2/remote-jobs?count=100&industry=dev');
    return (d.jobs || []).map(j => ({
        id: `jc-${j.id}`, source: 'Jobicy', title: decode(j.jobTitle), company: j.companyName,
        location: j.jobGeo || 'Anywhere', url: j.url, posted: iso(j.pubDate), deadline: null,
        tags: [...asArray(j.jobIndustry), j.jobLevel].filter(Boolean), description: toText(j.jobDescription || j.jobExcerpt),
    }));
}

async function remoteOk() {
    const d = await get('https://remoteok.com/api');
    return d.filter(j => j.id && j.position).map(j => ({
        id: `ro-${j.id}`, source: 'Remote OK', title: decode(j.position), company: j.company,
        location: j.location || 'Worldwide', url: j.url, posted: iso(j.date), deadline: null,
        tags: asArray(j.tags), description: toText(j.description),
    }));
}

const SOURCES = { 'emprego.co.mz': empregoMz, Himalayas: himalayas, Remotive: remotive, Jobicy: jobicy, 'Remote OK': remoteOk };

// ---------- main ----------
let previous = { jobs: [] };
try { previous = JSON.parse(await readFile(OUTPUT, 'utf8')); } catch { /* first run */ }
const firstSeenById = new Map(previous.jobs.map(j => [j.id, j.firstSeen]));

const now = Date.now();
const nowIso = new Date(now).toISOString();
const sourceStatus = {};
const collected = [];

for (const [name, fn] of Object.entries(SOURCES)) {
    try {
        const list = await fn();
        sourceStatus[name] = { ok: true, fetched: list.length };
        collected.push(...list);
        console.log(`✓ ${name}: ${list.length}`);
    } catch (e) {
        sourceStatus[name] = { ok: false, error: e.message };
        console.warn(`✗ ${name}: ${e.message}`);
    }
}

const byKey = new Map();
for (const job of collected) {
    const ageDays = job.posted ? (now - Date.parse(job.posted)) / DAY : 0;
    if (!job.local && ageDays > MAX_AGE_DAYS) continue;
    if (job.deadline && Date.parse(job.deadline) < now - EXPIRED_KEEP_DAYS * DAY) continue;

    const m = matchJob(job);
    if (m.score < (job.local ? MIN_SCORE_LOCAL : MIN_SCORE)) continue;

    // Same job posted on several boards: keep the best-scored copy.
    const key = `${job.title}|${job.company}`.toLowerCase().replace(/[^a-z0-9|]+/g, '');
    const out = {
        id: job.id, source: job.source, title: job.title.trim(), company: (job.company || '').trim(),
        location: job.location, url: job.url, posted: job.posted, deadline: job.deadline,
        tags: job.tags.slice(0, 10), summary: job.description.slice(0, 700),
        howToApply: job.howToApply || undefined,
        score: m.score, matched: m.matched, missing: m.missing, eligible: m.eligible, local: !!job.local,
        lang: job.local ? guessLang(job) : 'en',
        firstSeen: firstSeenById.get(job.id) || nowIso,
    };
    const prev = byKey.get(key);
    if (!prev || prev.score < out.score) byKey.set(key, out);
}

// Jobs whose deadline passed disappear from the boards (emprego.co.mz lists them as "Expirado"):
// carry them over from the previous run so they stay visible, marked as closed, for EXPIRED_KEEP_DAYS.
const isClosed = (j) => !!j.deadline && Date.parse(j.deadline) < now;
const collectedIds = new Set([...byKey.values()].map(j => j.id));
for (const j of previous.jobs) {
    if (collectedIds.has(j.id) || !isClosed(j) || Date.parse(j.deadline) < now - EXPIRED_KEEP_DAYS * DAY) continue;
    const key = `${j.title}|${j.company}`.toLowerCase().replace(/[^a-z0-9|]+/g, '');
    if (!byKey.has(key)) byKey.set(key, j);
}

const ranked = [...byKey.values()]
    .sort((a, b) => (b.local - a.local) || (b.eligible - a.eligible) || (b.score - a.score) || String(b.posted).localeCompare(String(a.posted)));
const jobs = [
    ...ranked.filter(j => !isClosed(j)).slice(0, MAX_JOBS),
    ...ranked.filter(isClosed).slice(0, MAX_EXPIRED),
];

const data = { updatedAt: nowIso, sources: sourceStatus, jobs };
await writeFile(OUTPUT, JSON.stringify(data, null, 1) + '\n');
console.log(`→ vagas/jobs.json: ${jobs.length} vagas (${jobs.filter(j => j.local).length} em Moçambique, ${jobs.filter(isClosed).length} com prazo terminado)`);

// ---------- alert digest ----------
if (process.env.DIGEST_FILE) {
    const isNew = (j) => !firstSeenById.has(j.id);
    const fresh = jobs.filter(j => isNew(j) && !isClosed(j) && j.eligible && (j.local || j.score >= ALERT_SCORE));
    // Alert a deadline when it crosses the 3-day mark and again on the last day — not on every run.
    const prevRun = previous.updatedAt ? Date.parse(previous.updatedAt) : 0;
    const crossed = (deadline, days) => deadline - now <= days * DAY && deadline - prevRun > days * DAY;
    const closing = jobs.filter(j => {
        if (!j.deadline || !j.eligible || j.score < MIN_SCORE_LOCAL) return false;
        const d = Date.parse(j.deadline);
        return d >= now && (crossed(d, DEADLINE_ALERT_DAYS) || crossed(d, 1));
    });

    if (fresh.length || closing.length) {
        const fmt = (d) => d ? new Date(d).toLocaleDateString('pt-PT', { timeZone: 'Africa/Maputo' }) : '—';
        const row = (j) => `| ${j.score}% | [${j.title.replace(/\|/g, '/')}](${j.url}) | ${j.company.replace(/\|/g, '/')} | ${j.location.replace(/\|/g, '/')} | ${fmt(j.deadline)} |`;
        const table = (list) => ['| Match | Vaga | Empresa | Local | Prazo |', '|---|---|---|---|---|', ...list.slice(0, 25).map(row)].join('\n');
        const parts = [];
        if (closing.length) parts.push(`## ⏰ Prazo a terminar (≤ ${DEADLINE_ALERT_DAYS} dias) — submeta já\n\n${table(closing)}`);
        if (fresh.length) parts.push(`## 🆕 Novas vagas na sua área\n\n${table(fresh)}`);
        await writeFile(process.env.DIGEST_FILE, parts.join('\n\n') + '\n');
        console.log(`→ alerta: ${fresh.length} novas, ${closing.length} com prazo a terminar`);
    }
}

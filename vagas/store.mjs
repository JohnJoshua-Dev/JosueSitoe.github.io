/**
 * My applications, kept in this browser's localStorage (never sent anywhere).
 * Shared by vagas/index.html and vagas/cv-tailor.mjs (same origin, so the CV page sees the same data).
 * Use "Exportar" in the portal to keep a backup / move to another device.
 */
const KEY = 'vagas.v1';

/**
 * Where the daily job feed lives. On GitHub Pages it is the `vagas-data` branch (written by the workflow);
 * when the site is served locally it is vagas/jobs.json from `node tools/fetch-jobs.mjs`.
 */
export const FEED_URL = (() => {
    const host = location.hostname;
    if (host.endsWith('.github.io')) {
        const owner = host.split('.')[0];
        const seg = location.pathname.split('/')[1];
        const repo = !seg || seg === 'vagas' || seg === 'cv' ? host : seg; // user site vs project site
        return `https://raw.githubusercontent.com/${owner}/${repo}/vagas-data/jobs.json`;
    }
    return new URL('./jobs.json', import.meta.url).href;
})();

export async function loadFeed() {
    const res = await fetch(FEED_URL, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

export const STATUSES = [
    { id: 'guardada', label: 'Guardada', icon: 'fa-bookmark', pending: true },
    { id: 'cv', label: 'CV pronto', icon: 'fa-file-circle-check', pending: true },
    { id: 'submetida', label: 'Submetida', icon: 'fa-paper-plane' },
    { id: 'entrevista', label: 'Entrevista', icon: 'fa-comments' },
    { id: 'oferta', label: 'Oferta', icon: 'fa-trophy' },
    { id: 'rejeitada', label: 'Sem sucesso', icon: 'fa-circle-xmark' },
];
export const isPending = (status) => !!STATUSES.find(s => s.id === status)?.pending;

const empty = () => ({ tracked: {}, manual: [], lastVisit: null, notified: {} });

export function load() {
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? { ...empty(), ...JSON.parse(raw) } : empty();
    } catch (_) {
        return empty();
    }
}

export function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); return true; } catch (_) { return false; }
}

/** Sets a job's status, keeping a snapshot of the job so it survives after it leaves the daily feed. */
export function setStatus(state, job, status) {
    const prev = state.tracked[job.id] || {};
    const now = new Date().toISOString();
    state.tracked[job.id] = {
        ...prev,
        status,
        savedAt: prev.savedAt || now,
        submittedAt: status === 'submetida' ? (prev.submittedAt || now) : prev.submittedAt,
        job: snapshot(job),
    };
    return state;
}

export function untrack(state, id) {
    delete state.tracked[id];
    state.manual = state.manual.filter(j => j.id !== id);
    return state;
}

function snapshot(job) {
    const { id, source, title, company, location, url, posted, deadline, score, matched, missing, eligible, lang, local, summary, howToApply } = job;
    return { id, source, title, company, location, url, posted, deadline, score, matched, missing, eligible, lang, local, summary, howToApply };
}

/** Finds a job by id in the feed, my manual jobs or my tracked snapshots. */
export function findJob(state, feedJobs, id) {
    return feedJobs.find(j => j.id === id)
        || state.manual.find(j => j.id === id)
        || state.tracked[id]?.job
        || null;
}

/** Days until the deadline (negative = passed), or null when there is none. */
export function daysLeft(deadline, now = Date.now()) {
    if (!deadline) return null;
    return Math.ceil((Date.parse(deadline) - now) / 86400000);
}

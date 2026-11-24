/**
 * Tailors cv/index.html to one job when opened as  cv/?vaga=<job id>  (from the Candidaturas page).
 *  - picks the CV version that fits the job (Full-Stack / Backend / Frontend / DBA), unless ?perfil= is given
 *  - skills the job asks for are highlighted and moved to the front; a skill hidden in that version but
 *    asked for by the job is shown again (it is real — it just was not in that version's short list)
 *  - the PDF file name gets the company name
 *  - a toolbar (hidden when printing) shows the match and lets me mark the application as ready / submitted
 * Nothing on the CV is invented: only selection, order and emphasis change.
 */
import { cvTagsFor, pickProfile } from './match.mjs';
import { load, save, setStatus, findJob, loadFeed } from './store.mjs';

const params = new URLSearchParams(location.search);
const id = params.get('vaga');
if (id) init().catch(err => console.warn('cv-tailor:', err));

async function init() {
    const state = load();
    let feed = [];
    try { feed = (await loadFeed()).jobs || []; } catch (_) { /* offline: use saved copy */ }
    const job = findJob(state, feed, id);
    if (!job) return showBar(null);

    const wanted = cvTagsFor(job.matched || []);
    const company = (job.company || job.title).replace(/[^\p{L}\p{N} -]+/gu, '').trim();
    const apply = () => {
        emphasise('.skill-line .skill', wanted);
        window.syncCvSkillLines?.();
        document.title = `CV Josue Sitoe - ${company}`.slice(0, 80);
    };
    // Switching version (select) re-filters the CV; tailor again after it.
    document.addEventListener('cv:profile', apply);
    if (typeof window.applyCvProfile === 'function') window.applyCvProfile(params.get('perfil') || pickProfile(job));
    else apply();

    showBar(job, state);
}

function emphasise(selector, wanted) {
    const tags = [...document.querySelectorAll(selector)];
    const groups = new Map();
    for (const el of tags) {
        el.dataset.cvTag ||= el.textContent.trim();
        const hit = wanted.has(el.textContent.trim()) || wanted.has(el.dataset.cvTag);
        el.classList.toggle('ats-match', hit);
        if (hit) el.hidden = false;
        if (!groups.has(el.parentElement)) groups.set(el.parentElement, []);
        groups.get(el.parentElement).push({ el, hit });
    }
    // Matched tags first, otherwise keep the current order. Moving nodes keeps the heading in place.
    for (const [parent, list] of groups) {
        const anchor = list[0].el.previousSibling;
        const ordered = [...list.filter(x => x.hit), ...list.filter(x => !x.hit)];
        let ref = anchor;
        for (const { el } of ordered) {
            parent.insertBefore(el, ref ? ref.nextSibling : parent.firstChild);
            ref = el;
        }
    }
}

function showBar(job, state) {
    const css = document.createElement('style');
    css.textContent = `
        .skill.ats-match { background: #fff3cd; font-weight: 700; }
        .ats-bar { position: sticky; top: 0; z-index: 9999; background: #12141d; color: #cbd5e1; border-bottom: 1px solid rgba(255,255,255,.1);
            padding: 10px 16px; display: flex; flex-wrap: wrap; gap: 8px 16px; align-items: center; font: 14px/1.4 'Segoe UI', Roboto, sans-serif; }
        .ats-bar strong { color: #fff; }
        .ats-bar .ats-score { font-family: monospace; color: #e5b958; font-weight: 700; }
        .ats-bar .ats-miss { color: #fbbf24; font-size: 12px; }
        .ats-bar .ats-actions { margin-left: auto; display: flex; flex-wrap: wrap; gap: 8px; }
        .ats-bar button, .ats-bar a { background: #1a1d2b; color: #cbd5e1; border: 1px solid rgba(255,255,255,.15); border-radius: 8px;
            padding: 6px 10px; font: inherit; font-size: 13px; cursor: pointer; text-decoration: none; }
        .ats-bar .primary { background: #e5b958; color: #1a1406; border-color: #e5b958; font-weight: 700; }
        .ats-bar .done { color: #4ade80; font-size: 13px; }
        @media print { .ats-bar { display: none !important; } .skill.ats-match { background: none; } }`;
    document.head.appendChild(css);

    const bar = document.createElement('div');
    bar.className = 'ats-bar';
    const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const safeUrl = (u) => /^https?:\/\//i.test(u || '') ? u : '#';

    if (!job) {
        bar.innerHTML = `<span>Esta vaga já não está na lista. <a href="../vagas/">Voltar às candidaturas</a></span>`;
        document.body.prepend(bar);
        return;
    }

    const status = () => state.tracked[job.id]?.status;
    const render = () => {
        const s = status();
        bar.innerHTML = `
            <span>CV adaptado para <strong>${esc(job.title)}</strong>${job.company ? ` — ${esc(job.company)}` : ''} · match <span class="ats-score">${job.score ?? '?'}%</span></span>
            ${(job.missing || []).length ? `<span class="ats-miss" title="Pedido na vaga e ausente no CV — não acrescente sem ter a experiência">Em falta: ${job.missing.map(esc).join(', ')}</span>` : ''}
            <span class="ats-actions">
                <a href="../vagas/">← Candidaturas</a>
                <button type="button" class="primary" data-a="print">Gerar PDF</button>
                ${s === 'submetida' || s === 'entrevista' || s === 'oferta' ? '<span class="done">✓ Submetida</span>' : `
                    ${s === 'cv' ? '' : '<button type="button" data-a="cv">Marcar CV pronto</button>'}
                    <a href="${esc(safeUrl(job.url))}" target="_blank" rel="noopener noreferrer">Abrir vaga</a>
                    <button type="button" data-a="submetida">Marcar submetida</button>`}
            </span>`;
    };
    bar.addEventListener('click', (e) => {
        const a = e.target.closest('[data-a]')?.dataset.a;
        if (!a) return;
        if (a === 'print') {
            if (!status()) setStatus(state, job, 'cv');
            save(state);
            render();
            window.print();
            return;
        }
        setStatus(state, job, a);
        save(state);
        render();
    });
    render();
    document.body.prepend(bar);
}

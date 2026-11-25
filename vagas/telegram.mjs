/**
 * Telegram messages to myself through my own bot (official Bot API — free, no third party in between).
 * The bot token and my chat id stay only in this browser's localStorage — never in the repo.
 * Used by vagas/index.html and vagas/cv-tailor.mjs. The daily job alerts are sent by the workflow.
 */
const KEY = 'vagas.telegram';
const api = (token, method) => `https://api.telegram.org/bot${token}/${method}`;
export const TOKEN_RE = /^\d{5,}:[\w-]{30,}$/;

export function getConfig() {
    try {
        const c = JSON.parse(localStorage.getItem(KEY) || 'null');
        return c && c.token && c.chatId ? c : null;
    } catch (_) {
        return null;
    }
}

export function setConfig(config) {
    try {
        if (config) localStorage.setItem(KEY, JSON.stringify(config));
        else localStorage.removeItem(KEY);
        return true;
    } catch (_) {
        return false;
    }
}

async function call(token, method, body = {}) {
    const res = await fetch(api(token, method), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({ ok: false, description: `HTTP ${res.status}` }));
    if (!data.ok) throw new Error(data.description || `HTTP ${res.status}`);
    return data.result;
}

/**
 * Checks the token and finds my chat with the bot (I must have pressed "Start" / sent it a message).
 * Returns { bot, chatId, name } — chatId is null when nobody has written to the bot yet.
 */
export async function connect(token) {
    const me = await call(token, 'getMe');
    const updates = await call(token, 'getUpdates', { allowed_updates: ['message'] });
    const msg = [...updates].reverse().map(u => u.message).find(m => m?.chat?.type === 'private');
    return { bot: me.username, chatId: msg ? String(msg.chat.id) : null, name: msg?.chat.first_name || '' };
}

const h = (s) => String(s ?? '').replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
// Telegram only accepts public http(s) links on buttons.
const okUrl = (u) => /^https?:\/\//i.test(u || '') && !/^https?:\/\/(localhost|127\.|192\.168\.|10\.)/i.test(u);
const portal = (path = '') => new URL(path, new URL('./', import.meta.url)).href;
const fmt = (d) => new Date(d).toLocaleDateString('pt-PT');

/** Sends an HTML message with optional link buttons. Resolves true when Telegram accepted it. */
export async function sendTelegram(html, buttons = [], config = getConfig()) {
    if (!config) return false;
    const row = buttons.filter(b => okUrl(b.url)).map(b => ({ text: b.text, url: b.url }));
    try {
        await call(config.token, 'sendMessage', {
            chat_id: config.chatId,
            text: html,
            parse_mode: 'HTML',
            link_preview_options: { is_disabled: true },
            ...(row.length ? { reply_markup: { inline_keyboard: [row] } } : {}),
        });
        return true;
    } catch (_) {
        return false;
    }
}

export function notifySubmitted(job) {
    return sendTelegram([
        '✅ <b>Candidatura submetida</b>',
        `<b>${h(job.title)}</b> — ${h(job.company || '—')}`,
        `📅 ${fmt(Date.now())}${job.score != null ? ` · match ${job.score}%` : ''}`,
        '',
        'Lembro-o do follow-up se não houver resposta em 7, 14 e 30 dias.',
    ].join('\n'), [
        { text: 'Abrir vaga', url: job.url },
        { text: 'Minhas candidaturas', url: portal('?tab=minhas') },
    ]);
}

export function notifyFollowUp(job, days) {
    return sendTelegram([
        `⏳ <b>${days} dias sem resposta</b>`,
        `<b>${h(job.title)}</b> — ${h(job.company || '—')} (submetida a ${fmt(job.submittedAt)})`,
        '',
        days >= 30
            ? 'Provavelmente não haverá resposta — marque como “Sem resposta”.'
            : 'Boa altura para um follow-up educado (email ou LinkedIn) a reforçar o interesse.',
    ].join('\n'), [
        { text: 'Abrir vaga', url: job.url },
        { text: 'Atualizar estado', url: portal('?tab=minhas') },
    ]);
}

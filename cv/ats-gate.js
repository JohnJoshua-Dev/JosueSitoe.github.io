/**
 * Access gate for the private ATS tailor.
 *
 * The tool itself is published only as cv/ats-tailor.enc.json (AES-256-GCM, key derived from the
 * owner's password with PBKDF2). Without the password the code cannot be read or run — this is
 * real encryption, not a hidden button. Open with cv/?ats=open to get the password prompt.
 * Build the encrypted file with: node tools/build-ats.mjs
 */
(function () {
    'use strict';

    const ENC_URL = 'ats-tailor.enc.json';
    const SESSION_KEY = 'ats-unlock-key';

    const fromB64 = (s) => Uint8Array.from(atob(s), c => c.charCodeAt(0));
    const toB64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));

    async function fetchPayload() {
        const res = await fetch(ENC_URL, { cache: 'no-store' });
        if (!res.ok) throw new Error('Ferramenta indisponível.');
        return res.json();
    }

    async function deriveKey(password, payload) {
        const baseKey = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
        return crypto.subtle.deriveKey(
            { name: 'PBKDF2', hash: 'SHA-256', salt: fromB64(payload.salt), iterations: payload.iter },
            baseKey, { name: 'AES-GCM', length: 256 }, true, ['decrypt']
        );
    }

    async function decryptAndRun(key, payload) {
        // AES-GCM authenticates the data, so a wrong password throws here instead of running garbage.
        const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromB64(payload.iv) }, key, fromB64(payload.data));
        const url = URL.createObjectURL(new Blob([plain], { type: 'text/javascript' }));
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => URL.revokeObjectURL(url);
        document.body.appendChild(script);
    }

    // Same browser tab session: reopen without retyping the password.
    async function tryStoredKey(payload) {
        let raw = null;
        try { raw = sessionStorage.getItem(SESSION_KEY); } catch (_) { return false; }
        if (!raw) return false;
        try {
            const key = await crypto.subtle.importKey('raw', fromB64(raw), 'AES-GCM', false, ['decrypt']);
            await decryptAndRun(key, payload);
            return true;
        } catch (_) {
            try { sessionStorage.removeItem(SESSION_KEY); } catch (__) { /* ignore */ }
            return false;
        }
    }

    function showPrompt(payload) {
        const overlay = document.createElement('div');
        overlay.className = 'ats-gate-overlay';
        overlay.innerHTML = `
            <style>
                .ats-gate-overlay { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: center; justify-content: center;
                    padding: 16px; background: rgba(2, 6, 23, 0.72); backdrop-filter: blur(6px); font-family: inherit; }
                .ats-gate-box { width: 100%; max-width: 380px; background: #0f172a; border: 1px solid #1e293b; border-radius: 16px;
                    padding: 28px 24px; color: #e2e8f0; box-shadow: 0 25px 60px rgba(0,0,0,0.5); }
                .ats-gate-box h2 { margin: 0 0 6px; font-size: 1.15rem; display: flex; align-items: center; gap: 10px; }
                .ats-gate-box h2 i { color: #38bdf8; }
                .ats-gate-box p { margin: 0 0 18px; color: #94a3b8; font-size: 0.85rem; }
                .ats-gate-box input { width: 100%; box-sizing: border-box; padding: 12px 14px; border-radius: 10px; font-size: 0.95rem;
                    background: #020617; border: 1px solid #334155; color: #f1f5f9; outline: none; }
                .ats-gate-box input:focus { border-color: #38bdf8; }
                .ats-gate-error { min-height: 1.2em; margin: 8px 0 0; color: #f87171; font-size: 0.8rem; }
                .ats-gate-actions { display: flex; gap: 10px; margin-top: 14px; }
                .ats-gate-actions button { flex: 1; padding: 11px; border-radius: 10px; font-weight: 700; cursor: pointer; font-size: 0.9rem; }
                .ats-gate-submit { background: #38bdf8; color: #0f172a; border: none; }
                .ats-gate-submit:disabled { opacity: 0.6; cursor: wait; }
                .ats-gate-cancel { background: transparent; color: #cbd5e1; border: 1px solid #334155; }
                @media print { .ats-gate-overlay { display: none !important; } }
            </style>
            <form class="ats-gate-box" autocomplete="off">
                <h2><i class="fas fa-lock"></i> Acesso restrito</h2>
                <p>O Adaptador ATS é uma ferramenta privada. Introduza a password de acesso.</p>
                <input type="password" name="password" placeholder="Password" aria-label="Password" required>
                <div class="ats-gate-error" role="alert"></div>
                <div class="ats-gate-actions">
                    <button type="button" class="ats-gate-cancel">Cancelar</button>
                    <button type="submit" class="ats-gate-submit">Entrar</button>
                </div>
            </form>
        `;
        document.body.appendChild(overlay);

        const form = overlay.querySelector('form');
        const input = form.querySelector('input');
        const error = form.querySelector('.ats-gate-error');
        const submit = form.querySelector('.ats-gate-submit');
        const close = () => overlay.remove();

        overlay.querySelector('.ats-gate-cancel').addEventListener('click', close);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
        input.focus();

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            submit.disabled = true;
            submit.textContent = 'A verificar…';
            error.textContent = '';
            try {
                const key = await deriveKey(input.value, payload);
                await decryptAndRun(key, payload);
                try { sessionStorage.setItem(SESSION_KEY, toB64(await crypto.subtle.exportKey('raw', key))); } catch (_) { /* ignore */ }
                close();
            } catch (_) {
                error.textContent = 'Password incorreta.';
                input.select();
                submit.disabled = false;
                submit.textContent = 'Entrar';
            }
        });
    }

    async function init() {
        const wantsOpen = new URLSearchParams(window.location.search).get('ats') === 'open';
        let hasSession = false;
        try { hasSession = !!sessionStorage.getItem(SESSION_KEY); } catch (_) { /* ignore */ }
        if (!wantsOpen && !hasSession) return;

        let payload;
        try {
            payload = await fetchPayload();
        } catch (_) {
            return;
        }
        if (await tryStoredKey(payload)) return;
        if (wantsOpen) showPrompt(payload);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

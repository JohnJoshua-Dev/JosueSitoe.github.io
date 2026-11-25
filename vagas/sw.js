/**
 * Service worker for the installable "Vagas" app (scope: /vagas/).
 * - App files and the job feed: network first, cached copy when offline — so updates show up at once.
 * - Fonts / icon CSS from CDNs: cached copy first, refreshed in the background.
 * - Notifications: clicking one opens the job (or the portal).
 */
const SHELL = 'vagas-shell-v1';
const RUNTIME = 'vagas-runtime-v1';
const ASSETS = [
    './', './match.mjs', './store.mjs', './telegram.mjs', './manifest.webmanifest',
    './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png',
];
const CDN = /^https:\/\/(fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com)\//;
const FEED = /^https:\/\/raw\.githubusercontent\.com\/.+\/vagas-data\/jobs\.json$/;

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(SHELL).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(caches.keys()
        .then(keys => Promise.all(keys.filter(k => k !== SHELL && k !== RUNTIME).map(k => caches.delete(k))))
        .then(() => self.clients.claim()));
});

async function networkFirst(request, cacheKey = request) {
    const cache = await caches.open(RUNTIME);
    try {
        const res = await fetch(request);
        if (res.ok) cache.put(cacheKey, res.clone());
        return res;
    } catch (err) {
        const hit = await cache.match(cacheKey, { ignoreSearch: true }) || await caches.match(cacheKey, { ignoreSearch: true });
        if (hit) return hit;
        throw err;
    }
}

async function staleWhileRevalidate(request) {
    const cache = await caches.open(RUNTIME);
    const hit = await cache.match(request);
    const fresh = fetch(request).then(res => { if (res.ok || res.type === 'opaque') cache.put(request, res.clone()); return res; }).catch(() => hit);
    return hit || fresh;
}

self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;
    const url = new URL(request.url);
    const scope = new URL(self.registration.scope);

    if (request.mode === 'navigate' && url.href.startsWith(scope.href)) {
        // Any page in scope (incl. ?tab= / share links) is the same app page.
        event.respondWith(networkFirst(request, './'));
    } else if (url.origin === scope.origin && url.href.startsWith(scope.href)) {
        event.respondWith(networkFirst(request));
    } else if (FEED.test(url.href)) {
        event.respondWith(networkFirst(new Request(url.href, { cache: 'no-cache' })));
    } else if (CDN.test(url.href)) {
        event.respondWith(staleWhileRevalidate(request));
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const target = new URL(event.notification.data?.url || './', self.registration.scope).href;
    event.waitUntil((async () => {
        if (target.startsWith(self.registration.scope)) {
            const open = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
            const client = open.find(c => c.url.startsWith(self.registration.scope));
            if (client) return client.focus();
        }
        return self.clients.openWindow(target);
    })());
});

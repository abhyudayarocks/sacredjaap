const CACHE_NAME = 'sacred-jaap-v5';
const URLS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './imageedit_2_3478557917.png',
    './brahma.jpeg',
    './ganesh.jpeg',
    './vishnu.jpeg',
    './durga.jpeg',
    './shiva.jpeg',
    './satyam.jpeg',
    './master_guru.jpeg'
];

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(URLS_TO_CACHE))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});

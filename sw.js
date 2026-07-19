const CACHE_NAME = 'sacred-jaap-v2'; // Increment this number for every future update
const ASSETS = [
  '/', '/index.html', '/manifest.json', '/imageedit_2_3478557917.jpg', 
  '/brahma.jpeg', '/ganesh.jpeg', '/vishnu.jpeg', '/durga.jpg', '/shiva.jpeg', '/satyam.jpeg'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null))));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

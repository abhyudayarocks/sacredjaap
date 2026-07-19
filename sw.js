const CACHE_NAME = 'sacred-jaap-v1';
const urlsToCache = ['/', '/index.html', '/manifest.json', '/imageedit_2_3478557917.jpg', '/brahma.jpeg', '/ganesh.jpeg', '/vishnu.jpeg', '/durga.jpg', '/shiva.jpeg', '/satyam.jpeg'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urlsToCache))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
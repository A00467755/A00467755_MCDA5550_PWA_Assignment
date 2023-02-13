// install service worker
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('my-cache-name-02')
            .then(function (cache) {
                cache.addAll([
                    '/',
                    'https://unpkg.com/dexie/dist/dexie.js',
                    '/index.html',
                    '/script.js',
                    '/db.js',
                    '/manifest.json',
                    '/Carlton_icon.png',
                    '/styles.css'
                ])
            })
    );
    return self.clients.claim();
});

// return cached response
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (res) {
                return res;
            })
    );
});

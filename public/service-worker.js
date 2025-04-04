const CACHE_NAME = 'wanderlust-cache-v1';
const urlsToCache = [
    '/',
    '/listings',
    './layouts/boilerplate',
    './includes/flash',
    './includes/footer',
    './includes/navbar',
    '/css/style.css', // Add paths to your CSS files
    '/javascripts/script.js', // Add paths to your JS files
    '/images/logo.png',       // Add paths to your images
    '/js/map.js'// Add other assets you want to cache
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Cache version
const CACHE_NAME = 'portfolio-cache-v1';

// Files to cache
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/project1.jpg', // Add all your project images here
    '/linkedin-verified.png', // Add other assets like icons
    'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap', // External fonts
];

// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Activate event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return cached response if found, else fetch from network
            return response || fetch(event.request);
        })
    );
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registered'))
        .catch(err => console.log('SW registration failed:', err));
}
const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  './', 
  'Augmentin Junior-01.webp',

  'tablate-01.webp',
  
  'Ladka1.gif',
 
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return Promise.all(urlsToCache.map(url => {
          return fetch(url).then(response => {
            if (!response.ok) {
              throw new Error(`Request for ${url} failed with status ${response.status}`);
            }
            return cache.put(url, response);
          }).catch(error => {
            console.error(`Failed to cache ${url}:`, error);
          });
        }));
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
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
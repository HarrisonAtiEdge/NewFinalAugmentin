const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  './',
  './styles/modstyle.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  './images/Augmentrix-Game-New-3.webp',
  './images/Augmentin Junior-01.webp',
  './images/2-02.png',
  './images/2-01.png',
  './images/2-03.png',
  './images/1.png',
  './images/plain-bg.webp',
  './images/newMissMatch-Bg.webp',
  './images/Wordsearch.webp',
  './images/correct-size-change.gif',
  './images/football_logo-removebg-preview.png',
  './images/GSK Logo.png',
  './images/Ladka1.gif',
  './images/newBuzzerBoard.png',
  './images/Option Board.png',
  './images/OptionBoard.png',
  './images/plain-bg.webp',
  './images/timer_container.png',
  './images/wrong-size-change.gif',
  './images/Augmentrix-Game-New-3-copy.webp',

    //sound files
  './sound/NewTimer15-Sec.mp3',
  './sound/Winning.mp3',
  './sound/wrong-answer-Buzzer.mp3',
  './sound/click.mp3',
  './sound/Background-Music.mp3',

  'https://cdn.jsdelivr.net/npm/tsparticles-confetti/+esm'
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
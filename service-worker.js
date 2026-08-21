const CACHE = 'waldhaus2-product-v36';
const HERO_PARTS = Array.from({length:11},(_,index)=>`./assets/hero-start-clean.v2/part-${String(index+1).padStart(2,'0')}.txt`);
const CORE = [
  './','./index.html','./styles.css','./design-system.css','./precision-polish.css','./quick-card-illustrations.css','./section-hero.css',
  './app.js','./home-hero.js','./home-hero.css','./owner-ops.js','./owner-ops.css','./verified-content.js','./guide-experience.js','./guide-experience.css',
  ...HERO_PARTS,
  './assets/hero-sections-feriendorf.webp',
  './manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'
];
const PRESENTATION_MEDIA = [
  'https://raw.githubusercontent.com/hapo3005/Waldhaus/main/assets/hero-waldhaus.png',
  'https://raw.githubusercontent.com/hapo3005/Waldhaus/main/assets/carousel-activity-hiking.svg',
  'https://raw.githubusercontent.com/hapo3005/Waldhaus/main/assets/carousel-activity-forest.svg',
  'https://raw.githubusercontent.com/hapo3005/Waldhaus/main/assets/carousel-activity-kids.svg',
  'https://raw.githubusercontent.com/hapo3005/Waldhaus/main/assets/carousel-activity-village.svg',
  'https://raw.githubusercontent.com/hapo3005/Waldhaus/main/assets/carousel-dining-coffee.svg',
  'https://raw.githubusercontent.com/hapo3005/Waldhaus/main/assets/carousel-dining-market.svg',
  'https://raw.githubusercontent.com/hapo3005/Waldhaus/main/assets/news-emergency.svg',
  'https://raw.githubusercontent.com/hapo3005/Waldhaus/main/assets/news-wifi.svg'
];
const presentationHosts = new Set(['raw.githubusercontent.com']);

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(async cache => {
        await cache.addAll(CORE);
        await Promise.allSettled(PRESENTATION_MEDIA.map(url => cache.add(url)));
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  const isLocal = url.origin === location.origin;
  const isPresentationMedia = presentationHosts.has(url.hostname) && PRESENTATION_MEDIA.includes(url.href);
  if (!isLocal && !isPresentationMedia) return;

  const isAppAsset = isLocal && (
    event.request.mode === 'navigate' ||
    ['document','script','style','manifest'].includes(event.request.destination) ||
    /\.(html|js|css|webmanifest)$/.test(url.pathname)
  );

  if (isAppAsset) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy=response.clone();
          caches.open(CACHE).then(cache=>cache.put(event.request,copy));
          return response;
        })
        .catch(async () => {
          const cached=await caches.match(event.request);
          if(cached) return cached;
          if(event.request.mode==='navigate') return caches.match('./index.html');
          return Response.error();
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE).then(cache=>cache.put(event.request, copy));
        return response;
      }).catch(() => Response.error());
    })
  );
});

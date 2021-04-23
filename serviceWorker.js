const staticCacheName = 'Rahul-Kumar-Jha-static-v1.1.0';
const assets = [
"/",
"/index.html",
"/assets/css/style.css",
"/assets/js/main.js",
"/assets/img/portfolio/a1.jpg",
"/assets/img/portfolio/a2.jpg",
"/assets/img/portfolio/a3.jpg",
"/assets/img/portfolio/a4.jpg",

"/assets/img/portfolio/erp2.jpg",
"/assets/img/portfolio/hrms.jpg",
"/assets/img/portfolio/i1.jpg",
"/assets/img/portfolio/i2.jpg",

"/assets/img/portfolio/p1.jpg",
"/assets/img/portfolio/POS.jpg",
"/assets/img/portfolio/py.jpg",
"/assets/img/portfolio/w1.jpg",

"/assets/img/bg6.jpg",
"/assets/img/favicon.png",
"/assets/img/hero-bg.jpg",
"/assets/img/hero-bg1.jpg",
"/assets/img/hero-bg6.jpg",
"/assets/img/Profile-img.jpg",
"/assets/img/Profile-img3.jpg",
"/assets/css/rahul.css",
"/assets/vendor/aos/aos.css",
"/assets/vendor/bootstrap/css/bootstrap.min.css",
"/assets/vendor/bootstrap-icons/bootstrap-icons.css",
"/assets/vendor/boxicons/css/boxicons.min.css",
"/assets/vendor/glightbox/css/glightbox.min.css",
"/assets/vendor/aos/aos.js"

];

// install event
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      return cache.addAll(assets)
      .catch(err =>{
        console.error('Error adding files to cache',err);
      })
    })
    )
  console.info('SW installed');
  self.skipWaiting();
});

// activate event
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
        );
    })
    );
  return self.clients.claim();
});

// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
    );
});

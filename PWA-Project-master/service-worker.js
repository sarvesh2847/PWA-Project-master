const staticDevCoffee = "FoodApp-v1"
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/about.html",
  "/blog.html",
  "/contact.html",
  "/menu.html",
  "/products.html",
  "/review.html",
  "/Rocket.png",
]

// self.addEventListener("install", installEvent => {
//   installEvent.waitUntil(
//     caches.open(staticDevCoffee).then(cache => {
//       cache.addAll(assets)
//     })
//   )
// })

// this.addEventListener('fetch', function (event) {
//   // it can be empty if you just want to get rid of that error
// });

// importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.0/workbox-sw.js");

// workbench.routing.registerRoute(
//   ({ request }) => request.destination === 'image',
//   new workbox.strategies.NetworkFirst()
// );


var cacheName = 'geeks-cache-v1';
var cacheAssets = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/about.html",
  "/blog.html",
  "/contact.html",
  "/menu.html",
  "/products.html",
  "/review.html",
  "/Rocket.png",
];

// Call install Event
self.addEventListener('install', e => {
  // Wait until promise is finished 
  e.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log(`Service Worker: Caching Files: ${cache}`);
        cache.addAll(cacheAssets)
          // When everything is set
          .then(() => self.skipWaiting())
      })
  );
})


// Call Activate Event
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  // Clean up old caches by looping through all of the
  // caches and deleting any old caches or caches that
  // are not defined in the list
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(
          cache => {
            if (cache !== cacheName) {
              console.log('Service Worker: Clearing Old Cache');
              return caches.delete(cache);
            }
          }
        )
      )
    })
  );
})

var cacheName = 'geeks-cache-v1';

// Call Fetch Event 
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // The response is a stream and in order the browser 
        // to consume the response and in the same time the 
        // cache consuming the response it needs to be 
        // cloned in order to have two streams.
        const resClone = res.clone();
        // Open cache
        caches.open(cacheName)
          .then(cache => {
            // Add response to cache
            cache.put(e.request, resClone);
          });
        return res;
      }).catch(
        err => caches.match(e.request)
          .then(res => res)
      )
  );
});
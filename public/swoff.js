var versionNum = 'v3.5';
var cacheName = 'scheduler-' + versionNum;
var dynamicCache = 'dynamic-' + versionNum;
var filesToCache = [ /* array of filenames referenced by relativity */

];

let deferredPrompt;
self.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  showInstallPromotion();
});


/* install service worker and cache files needed in offline mode */
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache).then(() => {
        console.log("Service Worker Installed");
      }).catch(error => console.log(error)); //need to handle addAll since if one fails they all fail
    })
  );
});

/*  fired when the service worker has been installed and again when  */
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(keys => {  //caches.keys returns the keys of the caches in the browser - ie: dynamic-v5
      return Promise.all(keys /*takes array of promises (our keys), when each resolves the return is resolves - forces js to wait*/
        .filter(key => key !== cacheName) /* if the caches found dont match the name, it is kept in the array then we map the delete function to it */
        .map(key => caches.delete(key))) /* caches.delete is a promise to delete a cache */
    })
  )
  //console.log('Service worker activated; now ready to handle fetches!');
});


self.addEventListener('fetch', event => {
  if (event.request.url.indexOf('firestore.googleapis.com') === -1) { //dont want to store any googleapi calls from firebase
    event.respondWith(
      caches.match(event.request).then(response => { //response will be the matched file 
        return response || fetch(event.request).then(fetchRes => { //if cannot get file from the cache, return original request and attempt to get from server - which once retrieved, carry on with alias "fetchRes"
          return caches.open(dynamicCache).then(cache => { //when response comes back, we take that response "fetchRes", open the dynamic cache and put the response for that new page, stored for the future
            const cacheClone = fetchRes.clone();
            cache.put(event.request.url, cacheClone); // add & addAll go to the server, get the resource and place it in the cache
            limitCacheSize(filesToCache, 15); //(above) clone fetchRes event object as we dont want to use up the return of the event without returning something to the user - we need to return fetchRes tot he user but also cache it
            //console.log("into the dynamic cache putting " + event.request.url);
            return fetchRes;
          })
        })
      }).catch(e => {
        if (event.request.url.indexOf('.html') > -1) {
          return caches.match('/error.html');
        }
      })
    ); // endevent.respondwith
  }
});

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

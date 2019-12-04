var cache = 'v1'; 
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/it202-bigproject',
        '/it202-bigproject/index.html/',
        '/it202-bigproject/feedback.html/',
        '/it202-bigproject/image.png/',
        '/it202-bigproject/sign-in.html/',
        '/it202-bigproject/assets/javascript/app.js',
         '/it202-bigproject/assets/css/reset.css',
         '/it202-bigproject/assets/css/style.css',
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();
        
        caches.open('v1').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('./image.png');
      });
    }
  }));
});



        
        
      

 
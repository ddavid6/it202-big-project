   
var cacheName = 'app-v3';
var appShellFiles = [
      '/it202-bigproject',
        '/it202-bigproject/index.html/',
        '/it202-bigproject/feedback.html/',
         '/it202-bigproject/image.png/',
        '/it202-bigproject/sign-in.html/',
        '/it202-bigproject/assets/javascript/app.js',
         '/it202-bigproject/assets/css/reset.css',
         '/it202-bigproject/assets/css/style.css',
];


//installs all the files as back up
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(appShellFiles);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      console.log('[Service Worker] Fetching resource: '+ e.request.url);
      
      return r || fetch(e.request).then(function(response) {
          return caches.open(cacheName).then(function(cache) {
            console.log('[Service Worker] Caching new resource: '+e.request.url);
            cache.put(e.request, response.clone());
            return response;
        });
      });
    })
  );
});

 



        
        
      

   
/*    
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Stash the event so it can be triggered later.
  deferredPrompt = e;


    // Update UI notify the user they can add to home screen
  showInstallPromotion();

    
    btnAdd.addEventListener('click', (e) => {
  // hide our user interface that shows our A2HS button
  btnAdd.style.display = 'none';
  // Show the prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
});
});    
*/  
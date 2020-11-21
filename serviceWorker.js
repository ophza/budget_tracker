const CACHE_NAME = "stored-cache";
const urlsToCache = [
   "/",
   "./public/icons/icon-192x192.png",
   "./public/icons/icon-512x512.png",
   "./public/index.html",
   "./public/index.js",
   "./public/styles.css",
   "./routes/api.js",
   "./models/transaction.js",
   "./server.js",
   "./api/transaction/bulk",
   "./api/transaction",
   "https://cdn.jsdelivr.net/npm/chart.js@2.8.0",
   "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
]

self.addEventListener("install", (event) => {
   event.waitUntil(
      chaches.open(CACHE_NAME)
         .then((cache) => {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
      })
   );
});

self.addEventListener("fetch", (event) => {
   event.respondWith(
      caches.match(event.request)
         .then((response) => {
            if(response){
               return response;
            }

            return fetch(event.request).then(
               (response) => {
                  if(!response || response.status !== 200 || response.type !== "basic"){
                     return response;
                  }

                  const responseToCache = response.clone();

                  caches.open(CACHE_NAME)
                     .then((cache) => {
                        cache.put(event.request, responseToCache);
                  });

                  return response;
               }
            )
      })
   )
})
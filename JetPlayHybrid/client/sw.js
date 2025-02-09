// Declare cache name
const staticCacheName = "site-static-v1";
// Select the items to be cached and add it to the array
const assets = [
    "/html/index.html",
    "/css/index.css",
    "/js/app.js",
    "/js/index.js",
    "/js/offline-socket.js",
    "https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.js",
    "/manifest.json",
    "/img/icons/ic_app_launcher-playstore.png",
    "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap",
    "https://fonts.gstatic.com/s/materialsymbolsoutlined/v226/kJEhBvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oFsI.woff2",
    "https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap",
    "https://fonts.gstatic.com/s/oxygen/v15/2sDcZG1Wl4LcnbuCJW8zZmW5O7w.woff2",
    "https://fonts.gstatic.com/s/oxygen/v15/2sDcZG1Wl4LcnbuCJW8zaGW5.woff2",
    "https://fonts.gstatic.com/s/oxygen/v15/2sDfZG1Wl4LcnbuKgE0mV0Q.woff2",
    "https://fonts.gstatic.com/s/oxygen/v15/2sDfZG1Wl4LcnbuKjk0m.woff2",
    "https://fonts.gstatic.com/s/oxygen/v15/2sDcZG1Wl4LcnbuCNWgzZmW5O7w.woff2",
    "https://fonts.gstatic.com/s/oxygen/v15/2sDcZG1Wl4LcnbuCNWgzaGW5.woff2",
    "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
    "https://fonts.gstatic.com/s/poppins/v22/pxiAyp8kv8JHgFVrJJLmE0tMMPKzSQ.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiAyp8kv8JHgFVrJJLmE0tCMPI.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiDyp8kv8JHgFVrJJLmv1pVGdeOcEg.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiDyp8kv8JHgFVrJJLmv1pVF9eO.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiDyp8kv8JHgFVrJJLm21lVGdeOcEg.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiDyp8kv8JHgFVrJJLm21lVF9eO.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiGyp8kv8JHgFVrJJLufntAKPY.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiGyp8kv8JHgFVrJJLucHtA.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiDyp8kv8JHgFVrJJLmg1hVGdeOcEg.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiDyp8kv8JHgFVrJJLmg1hVF9eO.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiDyp8kv8JHgFVrJJLmr19VGdeOcEg.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiDyp8kv8JHgFVrJJLmr19VF9eO.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiDyp8kv8JHgFVrJJLmy15VGdeOcEg.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiDyp8kv8JHgFVrJJLmy15VF9eO.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiDyp8kv8JHgFVrJJLm111VGdeOcEg.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiDyp8kv8JHgFVrJJLm111VF9eO.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiDyp8kv8JHgFVrJJLm81xVGdeOcEg.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiDyp8kv8JHgFVrJJLm81xVF9eO.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiGyp8kv8JHgFVrLPTufntAKPY.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiGyp8kv8JHgFVrLPTucHtA.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLFj_Z1JlFc-K.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLFj_Z1xlFQ.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLDz8Z1JlFc-K.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLDz8Z1xlFQ.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiEyp8kv8JHgFVrJJnecmNE.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiEyp8kv8JHgFVrJJfecg.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLGT9Z1JlFc-K.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLEj6Z1JlFc-K.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLCz7Z1JlFc-K.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLDD4Z1JlFc-K.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLDD4Z1xlFQ.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLBT5Z1JlFc-K.woff2",
    "https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLBT5Z1xlFQ.woff2",
    "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
    "https://fonts.gstatic.com/s/roboto/v47/KFO5CnqEu92Fr1Mu53ZEC9_Vu3r1gIhOszmkCnkaWzU.woff2",
    "https://fonts.gstatic.com/s/roboto/v47/KFO5CnqEu92Fr1Mu53ZEC9_Vu3r1gIhOszmkenkaWzU.woff2",
    "https://fonts.gstatic.com/s/roboto/v47/KFO5CnqEu92Fr1Mu53ZEC9_Vu3r1gIhOszmkaHkaWzU.woff2",
    "https://fonts.gstatic.com/s/roboto/v47/KFO5CnqEu92Fr1Mu53ZEC9_Vu3r1gIhOszmkCHkaWzU.woff2",
    "https://fonts.gstatic.com/s/roboto/v47/KFO5CnqEu92Fr1Mu53ZEC9_Vu3r1gIhOszmkBnka.woff2",
    "https://fonts.gstatic.com/s/roboto/v47/KFO5CnqEu92Fr1Mu53ZEC9_Vu3r1gIhOszmkC3kaWzU.woff2",
    "https://fonts.gstatic.com/s/roboto/v47/KFO5CnqEu92Fr1Mu53ZEC9_Vu3r1gIhOszmkAnkaWzU.woff2",
    "https://fonts.gstatic.com/s/roboto/v47/KFO5CnqEu92Fr1Mu53ZEC9_Vu3r1gIhOszmkBXkaWzU.woff2",
    "https://fonts.gstatic.com/s/roboto/v47/KFO5CnqEu92Fr1Mu53ZEC9_Vu3r1gIhOszmkCXkaWzU.woff2"
];
// Install service worker...
/**
 * Service worker installation is called whenever we file code changes before activation.
 * But activation process must be called manually
 */

self.oninstall = (evt) => {
    console.log("Service worker has been installed", evt);
    // Let's install caches either using addAll or add functions
    // Since we can't be certain if caching is complete, so in order to prevent early finishing of install events
    evt.waitUntil(caches.open(staticCacheName).then((cache) => {
        console.log("Caching all assets", cache);
        cache.addAll(assets).then((value) => {
            console.log("Caching is complete", value);
        }).catch((err) => console.error("Error while caching files", err))
    }));
};
// Activate service worker
/**
 * Note: You can't activate a service worker manually but can only listen to activate events
 * */
self.addEventListener("activate", (evt) => {
    console.log("Service Worker has been activated");
    // Clear old cache when a new Service Worker is activated...
    evt.waitUntil(caches.keys().then((keys) => {
        return Promise.all(keys.map((key) => {
            if (key !== staticCacheName) {
                return caches.delete(key); // Remove old cache
            }
        })).catch((err) => console.error("Sorry, an error occurred", err));
    }).catch((err) => console.error("Sorry, an error occurred", err)));
});
// Let's listen to fetch events
self.addEventListener("fetch", (evt) => {
    console.log("Fetch evt", evt);
    // We'll pause default fetch event and respond with our custom event
    evt.respondWith(// Check if the caches can match the request in assets array
        caches.match(evt.request).then((cacheResponse) => {
            // That's if there's a matching cache then return it back to the browser, but we'll not return empty cache instead return the original cache request
            return cacheResponse !== undefined && cacheResponse !== null ? cacheResponse : fetch(evt.request);
        }).catch((err) => console.error("Error occurred while fetching", err)))
});
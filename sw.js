const staticContentCacheName = 'colex-statcon-v1';
const dynamicContentCacheName = 'colex-dyncon-v1'
const staticAssets = [
    './index.html',
    './app.js',
    './chroma.min.js',
    './example.jpg',
    './main.js',
    './main.css',
    './imgUploader.js',
    'aditionalStyle.css'

]
self.addEventListener('install', (evt) => {
    // console.log('service worker installed');
    evt.waitUntil(caches.open(staticContentCacheName)
        .then(cache => {
            console.log('saving appshell');
            cache.addAll(staticAssets)
        }))
})

self.addEventListener('activate', (evt) => {
    // console.log('service worker activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => { key !== staticContentCacheName && dynamicContentCacheName })
                .map(key => caches.delete(key)))
        })
    )
})

self.addEventListener('fetch', (evt) => {
    // console.log('fetch', evt);
    evt.respondWith(
        caches.match(evt.request)
            .then((cachRes) => {
                return cachRes || fetch(evt.request)
                    .then(fetchRes => {
                        return caches.open(dynamicContentCacheName)
                            .then(cache => {
                                cache.put(evt.request.url, fetchRes.clone())
                                return fetchRes
                            })
                    })
            })
    )
})
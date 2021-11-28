importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

workbox.precaching.precacheAndRoute(
    [
        { url: './index.html', revision: null },
        { url: './app.js', revision: null },
        { url: './js/chroma.min.js', revision: null },
        { url: './example.jpg', revision: null },
        { url: './js/main.js', revision: null },
        { url: './css/main.css', revision: null },
        { url: './js/imgUploader.js', revision: null },
        { url: './css/aditionalStyle.css', revision: null },
        { url: './manifest.webmanifest', revision: null },
        { url: './offline.html', revision: null },
        { url: './css/offline.css', revision: null }
    ]
);

workbox.routing.registerRoute(
    new RegExp('[^\/]+\.html|[^\/]+\.css|[^\/]+\.js|[^\/]+\.png'),
    new workbox.strategies.CacheFirst()
);

workbox.routing.setCatchHandler(async context => {
    if (context.request.destination === 'document') {
        return workbox.precaching.matchPrecache('offline.html')
    }
    return Response.error();
})
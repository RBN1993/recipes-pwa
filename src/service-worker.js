/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

// Precarga la app
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// App Shell
workbox.routing.registerNavigationRoute('/index.html');

//Activar el uso de Google Analytics offline en workbox
workbox.googleAnalytics.initialize();

/**
 * El orden en que se escriben las estrategias de carga es importante
 * va del más restrictivo al por defecto
 */

// La API usa Stale While Revalidate para mayor velocidad en este caso solo para los GET
// (Pero requiere recargar para ver nuevos cambios, con  lo cual es necesaria conexión)
workbox.routing.registerRoute(
  /^https?:\/\/www.themealdb.com\/api\/.*/,
  workbox.strategies.staleWhileRevalidate(),
  'GET'
);

//Tiene un regex para matchear los dos dominios de google Apis
workbox.routing.registerRoute(
  /^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 30 * 24 * 60 * 60, //Un mes
      }),
    ],
  }),
  'GET'
);

//Tiene un regex para matchear las imagenes de mealdb
workbox.routing.registerRoute(
  /^https?:\/\/www.themealdb.com\/images\/.*/,
  workbox.strategies.cacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 7 * 24 * 60 * 60, //Una semana
        maxEntries: 20,
      }),
    ],
  }),
  'GET'
);

// Todo lo demás usa Network First (La por defecto va al final del todo)
workbox.routing.registerRoute(
  /^https?:\/\/www.themealdb.com\/api\/.*/,
  workbox.strategies.networkFirst(),
  'GET'
);

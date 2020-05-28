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

/**
 * El orden en que se escriben las estrategias de carga es importante
 * va del más restrictivo al por defecto
 */

// La API usa Stale While Revalidate para mayor velocidad en este caso solo para los GET
// (Pero requiere recargar para ver nuevos cambios)
workbox.routing.registerRoute(
  /^https?:\/\/www.themealdb.com\/api\/.*/,
  workbox.strategies.staleWhileRevalidate(),
  'GET'
);

// Todo lo demás usa Network First (La por defecto va al final del todo)
workbox.routing.registerRoute(
  /^https?.*/,
  workbox.strategies.networkFirst(),
  'GET'
);

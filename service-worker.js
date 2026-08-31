/*
 * Sylvia's Gedichteecke – Service Worker
 *
 * Die App läuft auf einem fremden Gerät, auf dem niemand Fehler beheben kann.
 * Deshalb liegt alles im Browser-Cache: Sie startet auch ohne Netz, und eine
 * neue Fassung übernimmt erst, wenn die App geschlossen und neu geöffnet wird
 * – nicht mitten im Schreiben eines Gedichts.
 *
 * Zwei Funktionen brauchen weiterhin Internet und sagen das auch selbst:
 * die Wikisource-Suche nach gemeinfreien Texten und die Texterkennung aus
 * Buchfotos.
 *
 * WICHTIG bei Änderungen: VERSION hochzählen.
 */

const VERSION = '2026-08-31-2';
const CACHE = 'gedichteecke-' + VERSION;

const DATEIEN = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './react.js',
  './react-dom.js',
  './app.js',
  './font-fraunces.woff2',
  './font-fraunces-italic.woff2',
  './font-sourceserif.woff2',
  './font-sourceserif-italic.woff2',
  './font-spacemono-400.woff2',
  './font-spacemono-700.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Jede Datei frisch holen statt über den Browser-Cache: sonst kann eine
    // veraltete Fassung im neuen Cache landen und dort festgefroren bleiben.
    await Promise.all(DATEIEN.map(async (pfad) => {
      const trenner = pfad.includes('?') ? '&' : '?';
      const antwort = await fetch(new Request(pfad + trenner + 'sw=' + VERSION, { cache: 'reload' }));
      if (!antwort.ok) throw new Error('Konnte ' + pfad + ' nicht laden (' + antwort.status + ')');
      await cache.put(pfad, antwort);
    }));
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((namen) => Promise.all(
        namen.filter((n) => (n.startsWith('gedichteecke-') || n.startsWith('literatura-')) && n !== CACHE)
             .map((n) => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const anfrage = event.request;
  if (anfrage.method !== 'GET') return;

  // Wikisource und die Texterkennung gehen immer ans Netz und regeln ihr
  // Scheitern selbst – hier nichts abfangen.
  if (new URL(anfrage.url).origin !== self.location.origin) return;

  if (anfrage.mode === 'navigate') {
    event.respondWith(
      fetch(anfrage)
        .then((antwort) => {
          const kopie = antwort.clone();
          caches.open(CACHE).then((cache) => cache.put('./index.html', kopie));
          return antwort;
        })
        .catch(() => caches.match('./index.html').then((t) => t || caches.match('./')))
    );
    return;
  }

  event.respondWith(
    caches.match(anfrage).then((treffer) => treffer || fetch(anfrage).then((antwort) => {
      if (antwort && antwort.status === 200 && antwort.type === 'basic') {
        const kopie = antwort.clone();
        caches.open(CACHE).then((cache) => cache.put(anfrage, kopie));
      }
      return antwort;
    }))
  );
});

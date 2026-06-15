// Einfacher Service Worker: macht die App installierbar und offline-fähig.
// Strategie: Netzwerk zuerst, bei Offline-Betrieb Fallback auf den Cache.
const CACHE = 'hanlu-v1'

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return
  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      try {
        const res = await fetch(e.request)
        if (res.ok) cache.put(e.request, res.clone())
        return res
      } catch {
        const treffer = await cache.match(e.request, { ignoreSearch: true })
        return treffer || cache.match('./index.html')
      }
    })
  )
})

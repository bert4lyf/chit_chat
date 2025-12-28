const CACHE_NAME = 'chit-chat-v1'
const urlsToCache = ['/', '/index.html', '/manifest.json', '/icons/icon-192.svg', '/icons/icon-512.svg']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key)
        })
      )
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  // Only handle GET requests
  if (request.method !== 'GET') return

  event.respondWith(
    caches.match(request).then((response) => {
      if (response) return response
      return fetch(request).then((networkResponse) => {
        // Cache new GET responses for navigation and assets
        if (networkResponse && networkResponse.status === 200 && request.destination !== 'document') {
          const copy = networkResponse.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
        }
        return networkResponse
      }).catch(() => caches.match('/'))
    })
  )
})
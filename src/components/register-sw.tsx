"use client"

import { useEffect } from "react"

export default function RegisterSW() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then((registration) => {
        // optional: listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // A new service worker is installed and waiting. You could prompt the user to refresh.
                // console.log('New content is available; please refresh.')
              }
            })
          }
        })
      }).catch((err) => {
        console.warn('Service worker registration failed:', err)
      })
    }
  }, [])

  return null
}
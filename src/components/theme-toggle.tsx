"use client"

import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark"
    const stored = localStorage.getItem("theme")
    if (stored === "light" || stored === "dark") return stored
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
  })

  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", theme)
      localStorage.setItem("theme", theme)
    } catch (e) {
      // noop
    }
  }, [theme])

  return (
    <button
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      title="Toggle theme"
      aria-pressed={theme === "dark"}
      className="fixed bottom-4 right-4 z-50 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 p-3 rounded-full shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
    >
      {theme === "dark" ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364-1.414 1.414M7.05 16.95l-1.414 1.414M16.95 16.95l1.414 1.414M7.05 7.05L5.636 5.636" />
          <circle cx="12" cy="12" r="3" stroke="currentColor" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  )
}

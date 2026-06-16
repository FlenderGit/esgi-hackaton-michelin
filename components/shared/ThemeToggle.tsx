'use client'

import { useState, useEffect, startTransition } from 'react'

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
    </svg>
  )
}

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('q-theme') === 'light'
    if (stored) {
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    startTransition(() => setIsLight(stored))
  }, [])

  function toggle() {
    const next = !isLight
    setIsLight(next)
    if (next) {
      document.documentElement.setAttribute('data-theme', 'light')
      localStorage.setItem('q-theme', 'light')
    } else {
      document.documentElement.removeAttribute('data-theme')
      localStorage.removeItem('q-theme')
    }
  }

  return (
    <button
      onClick={toggle}
      title={isLight ? 'Passer en mode sombre' : 'Passer en mode clair'}
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-q-border text-q-text-muted hover:text-q-text hover:border-q-border-sub transition-all duration-200 text-xs font-medium cursor-pointer"
    >
      {isLight ? <MoonIcon /> : <SunIcon />}
      <span>{isLight ? 'Sombre' : 'Clair'}</span>
    </button>
  )
}

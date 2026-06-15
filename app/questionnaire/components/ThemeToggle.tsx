'use client'

import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('q-theme')
    if (saved === 'light') {
      setIsLight(true)
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
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
      <span>{isLight ? '☽' : '☀'}</span>
      <span>{isLight ? 'Sombre' : 'Clair'}</span>
    </button>
  )
}

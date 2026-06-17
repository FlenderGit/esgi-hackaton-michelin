'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('q-theme') === 'light'
    if (stored) document.documentElement.setAttribute('data-theme', 'light')
    else document.documentElement.removeAttribute('data-theme')
    setIsLight(stored)
    setMounted(true)
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

  if (!mounted) return <div className="w-9 h-9" />

  return (
    <button
      onClick={toggle}
      title={isLight ? 'Passer en mode sombre' : 'Passer en mode clair'}
      className="flex items-center justify-center w-9 h-9 rounded-full border border-q-border/40 text-q-text-muted hover:text-q-text hover:border-q-border transition-all duration-200 cursor-pointer"
    >
      {isLight
        ? <Moon size={16} strokeWidth={2} />
        : <Sun size={16} strokeWidth={2} />
      }
    </button>
  )
}

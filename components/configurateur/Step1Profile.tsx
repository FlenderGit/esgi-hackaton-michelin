'use client'

import { useState } from 'react'
import type { RiderProfile, WizardAnswers } from '@/app/configurateur/data'
import { RIDER_PROFILES } from '@/app/configurateur/data'

const BLUE = '#27509B'

const PROFILE_ICONS: Record<RiderProfile, React.ReactNode> = {
  grand_rouleur: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  ),
  reprise_vtt: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
    </svg>
  ),
  debutant: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M12 3L1 9l4 2.18V15c0 .88.39 1.67 1 2.22V20h10v-2.78c.61-.55 1-1.34 1-2.22v-3.82L23 9l-11-6zm4 10.82V15c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1v-1.18L12 16l4-2.18zM12 14L5.45 10.5 12 5.09l6.55 5.41L12 14z" />
    </svg>
  ),
  competiteur: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
    </svg>
  ),
  balades: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
    </svg>
  ),
  velotaf: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5S3.1 13.5 5 13.5 8.5 15.1 8.5 17 6.9 20.5 5 20.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V11c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 10.4C7.3 10.8 7 11.4 7 12c0 .6.3 1.2.8 1.6l3.2 2.4V20h2v-5l-3.2-2.4 3-3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z" />
    </svg>
  ),
}

interface Step1ProfileProps {
  answers: WizardAnswers
  onChange: (profile: RiderProfile) => void
}

export default function Step1Profile({ answers, onChange }: Step1ProfileProps) {
  const [showAll, setShowAll] = useState(false)

  const visibleMobile = showAll ? RIDER_PROFILES : RIDER_PROFILES.slice(0, 4)

  return (
    <div className="space-y-8" style={{ animation: 'fadeSlideIn 0.3s ease-out both' }}>
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight" style={{ color: '#0D1526' }}>
          Quel rouleur es-tu&nbsp;?
        </h1>
        <p className="text-base text-gray-500">
          On adapte les questions suivantes à ton profil.{' '}
          <span style={{ color: BLUE }}>Tu pourras affiner ensuite.</span>
        </p>
      </div>

      {/* Desktop: 3×2 grid */}
      <div className="hidden sm:grid sm:grid-cols-3 gap-4">
        {RIDER_PROFILES.map((p) => {
          const sel = answers.profile === p.id
          return (
            <button
              key={p.id}
              onClick={() => onChange(p.id)}
              aria-pressed={sel}
              className="group relative flex flex-col items-start gap-4 p-6 rounded-2xl text-left transition-all duration-200 cursor-pointer"
              style={{
                background: sel ? 'rgba(39,80,155,0.06)' : '#FFFFFF',
                border: sel ? `2px solid ${BLUE}` : '1.5px solid #E2E8F0',
                boxShadow: sel ? 'none' : '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              {/* Checkmark badge */}
              {sel && (
                <span
                  className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 rounded-full"
                  style={{ background: BLUE }}
                >
                  <svg viewBox="0 0 12 12" fill="none" width="10" height="10">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}

              {/* Icon */}
              <span
                className="flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200"
                style={{
                  background: sel ? BLUE : '#EEF3FF',
                  color: sel ? '#ffffff' : BLUE,
                }}
              >
                {PROFILE_ICONS[p.id]}
              </span>

              {/* Text */}
              <div>
                <p className="font-bold text-[15px]" style={{ color: '#0D1526' }}>{p.label}</p>
                <p className="text-sm text-gray-400 mt-0.5 leading-snug">{p.desc}</p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Mobile: vertical list */}
      <div className="flex flex-col gap-3 sm:hidden">
        {visibleMobile.map((p) => {
          const sel = answers.profile === p.id
          return (
            <button
              key={p.id}
              onClick={() => onChange(p.id)}
              aria-pressed={sel}
              className="flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer w-full"
              style={{
                background: sel ? BLUE : '#FFFFFF',
                border: sel ? `2px solid ${BLUE}` : '1.5px solid #E2E8F0',
                boxShadow: sel ? 'none' : '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              {/* Icon */}
              <span
                className="shrink-0 flex items-center justify-center w-11 h-11 rounded-xl"
                style={{
                  background: sel ? 'rgba(255,255,255,0.2)' : '#EEF3FF',
                  color: sel ? '#ffffff' : BLUE,
                }}
              >
                {PROFILE_ICONS[p.id]}
              </span>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[15px]" style={{ color: sel ? '#ffffff' : '#0D1526' }}>{p.label}</p>
                <p className="text-sm leading-snug" style={{ color: sel ? 'rgba(255,255,255,0.75)' : '#9CA3AF' }}>{p.desc}</p>
              </div>

              {/* Radio */}
              <span
                className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all"
                style={{
                  borderColor: sel ? '#ffffff' : '#D1D5DB',
                  background: sel ? BLUE : 'transparent',
                }}
              >
                {sel && (
                  <svg viewBox="0 0 12 12" fill="none" width="10" height="10">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </button>
          )
        })}

        {/* "Voir tous" expand */}
        {!showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="text-sm font-medium text-center py-2 transition cursor-pointer"
            style={{ color: BLUE }}
          >
            Voir tous les profils ↓
          </button>
        )}
      </div>
    </div>
  )
}

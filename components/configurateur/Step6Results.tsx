'use client'

import { useState } from 'react'
import type { WizardAnswers } from '@/app/configurateur/data'
import { getWizardResults, getBrand } from '@/app/configurateur/data'

function MatchBadge({ score }: { score: number }) {
  const color =
    score >= 85
      ? { bg: '#16a34a', text: '#ffffff' }
      : score >= 70
        ? { bg: '#ca8a04', text: '#ffffff' }
        : { bg: '#dc2626', text: '#ffffff' }

  return (
    <span
      className="px-2.5 py-1 rounded-lg text-sm font-black tabular-nums"
      style={{ backgroundColor: color.bg, color: color.text }}
    >
      {score}%
    </span>
  )
}

interface Step6ResultsProps {
  answers: WizardAnswers
  onRefine: () => void
}

export default function Step6Results({ answers, onRefine }: Step6ResultsProps) {
  const results = getWizardResults(answers)
  const [comparing, setComparing] = useState<string[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)

  const topResults = results.filter((t) => t.match > 20).slice(0, 6)

  function toggleCompare(id: string) {
    setComparing((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 2
          ? [...prev, id]
          : prev
    )
  }

  return (
    <div className="space-y-6" style={{ animation: 'fadeSlideIn 0.35s ease-out both' }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-q-text tracking-tight">Tes pneus recommandés</h1>
          <p className="text-sm text-q-text-muted mt-1">{topResults.length} résultats selon ton profil</p>
        </div>
        <button
          onClick={onRefine}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-q-border text-sm text-q-text-muted hover:text-q-text hover:border-q-border-sub transition cursor-pointer"
        >
          <svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13"><path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" /></svg>
          Filtres
        </button>
      </div>

      {comparing.length === 2 && (
        <div
          className="p-4 rounded-xl border border-q-yellow bg-q-yellow/5 text-sm text-q-text"
          style={{ animation: 'fadeSlideIn 0.2s ease-out both' }}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold">Comparaison en cours</span>
            <button onClick={() => setComparing([])} className="text-q-text-muted hover:text-q-text text-xs cursor-pointer">
              Annuler
            </button>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {comparing.map((id) => {
              const tire = results.find((t) => t.id === id)!
              const brand = getBrand(tire.brandId)
              return (
                <div key={id} className="text-xs">
                  <span className="font-bold" style={{ color: brand.accent }}>{brand.name}</span>
                  <span className="ml-1 text-q-text-muted">{tire.model}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {topResults.map((tire) => {
          const brand = getBrand(tire.brandId)
          const isExpanded = expanded === tire.id

          return (
            <div
              key={tire.id}
              className="rounded-2xl border border-q-border bg-q-card overflow-hidden transition-all duration-200"
            >
              <div className="flex items-center gap-4 p-4">
                {/* Tire icon */}
                <div className="shrink-0 w-12 h-12 rounded-full border-2 border-q-border-sub bg-q-bg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" className="text-q-text-dim opacity-60">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: brand.accent + '22', color: brand.accent }}>
                      {brand.name}
                    </span>
                    <span className="font-bold text-q-text text-sm">{tire.model}</span>
                  </div>
                  <p className="text-xs text-q-text-muted mt-0.5">Idéal : {tire.idealFor}</p>
                  <p className="text-xs text-q-text-dim mt-0.5">{tire.priceEur} € · {tire.weightG} g · {tire.tubeless ? 'TLR' : 'Tubetype'}</p>
                </div>

                <MatchBadge score={tire.match} />
              </div>

              {/* Expanded detail */}
              {isExpanded && (
                <div
                  className="px-4 pb-4 space-y-3 border-t border-q-border-sub"
                  style={{ animation: 'fadeSlideIn 0.2s ease-out both' }}
                >
                  <p className="text-sm text-q-text-sub pt-3">{tire.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {tire.features.map((f) => (
                      <span key={f} className="text-xs px-2 py-0.5 rounded-full border border-q-border-sub text-q-text-muted">
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {[
                      { label: 'Roulement', val: tire.rollingScore },
                      { label: 'Grip sec', val: tire.gripDry },
                      { label: 'Grip mouillé', val: tire.gripWet },
                      { label: 'Protection', val: tire.punctureProtection },
                    ].map((stat) => (
                      <div key={stat.label} className="space-y-1">
                        <div className="text-[10px] text-q-text-dim uppercase tracking-wide">{stat.label}</div>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <div
                              key={n}
                              className={['h-1 flex-1 rounded-full', n <= stat.val ? 'bg-q-yellow' : 'bg-q-border-track'].join(' ')}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 px-4 pb-4">
                <button
                  onClick={() => setExpanded(isExpanded ? null : tire.id)}
                  className="flex-1 py-2.5 rounded-xl bg-q-text text-q-bg text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition cursor-pointer"
                >
                  {isExpanded ? 'Masquer' : 'Voir détails'}
                </button>
                <button
                  onClick={() => toggleCompare(tire.id)}
                  className={[
                    'px-4 py-2.5 rounded-xl border text-sm font-medium transition cursor-pointer',
                    comparing.includes(tire.id)
                      ? 'border-q-yellow text-q-yellow bg-q-yellow/10'
                      : 'border-q-border text-q-text-muted hover:border-q-border-sub hover:text-q-text',
                  ].join(' ')}
                >
                  {comparing.includes(tire.id) ? '✓ Comparer' : 'Comparer'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <button
        onClick={onRefine}
        className="w-full py-3 rounded-xl border border-q-border-sub text-sm text-q-text-muted hover:border-q-border hover:text-q-text transition cursor-pointer"
      >
        ↻ Affiner ma recherche
      </button>

      <p className="text-center text-xs text-q-text-dim pb-4">
        Les scores sont calculés à partir de ton profil, terrain, priorités et infos techniques.
        Données approximatives basées sur les gammes réelles 2025-2026.
      </p>
    </div>
  )
}

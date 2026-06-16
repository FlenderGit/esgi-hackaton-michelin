'use client'

import { useState } from 'react'
import type { WizardAnswers } from '@/app/configurateur/data'
import { getWizardResults, getBrand } from '@/app/configurateur/data'

const BLUE = '#27509B'

function MatchBadge({ score }: { score: number }) {
  const bg = score >= 85 ? '#16a34a' : score >= 65 ? BLUE : '#9CA3AF'
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-lg text-sm font-black tabular-nums shrink-0"
      style={{ background: bg, color: '#ffffff' }}
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
    <div className="space-y-6 pb-6" style={{ animation: 'fadeSlideIn 0.35s ease-out both' }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: '#0D1526' }}>
            Tes pneus recommandés
          </h1>
          <p className="text-sm mt-1" style={{ color: '#9CA3AF' }}>
            {topResults.length} résultat{topResults.length > 1 ? 's' : ''} selon ton profil
          </p>
        </div>
        <button
          onClick={onRefine}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer"
          style={{ border: '1px solid #E2E8F0', color: '#6B7280' }}
        >
          <svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13">
            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
          </svg>
          Filtres
        </button>
      </div>

      {/* Compare banner */}
      {comparing.length === 2 && (
        <div
          className="p-4 rounded-xl text-sm"
          style={{ background: 'rgba(39,80,155,0.06)', border: `1.5px solid ${BLUE}` }}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold" style={{ color: '#0D1526' }}>Comparaison en cours</span>
            <button
              onClick={() => setComparing([])}
              className="text-xs cursor-pointer"
              style={{ color: '#9CA3AF' }}
            >
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
                  <span className="ml-1" style={{ color: '#6B7280' }}>{tire.model}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Result cards */}
      <div className="space-y-3">
        {topResults.map((tire) => {
          const brand = getBrand(tire.brandId)
          const isExpanded = expanded === tire.id
          const isComparing = comparing.includes(tire.id)

          return (
            <div
              key={tire.id}
              className="rounded-2xl overflow-hidden transition-all duration-200"
              style={{
                background: '#FFFFFF',
                border: isComparing ? `2px solid ${BLUE}` : '1.5px solid #E2E8F0',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}
            >
              <div className="flex items-center gap-4 p-4">
                {/* Tire icon */}
                <div
                  className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: '#F0F2F5', border: '1.5px solid #E2E8F0' }}
                >
                  <svg viewBox="0 0 24 24" fill="#9CA3AF" width="20" height="20">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded"
                      style={{ background: brand.accent + '20', color: brand.accent }}
                    >
                      {brand.name}
                    </span>
                    <span className="font-bold text-[15px]" style={{ color: '#0D1526' }}>
                      {tire.model}
                    </span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>Idéal : {tire.idealFor}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>
                    {tire.priceEur}€ · {tire.weightG}g · {tire.tubeless ? 'TLR' : 'Tubetype'}
                  </p>
                </div>

                <MatchBadge score={tire.match} />
              </div>

              {/* Expanded detail */}
              {isExpanded && (
                <div
                  className="px-4 pb-4 space-y-3"
                  style={{ borderTop: '1px solid #F0F2F5', animation: 'fadeSlideIn 0.2s ease-out both' }}
                >
                  <p className="text-sm pt-3 leading-relaxed" style={{ color: '#374151' }}>
                    {tire.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {tire.features.map((f) => (
                      <span
                        key={f}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: '#F0F2F5', color: '#6B7280', border: '1px solid #E2E8F0' }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                    {[
                      { label: 'Roulement', val: tire.rollingScore },
                      { label: 'Grip sec', val: tire.gripDry },
                      { label: 'Grip mouillé', val: tire.gripWet },
                      { label: 'Protection', val: tire.punctureProtection },
                    ].map((stat) => (
                      <div key={stat.label} className="space-y-1">
                        <div className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: '#9CA3AF' }}>
                          {stat.label}
                        </div>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <div
                              key={n}
                              className="h-1.5 flex-1 rounded-full transition-all"
                              style={{ background: n <= stat.val ? BLUE : '#E2E8F0' }}
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
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer"
                  style={{ background: '#0D1526', color: '#ffffff' }}
                >
                  {isExpanded ? 'Masquer' : 'Voir détails'}
                </button>
                <button
                  onClick={() => toggleCompare(tire.id)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer"
                  style={{
                    background: isComparing ? 'rgba(39,80,155,0.06)' : '#FFFFFF',
                    border: isComparing ? `1.5px solid ${BLUE}` : '1.5px solid #E2E8F0',
                    color: isComparing ? BLUE : '#6B7280',
                  }}
                >
                  {isComparing ? '✓ Comparer' : 'Comparer'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <button
        onClick={onRefine}
        className="w-full py-3 rounded-xl text-sm transition cursor-pointer"
        style={{
          border: '1.5px solid #E2E8F0',
          color: '#6B7280',
          background: '#FFFFFF',
        }}
      >
        ↻ Affiner ma recherche
      </button>

      <p className="text-center text-xs pb-2" style={{ color: '#C4C9D4' }}>
        Scores calculés à partir de ton profil, terrain, priorités et infos techniques.
        Données approximatives basées sur les gammes réelles 2025-2026.
      </p>
    </div>
  )
}

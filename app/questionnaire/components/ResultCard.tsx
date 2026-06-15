'use client'

import { useState, useEffect } from 'react'
import type { Profile, AnswerKey } from '../data'
import MichelinLogo from './MichelinLogo'

interface ResultCardProps {
  profile: Profile
  answers: Record<number, AnswerKey>
  onRestart: () => void
}

const ANSWER_LABELS: Record<AnswerKey, string> = {
  a: 'Pédale Douce',
  b: 'Grosse Pédale',
  c: 'Tryharder',
  d: 'Taffeur',
}

const ANSWER_COLORS: Record<AnswerKey, string> = {
  a: '#10B981',
  b: '#EF4444',
  c: '#3B82F6',
  d: '#8B5CF6',
}

export default function ResultCard({ profile, answers, onRestart }: ResultCardProps) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 150)
    return () => clearTimeout(t)
  }, [])

  const answerValues = Object.values(answers)
  const total = answerValues.length
  const counts: Record<AnswerKey, number> = { a: 0, b: 0, c: 0, d: 0 }
  answerValues.forEach((k) => counts[k]++)

  async function handleShare() {
    const text = `Je suis "${profile.name}" — ${profile.tagline} ! Découvre ton profil cycliste Michelin.`
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'Mon profil cycliste Michelin', text })
      } catch {
        // user cancelled
      }
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(text)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <header className="px-6 py-5 border-b border-[#161616]">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <MichelinLogo />
          <button
            onClick={onRestart}
            className="text-[#555] text-sm hover:text-white transition-colors"
          >
            Recommencer
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div
          className="w-full max-w-2xl mx-auto space-y-6"
          style={{ animation: 'fadeSlideIn 0.45s ease-out both' }}
        >
          <p className="text-center text-[#555] text-xs uppercase tracking-widest">
            Ton profil est…
          </p>

          <div
            className="rounded-3xl border p-8 sm:p-10 text-center space-y-5"
            style={{
              borderColor: `${profile.accentColor}30`,
              backgroundColor: profile.bgColor,
            }}
          >
            <div
              className="text-6xl sm:text-7xl"
              style={{ animation: 'scaleIn 0.5s ease-out both 0.2s' }}
            >
              {profile.emoji}
            </div>

            <div className="space-y-1">
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: profile.accentColor }}
              >
                {profile.tagline}
              </p>
              <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                {profile.name}
              </h1>
            </div>

            <p className="text-[#888] text-base sm:text-lg leading-relaxed max-w-md mx-auto">
              {profile.description}
            </p>

            <div
              className="inline-block w-16 h-1 rounded-full"
              style={{ backgroundColor: profile.accentColor }}
            />
          </div>

          <div className="bg-[#111] border border-[#1E1E1E] rounded-2xl p-6 space-y-4">
            <h3 className="text-[#444] text-xs uppercase tracking-widest">
              Répartition de tes réponses
            </h3>
            <div className="space-y-3">
              {(Object.keys(counts) as AnswerKey[]).map((key) => {
                const count = counts[key]
                const pct = total > 0 ? (count / total) * 100 : 0
                return (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#666]">{ANSWER_LABELS[key]}</span>
                      <span className="text-[#444] tabular-nums">
                        {count} / {total}
                      </span>
                    </div>
                    <div className="h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: animated ? `${pct}%` : '0%',
                          backgroundColor: ANSWER_COLORS[key],
                          transitionDelay: `${(Object.keys(counts).indexOf(key)) * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onRestart}
              className="flex-1 py-4 rounded-xl bg-[#FFD100] text-black font-bold text-base hover:bg-[#FFE033] active:scale-95 transition-all duration-150 cursor-pointer"
            >
              Rejouer
            </button>
            <button
              onClick={handleShare}
              className="flex-1 py-4 rounded-xl border border-[#222] bg-[#111] text-[#999] font-medium text-base hover:border-[#383838] hover:text-white hover:bg-[#161616] active:scale-95 transition-all duration-150 cursor-pointer"
            >
              Partager mon profil
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

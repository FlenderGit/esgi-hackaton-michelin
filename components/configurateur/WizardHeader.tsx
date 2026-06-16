'use client'

import Link from 'next/link'

export type WizardStep =
  | 'profile' | 'terrain' | 'priorities' | 'technical' | 'crossroads'
  | 'adv-mount' | 'adv-budget' | 'adv-axle'
  | 'results'

const MAIN_STEPS: WizardStep[] = ['profile', 'terrain', 'priorities', 'technical', 'crossroads']
const ADV_STEPS: WizardStep[] = ['adv-mount', 'adv-budget', 'adv-axle']

function getStepNum(step: WizardStep): number {
  const i = MAIN_STEPS.indexOf(step)
  return i >= 0 ? i + 1 : 5
}

function getAdvStepNum(step: WizardStep): number {
  return ADV_STEPS.indexOf(step) + 1
}

interface WizardHeaderProps {
  step: WizardStep
  onBack?: () => void
  onExit?: () => void
}

export default function WizardHeader({ step, onBack, onExit }: WizardHeaderProps) {
  const isAdv = ADV_STEPS.includes(step)
  const isResults = step === 'results'
  const mainNum = getStepNum(step)
  const advNum = getAdvStepNum(step)
  const filledCount = isAdv || isResults ? 5 : mainNum

  const centerLabel = isResults
    ? 'Tes recommandations'
    : isAdv
      ? `Avancé ${advNum} / 3`
      : `Étape ${mainNum} sur 5`

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      {/* Nav row */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 h-[68px] flex items-center justify-between gap-4">

        {/* Desktop: logo | Mobile: back arrow */}
        <div className="flex items-center gap-3">
          {/* Mobile back button */}
          {onBack && (
            <button
              onClick={onBack}
              className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition text-gray-500 cursor-pointer"
              aria-label="Retour"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          )}

          {/* Desktop logo */}
          <Link href="/" className="hidden sm:flex items-center gap-2 group">
            <span className="text-[22px]">🚲</span>
            <span className="font-black text-[16px] tracking-tight">
              <span className="text-[#0D1526]">Pneu</span>
              <span style={{ color: '#27509B' }}>Finder</span>
            </span>
          </Link>
        </div>

        {/* Center: step label */}
        <span className="text-sm font-medium text-gray-400 absolute left-1/2 -translate-x-1/2">
          {centerLabel}
        </span>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Desktop: save state */}
          <div className="hidden sm:flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14" style={{ color: '#27509B' }}>
                <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
              </svg>
              Sauvegardé
            </span>
            {onExit && (
              <button onClick={onExit} className="hover:text-gray-600 transition cursor-pointer">
                Reprendre plus tard ×
              </button>
            )}
          </div>

          {/* Mobile close */}
          {onExit && (
            <button
              onClick={onExit}
              className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition text-gray-400 cursor-pointer"
              aria-label="Fermer"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Progress bar — 5 segments */}
      {!isResults && (
        <div className="flex px-0 gap-[3px]">
          {MAIN_STEPS.map((_, i) => (
            <div
              key={i}
              className="h-[3px] flex-1 transition-all duration-500"
              style={{
                backgroundColor: i < filledCount ? '#27509B' : '#E2E8F0',
                borderRadius: i === 0 ? '0 0 0 0' : i === 4 ? '0 0 0 0' : 0,
              }}
            />
          ))}
        </div>
      )}
      {isResults && <div className="h-[3px] w-full" style={{ backgroundColor: '#27509B' }} />}
    </header>
  )
}

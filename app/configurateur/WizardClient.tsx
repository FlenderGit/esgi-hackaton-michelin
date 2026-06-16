'use client'

import { useState } from 'react'
import type { WizardAnswers, RiderProfile, TerrainType, WeatherType, PriorityKey, WizardBikeType, BudgetRange } from './data'
import WizardHeader, { type WizardStep } from '@/components/configurateur/WizardHeader'
import Step1Profile from '@/components/configurateur/Step1Profile'
import Step2Terrain from '@/components/configurateur/Step2Terrain'
import Step3Priorities from '@/components/configurateur/Step3Priorities'
import Step4Technical from '@/components/configurateur/Step4Technical'
import Step5Crossroads from '@/components/configurateur/Step5Crossroads'
import { StepAdvMount, StepAdvBudget, StepAdvAxle } from '@/components/configurateur/StepAdvanced'
import Step6Results from '@/components/configurateur/Step6Results'

const EMPTY_ANSWERS: WizardAnswers = {
  terrain: [],
  weather: [],
  priorities: [],
}

const STEP_ORDER: WizardStep[] = ['profile', 'terrain', 'priorities', 'technical', 'crossroads']
const ADV_ORDER: WizardStep[] = ['adv-mount', 'adv-budget', 'adv-axle']

function canProceed(step: WizardStep, answers: WizardAnswers): boolean {
  if (step === 'profile') return !!answers.profile
  if (step === 'terrain') return answers.terrain.length > 0
  if (step === 'priorities') return answers.priorities.length >= 1
  if (step === 'technical') return !!answers.bikeType
  if (step === 'crossroads') return true
  if (step === 'adv-mount') return !!answers.mounting
  if (step === 'adv-budget') return !!answers.budget
  if (step === 'adv-axle') return !!answers.axle
  return true
}

export default function WizardClient() {
  const [step, setStep] = useState<WizardStep>('profile')
  const [answers, setAnswers] = useState<WizardAnswers>(EMPTY_ANSWERS)
  const [advancedPath, setAdvancedPath] = useState(false)

  function update(patch: Partial<WizardAnswers>) {
    setAnswers((prev) => ({ ...prev, ...patch }))
  }

  function goNext() {
    if (step === 'crossroads') return

    const mainIdx = STEP_ORDER.indexOf(step)
    if (mainIdx >= 0 && mainIdx < STEP_ORDER.length - 1) {
      setStep(STEP_ORDER[mainIdx + 1])
      return
    }

    if (advancedPath) {
      const advIdx = ADV_ORDER.indexOf(step)
      if (advIdx >= 0 && advIdx < ADV_ORDER.length - 1) {
        setStep(ADV_ORDER[advIdx + 1])
        return
      }
      if (advIdx === ADV_ORDER.length - 1) {
        setStep('results')
        return
      }
    }
  }

  function goBack() {
    if (step === 'results') {
      setStep(advancedPath ? 'adv-axle' : 'crossroads')
      return
    }

    if (advancedPath) {
      const advIdx = ADV_ORDER.indexOf(step)
      if (advIdx === 0) { setStep('crossroads'); return }
      if (advIdx > 0) { setStep(ADV_ORDER[advIdx - 1]); return }
    }

    const mainIdx = STEP_ORDER.indexOf(step)
    if (mainIdx > 0) {
      setStep(STEP_ORDER[mainIdx - 1])
    } else {
      window.location.href = '/'
    }
  }

  function handleQuick() {
    setAdvancedPath(false)
    setStep('results')
  }

  function handleAdvanced() {
    setAdvancedPath(true)
    setStep('adv-mount')
  }

  function handleReset() {
    setAnswers(EMPTY_ANSWERS)
    setStep('profile')
    setAdvancedPath(false)
  }

  const ok = canProceed(step, answers)
  const isResults = step === 'results'
  const isCrossroads = step === 'crossroads'
  const showFooter = !isCrossroads

  return (
    <div
      data-theme="light"
      className="min-h-screen flex flex-col"
      style={{ background: '#F8F9FB', color: '#0D1526' }}
    >
      <WizardHeader step={step} onBack={goBack} onExit={handleReset} />

      <main className="flex-1 flex flex-col">
        <div className="max-w-3xl mx-auto w-full px-5 sm:px-8 py-8 sm:py-12 flex-1">
          {step === 'profile' && (
            <Step1Profile
              answers={answers}
              onChange={(p: RiderProfile) => update({ profile: p })}
            />
          )}

          {step === 'terrain' && (
            <Step2Terrain
              answers={answers}
              onTerrainChange={(terrain: TerrainType[]) => update({ terrain })}
              onWeatherChange={(weather: WeatherType[]) => update({ weather })}
            />
          )}

          {step === 'priorities' && (
            <Step3Priorities
              answers={answers}
              onChange={(priorities: PriorityKey[]) => update({ priorities })}
            />
          )}

          {step === 'technical' && (
            <Step4Technical
              answers={answers}
              onBikeTypeChange={(bikeType: WizardBikeType) => update({ bikeType })}
              onWidthChange={(width: string) => update({ width })}
            />
          )}

          {step === 'crossroads' && (
            <Step5Crossroads onQuick={handleQuick} onAdvanced={handleAdvanced} />
          )}

          {step === 'adv-mount' && (
            <StepAdvMount answers={answers} onChange={(mounting) => update({ mounting })} />
          )}

          {step === 'adv-budget' && (
            <StepAdvBudget answers={answers} onChange={(budget: BudgetRange) => update({ budget })} />
          )}

          {step === 'adv-axle' && (
            <StepAdvAxle answers={answers} onChange={(axle) => update({ axle })} />
          )}

          {step === 'results' && (
            <Step6Results answers={answers} onRefine={handleReset} />
          )}
        </div>

        {/* Footer */}
        {showFooter && (
          <div
            className="sticky bottom-0 backdrop-blur-sm"
            style={{
              background: 'rgba(248,249,251,0.95)',
              borderTop: '1px solid #E2E8F0',
            }}
          >
            <div className="max-w-3xl mx-auto px-5 sm:px-8 py-4 flex items-center gap-4">
              {/* Back button */}
              {!isResults && (
                <button
                  onClick={goBack}
                  className="flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer shrink-0"
                  style={{ color: '#6B7280' }}
                >
                  ← Retour
                </button>
              )}
              {isResults && (
                <button
                  onClick={goBack}
                  className="flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer shrink-0"
                  style={{ color: '#6B7280' }}
                >
                  ← Modifier mes critères
                </button>
              )}

              <div className="flex-1" />

              {/* Continue / Restart button */}
              {!isResults && (
                <button
                  onClick={goNext}
                  disabled={!ok}
                  className="flex items-center justify-center gap-2 px-7 py-3 rounded-full font-bold text-sm transition-all duration-200 sm:w-auto w-auto"
                  style={{
                    background: ok ? '#FCE500' : '#E2E8F0',
                    color: ok ? '#0D1526' : '#9CA3AF',
                    cursor: ok ? 'pointer' : 'not-allowed',
                    minWidth: '140px',
                  }}
                >
                  Continuer →
                </button>
              )}
              {isResults && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition cursor-pointer"
                  style={{
                    border: '1.5px solid #E2E8F0',
                    color: '#374151',
                    background: '#FFFFFF',
                  }}
                >
                  Recommencer
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

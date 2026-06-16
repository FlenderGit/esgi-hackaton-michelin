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
    if (step === 'crossroads') return // handled by crossroads buttons

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
      if (advancedPath) {
        setStep('adv-axle')
      } else {
        setStep('crossroads')
      }
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
    } else if (mainIdx === 0) {
      // First step — go home
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

  return (
    <div className="min-h-screen bg-q-bg text-q-text flex flex-col">
      <WizardHeader step={step} onExit={handleReset} />

      {/* Content */}
      <main className="flex-1 flex flex-col">
        <div className="max-w-3xl mx-auto w-full px-6 py-10 flex-1">
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
            <StepAdvMount
              answers={answers}
              onChange={(mounting) => update({ mounting })}
            />
          )}

          {step === 'adv-budget' && (
            <StepAdvBudget
              answers={answers}
              onChange={(budget: BudgetRange) => update({ budget })}
            />
          )}

          {step === 'adv-axle' && (
            <StepAdvAxle
              answers={answers}
              onChange={(axle) => update({ axle })}
            />
          )}

          {step === 'results' && (
            <Step6Results answers={answers} onRefine={handleReset} />
          )}
        </div>

        {/* Navigation footer */}
        {!isCrossroads && !isResults && (
          <div className="sticky bottom-0 bg-q-bg/95 backdrop-blur border-t border-q-border-sub">
            <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-sm text-q-text-muted hover:text-q-text transition-colors cursor-pointer"
              >
                ← Retour
              </button>

              <button
                onClick={goNext}
                disabled={!ok}
                className={[
                  'flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-200',
                  ok
                    ? 'bg-q-yellow text-black hover:bg-[#FFE033] active:scale-[0.98] cursor-pointer'
                    : 'bg-q-border-track text-q-text-dim cursor-not-allowed opacity-60',
                ].join(' ')}
              >
                Continuer →
              </button>
            </div>
          </div>
        )}

        {/* Results footer */}
        {isResults && (
          <div className="sticky bottom-0 bg-q-bg/95 backdrop-blur border-t border-q-border-sub">
            <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-sm text-q-text-muted hover:text-q-text transition-colors cursor-pointer"
              >
                ← Modifier mes critères
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-q-border text-sm font-medium text-q-text-muted hover:text-q-text hover:border-q-border-sub transition cursor-pointer"
              >
                Recommencer
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

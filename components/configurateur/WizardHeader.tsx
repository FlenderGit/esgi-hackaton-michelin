import MichelinLogo from '@/components/shared/MichelinLogo'
import ThemeToggle from '@/components/shared/ThemeToggle'
import Link from 'next/link'

type WizardStep = 'profile' | 'terrain' | 'priorities' | 'technical' | 'crossroads' | 'adv-mount' | 'adv-budget' | 'adv-axle' | 'results'

const MAIN_STEPS: WizardStep[] = ['profile', 'terrain', 'priorities', 'technical', 'crossroads']
const ADV_STEPS: WizardStep[] = ['adv-mount', 'adv-budget', 'adv-axle']

function getStepInfo(step: WizardStep): { label: string; isAdvanced: boolean; advIdx?: number; mainIdx?: number } {
  const mainIdx = MAIN_STEPS.indexOf(step)
  if (mainIdx >= 0) return { label: `Étape ${mainIdx + 1} sur 5`, isAdvanced: false, mainIdx }
  const advIdx = ADV_STEPS.indexOf(step)
  if (advIdx >= 0) return { label: `Avancé ${advIdx + 1} / 3`, isAdvanced: true, advIdx }
  return { label: '', isAdvanced: false }
}

interface WizardHeaderProps {
  step: WizardStep
  onExit?: () => void
}

export default function WizardHeader({ step, onExit }: WizardHeaderProps) {
  const info = getStepInfo(step)
  const isResults = step === 'results'

  const mainProgress = info.mainIdx !== undefined ? info.mainIdx + 1 : MAIN_STEPS.length
  const isAdvanced = info.isAdvanced

  return (
    <header className="sticky top-0 z-50 bg-q-bg/95 backdrop-blur border-b border-q-border-sub">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="shrink-0">
          <MichelinLogo />
        </Link>

        {!isResults && (
          <span className="text-sm font-medium text-q-text-muted hidden sm:block">{info.label}</span>
        )}
        {isResults && (
          <span className="text-sm font-medium text-q-text-muted hidden sm:block">Tes recommandations</span>
        )}

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {onExit && (
            <button
              onClick={onExit}
              title="Recommencer"
              className="text-q-text-dim hover:text-q-text text-lg leading-none transition-colors"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      {!isResults && (
        <div className="max-w-3xl mx-auto px-6 pb-3">
          {isAdvanced ? (
            <div className="space-y-1">
              <p className="text-[10px] text-q-yellow uppercase tracking-widest">Précision avancée</p>
              <div className="flex gap-1">
                {ADV_STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={[
                      'h-1 flex-1 rounded-full transition-all duration-500',
                      i <= (info.advIdx ?? -1) ? 'bg-q-yellow' : 'bg-q-border-track',
                    ].join(' ')}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex gap-1">
              {MAIN_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={[
                    'h-1 flex-1 rounded-full transition-all duration-500',
                    i < mainProgress ? 'bg-q-yellow' : 'bg-q-border-track',
                  ].join(' ')}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  )
}

export type { WizardStep }

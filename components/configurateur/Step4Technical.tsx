import type { WizardAnswers, WizardBikeType } from '@/app/configurateur/data'
import { WIDTH_OPTIONS } from '@/app/configurateur/data'

const BIKE_TYPES: { id: WizardBikeType; label: string; emoji: string }[] = [
  { id: 'vtt', label: 'VTT', emoji: '⛰️' },
  { id: 'route', label: 'Route', emoji: '🛣️' },
  { id: 'gravel', label: 'Gravel', emoji: '🪨' },
  { id: 'ville', label: 'Ville', emoji: '🏙️' },
  { id: 'electrique', label: 'Électrique', emoji: '⚡' },
]

interface Step4TechnicalProps {
  answers: WizardAnswers
  onBikeTypeChange: (type: WizardBikeType) => void
  onWidthChange: (width: string) => void
}

export default function Step4Technical({ answers, onBikeTypeChange, onWidthChange }: Step4TechnicalProps) {
  const widthOpts = answers.bikeType ? WIDTH_OPTIONS[answers.bikeType] : []

  return (
    <div className="space-y-8" style={{ animation: 'fadeSlideIn 0.35s ease-out both' }}>
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-q-text tracking-tight">Quelques infos techniques</h1>
        <p className="text-q-text-sub">Pour affiner nos recommandations à ton vélo.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-q-text-muted uppercase tracking-wider">Type de vélo</h2>
          <div className="flex flex-wrap gap-2">
            {BIKE_TYPES.map((bt) => {
              const isSelected = answers.bikeType === bt.id
              return (
                <button
                  key={bt.id}
                  onClick={() => {
                    onBikeTypeChange(bt.id)
                    onWidthChange('') // reset width when bike type changes
                  }}
                  aria-pressed={isSelected}
                  className={[
                    'flex items-center gap-2 px-4 py-2.5 rounded-full border-2 text-sm font-medium transition-all duration-200 cursor-pointer',
                    isSelected
                      ? 'border-q-yellow bg-q-yellow text-black'
                      : 'border-q-border bg-q-card text-q-text hover:border-q-border-sub hover:bg-q-card-hover',
                  ].join(' ')}
                >
                  <span>{bt.emoji}</span>
                  <span>{bt.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {answers.bikeType && (
          <div className="space-y-3" style={{ animation: 'fadeSlideIn 0.25s ease-out both' }}>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-q-text-muted uppercase tracking-wider">Largeur de pneu</h2>
              <span className="text-[10px] text-q-text-dim border border-q-border-sub rounded-full px-2 py-0.5">
                ⓘ inscrit sur le flanc du pneu
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {widthOpts.map((opt) => {
                const isSelected = answers.width === opt.value
                return (
                  <button
                    key={opt.value}
                    onClick={() => onWidthChange(isSelected ? '' : opt.value)}
                    aria-pressed={isSelected}
                    className={[
                      'px-4 py-2.5 rounded-full border-2 text-sm font-medium transition-all duration-200 cursor-pointer',
                      isSelected
                        ? 'border-q-yellow bg-q-yellow text-black'
                        : 'border-q-border bg-q-card text-q-text hover:border-q-border-sub hover:bg-q-card-hover',
                    ].join(' ')}
                  >
                    {opt.label}
                  </button>
                )
              })}
              <button
                onClick={() => onWidthChange('je_ne_sais_pas')}
                aria-pressed={answers.width === 'je_ne_sais_pas'}
                className={[
                  'px-4 py-2.5 rounded-full border-2 text-sm font-medium transition-all duration-200 cursor-pointer',
                  answers.width === 'je_ne_sais_pas'
                    ? 'border-q-yellow bg-q-yellow text-black'
                    : 'border-q-border-sub bg-q-card text-q-text-muted hover:border-q-border hover:bg-q-card-hover',
                ].join(' ')}
              >
                Je ne sais pas
              </button>
            </div>
          </div>
        )}

        <div className="p-4 rounded-xl border border-q-border-sub bg-q-card/50 text-sm text-q-text-muted">
          Tu ne connais pas ces infos ? Pas de souci — on peut te recommander directement à partir de ton profil et ton terrain.
        </div>
      </div>
    </div>
  )
}

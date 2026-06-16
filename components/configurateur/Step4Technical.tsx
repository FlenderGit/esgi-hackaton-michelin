import type { WizardAnswers, WizardBikeType } from '@/app/configurateur/data'
import { WIDTH_OPTIONS } from '@/app/configurateur/data'

const BLUE = '#27509B'

const BIKE_TYPES: { id: WizardBikeType; label: string }[] = [
  { id: 'vtt', label: 'VTT' },
  { id: 'route', label: 'Route' },
  { id: 'gravel', label: 'Gravel' },
  { id: 'ville', label: 'Ville' },
  { id: 'electrique', label: 'Électrique' },
]

function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-150 cursor-pointer"
      style={{
        background: selected ? BLUE : '#FFFFFF',
        color: selected ? '#ffffff' : '#374151',
        border: selected ? `2px solid ${BLUE}` : '1.5px solid #E2E8F0',
        boxShadow: selected ? 'none' : '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      {label}
    </button>
  )
}

interface Step4TechnicalProps {
  answers: WizardAnswers
  onBikeTypeChange: (type: WizardBikeType) => void
  onWidthChange: (width: string) => void
}

export default function Step4Technical({ answers, onBikeTypeChange, onWidthChange }: Step4TechnicalProps) {
  const widthOpts = answers.bikeType ? WIDTH_OPTIONS[answers.bikeType] : []

  return (
    <div className="space-y-10" style={{ animation: 'fadeSlideIn 0.3s ease-out both' }}>
      <div className="text-center space-y-2">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight" style={{ color: '#0D1526' }}>
          Quelques infos techniques
        </h1>
        <p className="text-base text-gray-500">Pour affiner nos recommandations à ton vélo.</p>
      </div>

      <div className="space-y-8">
        {/* Bike type */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Type de vélo</h2>
          <div className="flex flex-wrap gap-2.5">
            {BIKE_TYPES.map((bt) => (
              <Chip
                key={bt.id}
                label={bt.label}
                selected={answers.bikeType === bt.id}
                onClick={() => {
                  onBikeTypeChange(bt.id)
                  onWidthChange('')
                }}
              />
            ))}
          </div>
        </div>

        {/* Width — appears after bike type selected */}
        {answers.bikeType && (
          <div className="space-y-4" style={{ animation: 'fadeSlideIn 0.2s ease-out both' }}>
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Largeur de pneu</h2>
              <span
                className="text-xs px-2.5 py-1 rounded-full font-medium cursor-default"
                style={{ background: '#EEF3FF', color: BLUE }}
              >
                ⓘ inscrit sur le flanc du pneu
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {widthOpts.map((opt) => (
                <Chip
                  key={opt.value}
                  label={opt.label}
                  selected={answers.width === opt.value}
                  onClick={() => onWidthChange(answers.width === opt.value ? '' : opt.value)}
                />
              ))}
              <Chip
                label="Je ne sais pas"
                selected={answers.width === 'je_ne_sais_pas'}
                onClick={() => onWidthChange(answers.width === 'je_ne_sais_pas' ? '' : 'je_ne_sais_pas')}
              />
            </div>
          </div>
        )}

        {/* Helper note */}
        <div
          className="p-4 rounded-xl text-sm text-gray-500 leading-relaxed"
          style={{ background: '#F8F9FB', border: '1px dashed #E2E8F0' }}
        >
          Tu ne connais pas ces infos&nbsp;? Pas de souci — on peut les déduire de ton profil et ton terrain, ou te recommander directement.
        </div>
      </div>
    </div>
  )
}

import type { WizardAnswers, PriorityKey } from '@/app/configurateur/data'

const BLUE = '#27509B'

const CRITERIA: { id: PriorityKey; label: string; desc: string }[] = [
  { id: 'adherence', label: 'Adhérence', desc: 'Grip sur terrain sec & humide' },
  { id: 'anti_crevaison', label: 'Anti-crevaison', desc: 'Protection contre les crevaisons' },
  { id: 'vitesse', label: 'Vitesse / rendement', desc: 'Faible résistance au roulement' },
  { id: 'confort', label: 'Confort', desc: 'Absorption des chocs et souplesse' },
  { id: 'longevite', label: 'Longévité', desc: 'Durée de vie maximale du pneu' },
  { id: 'poids', label: 'Poids', desc: 'Pneu léger pour la performance' },
]

interface Step3PrioritiesProps {
  answers: WizardAnswers
  onChange: (priorities: PriorityKey[]) => void
}

export default function Step3Priorities({ answers, onChange }: Step3PrioritiesProps) {
  const selected = answers.priorities

  function handleClick(id: PriorityKey) {
    if (selected.includes(id)) {
      onChange(selected.filter((p) => p !== id))
    } else if (selected.length < 3) {
      onChange([...selected, id])
    }
  }

  return (
    <div className="space-y-8" style={{ animation: 'fadeSlideIn 0.3s ease-out both' }}>
      <div className="text-center space-y-2">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight" style={{ color: '#0D1526' }}>
          Classe ce qui compte le plus
        </h1>
        <p className="text-base text-gray-500">
          Touche dans l&apos;ordre tes <strong style={{ color: '#0D1526' }}>3 critères</strong> les plus importants.
        </p>
      </div>

      {/* Selected badges */}
      {selected.length > 0 && (
        <div
          className="flex flex-wrap gap-2 justify-center"
          style={{ animation: 'fadeSlideIn 0.2s ease-out both' }}
        >
          {selected.map((id, idx) => {
            const crit = CRITERIA.find((c) => c.id === id)!
            return (
              <div
                key={id}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-bold"
                style={{ background: BLUE, color: '#ffffff' }}
              >
                <span
                  className="flex items-center justify-center w-5 h-5 rounded-full text-xs font-black"
                  style={{ background: '#ffffff', color: BLUE }}
                >
                  {idx + 1}
                </span>
                {crit.label}
                <button
                  onClick={() => onChange(selected.filter((p) => p !== id))}
                  className="opacity-70 hover:opacity-100 text-sm cursor-pointer"
                  style={{ lineHeight: 1 }}
                >
                  ×
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Criteria grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CRITERIA.map((crit) => {
          const idx = selected.indexOf(crit.id)
          const isSelected = idx >= 0
          const isFull = selected.length >= 3 && !isSelected

          return (
            <button
              key={crit.id}
              onClick={() => !isFull && handleClick(crit.id)}
              disabled={isFull}
              aria-pressed={isSelected}
              className="flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-150 cursor-pointer w-full"
              style={{
                background: isSelected ? 'rgba(39,80,155,0.06)' : isFull ? '#F9FAFB' : '#FFFFFF',
                border: isSelected ? `2px solid ${BLUE}` : '1.5px solid #E2E8F0',
                opacity: isFull ? 0.45 : 1,
                cursor: isFull ? 'not-allowed' : 'pointer',
                boxShadow: isSelected ? 'none' : '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              {/* Number/dot indicator */}
              <span
                className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-sm font-black transition-all"
                style={{
                  background: isSelected ? BLUE : '#F0F2F5',
                  color: isSelected ? '#ffffff' : '#9CA3AF',
                }}
              >
                {isSelected ? idx + 1 : '·'}
              </span>

              <div>
                <p className="font-semibold text-[15px]" style={{ color: '#0D1526' }}>{crit.label}</p>
                <p className="text-sm text-gray-400">{crit.desc}</p>
              </div>
            </button>
          )
        })}
      </div>

      {selected.length === 3 && (
        <p
          className="text-sm text-center text-gray-400"
          style={{ animation: 'fadeSlideIn 0.2s ease-out both' }}
        >
          Top 3 sélectionné — retire un critère pour en modifier un.
        </p>
      )}
    </div>
  )
}

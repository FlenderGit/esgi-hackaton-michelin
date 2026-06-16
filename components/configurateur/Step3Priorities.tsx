import type { WizardAnswers, PriorityKey } from '@/app/configurateur/data'

const CRITERIA: { id: PriorityKey; label: string; desc: string }[] = [
  { id: 'adherence', label: 'Adhérence', desc: 'Grip sur terrain sec & humide' },
  { id: 'anti_crevaison', label: 'Anti-crevaison', desc: 'Protection contre les crevaisons' },
  { id: 'vitesse', label: 'Vitesse / rendement', desc: 'Faible résistance au roulement' },
  { id: 'confort', label: 'Confort', desc: 'Absorption des chocs' },
  { id: 'longevite', label: 'Longévité', desc: 'Durée de vie du pneu' },
  { id: 'poids', label: 'Poids', desc: 'Pneu léger pour aller plus vite' },
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
    <div className="space-y-8" style={{ animation: 'fadeSlideIn 0.35s ease-out both' }}>
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-q-text tracking-tight">Tes priorités</h1>
        <p className="text-q-text-sub">
          Touche dans l&apos;ordre tes <strong className="text-q-text">3 critères</strong> les plus importants.
        </p>
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((id, idx) => {
            const crit = CRITERIA.find((c) => c.id === id)!
            return (
              <div key={id} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-q-yellow text-black text-sm font-bold">
                <span className="w-5 h-5 rounded-full bg-black text-q-yellow text-xs flex items-center justify-center font-black">
                  {idx + 1}
                </span>
                {crit.label}
                <button
                  onClick={() => onChange(selected.filter((p) => p !== id))}
                  className="ml-0.5 opacity-60 hover:opacity-100 text-xs cursor-pointer"
                >
                  ×
                </button>
              </div>
            )
          })}
        </div>
      )}

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
              className={[
                'flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer',
                isSelected
                  ? 'border-q-yellow bg-q-yellow/8'
                  : isFull
                    ? 'border-q-border-track bg-q-bg opacity-40 cursor-not-allowed'
                    : 'border-q-border bg-q-card hover:border-q-border-sub hover:bg-q-card-hover',
              ].join(' ')}
            >
              <span
                className={[
                  'shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-200',
                  isSelected ? 'bg-q-yellow text-black' : 'bg-q-border/30 text-q-text-muted',
                ].join(' ')}
              >
                {isSelected ? idx + 1 : '·'}
              </span>
              <div>
                <p className="font-bold text-q-text text-sm">{crit.label}</p>
                <p className="text-xs text-q-text-muted">{crit.desc}</p>
              </div>
            </button>
          )
        })}
      </div>

      {selected.length === 3 && (
        <p className="text-sm text-q-text-muted text-center" style={{ animation: 'fadeSlideIn 0.3s ease-out both' }}>
          Top 3 sélectionné — retire un critère pour en changer.
        </p>
      )}
    </div>
  )
}

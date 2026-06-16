import type { WizardAnswers, BudgetRange } from '@/app/configurateur/data'

// ── Étape Avancé 1/3 : Montage & compatibilité ──────────────────

interface StepAdvMountProps {
  answers: WizardAnswers
  onChange: (mounting: WizardAnswers['mounting'], widthCompat: WizardAnswers['mounting']) => void
}

const MOUNTING_OPTIONS: { id: NonNullable<WizardAnswers['mounting']>; label: string; sub?: string }[] = [
  { id: 'tubeless_ready', label: 'Tubeless Ready', sub: 'recommandé — moins de crevaisons' },
  { id: 'chambre_air', label: 'Avec chambre à air', sub: 'plus simple à réparer' },
  { id: 'les_deux', label: 'Les deux, peu importe', sub: '' },
]

export function StepAdvMount({ answers, onChange }: { answers: WizardAnswers; onChange: (v: WizardAnswers['mounting']) => void }) {
  return (
    <div className="space-y-8" style={{ animation: 'fadeSlideIn 0.35s ease-out both' }}>
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-q-text tracking-tight">Montage & compatibilité</h1>
        <p className="text-q-text-sub">Quel type de montage tu préfères ?</p>
      </div>

      <div className="space-y-3">
        {MOUNTING_OPTIONS.map((opt) => {
          const isSelected = answers.mounting === opt.id
          return (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              aria-pressed={isSelected}
              className={[
                'w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer',
                isSelected
                  ? 'border-q-yellow bg-q-yellow/8'
                  : 'border-q-border bg-q-card hover:border-q-border-sub hover:bg-q-card-hover',
              ].join(' ')}
            >
              <span
                className={[
                  'shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
                  isSelected ? 'border-q-yellow' : 'border-q-border',
                ].join(' ')}
              >
                {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-q-yellow" />}
              </span>
              <div>
                <p className="font-semibold text-q-text text-sm">{opt.label}</p>
                {opt.sub && <p className="text-xs text-q-text-muted">{opt.sub}</p>}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Étape Avancé 2/3 : Budget ────────────────────────────────────

const BUDGET_OPTIONS: { id: BudgetRange; label: string }[] = [
  { id: 'lt35', label: '< 35 €' },
  { id: '35-55', label: '35 – 55 €' },
  { id: '55-80', label: '55 – 80 €' },
  { id: 'gt80', label: '> 80 €' },
  { id: 'peu_importe', label: 'Peu importe — le meilleur selon mes critères' },
]

export function StepAdvBudget({ answers, onChange }: { answers: WizardAnswers; onChange: (v: BudgetRange) => void }) {
  return (
    <div className="space-y-8" style={{ animation: 'fadeSlideIn 0.35s ease-out both' }}>
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-q-text tracking-tight">Ton budget / pneu</h1>
        <p className="text-q-text-sub">On filtre les recommandations en conséquence.</p>
      </div>

      <div className="space-y-3">
        {BUDGET_OPTIONS.map((opt) => {
          const isSelected = answers.budget === opt.id
          const isLast = opt.id === 'peu_importe'
          return (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              aria-pressed={isSelected}
              className={[
                'w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer',
                isSelected
                  ? 'border-q-yellow bg-q-yellow/8'
                  : isLast
                    ? 'border-q-border-track border-dashed bg-q-card/50 hover:border-q-border hover:bg-q-card'
                    : 'border-q-border bg-q-card hover:border-q-border-sub hover:bg-q-card-hover',
              ].join(' ')}
            >
              <span
                className={[
                  'shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
                  isSelected ? 'border-q-yellow' : 'border-q-border',
                ].join(' ')}
              >
                {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-q-yellow" />}
              </span>
              <span className={['font-semibold text-sm', isLast ? 'text-q-text-muted' : 'text-q-text'].join(' ')}>
                {opt.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Étape Avancé 3/3 : Avant / Arrière ──────────────────────────

export function StepAdvAxle({ answers, onChange }: { answers: WizardAnswers; onChange: (v: WizardAnswers['axle']) => void }) {
  return (
    <div className="space-y-8" style={{ animation: 'fadeSlideIn 0.35s ease-out both' }}>
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-q-text tracking-tight">Même pneu à l&apos;avant et à l&apos;arrière ?</h1>
        <p className="text-q-text-sub">Beaucoup de vététistes mixent (ex. plus de grip à l&apos;avant).</p>
      </div>

      <div className="space-y-3">
        {([
          { id: 'meme_pneu' as const, label: 'Le même pneu (simple)', sub: 'Recommandation unique pour les deux roues' },
          { id: 'differents' as const, label: 'Pneus différents AV / AR', sub: "On te propose une paire optimisée" },
        ]).map((opt) => {
          const isSelected = answers.axle === opt.id
          return (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              aria-pressed={isSelected}
              className={[
                'w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer',
                isSelected
                  ? 'border-q-yellow bg-q-yellow/8'
                  : 'border-q-border bg-q-card hover:border-q-border-sub hover:bg-q-card-hover',
              ].join(' ')}
            >
              <span
                className={[
                  'shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
                  isSelected ? 'border-q-yellow' : 'border-q-border',
                ].join(' ')}
              >
                {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-q-yellow" />}
              </span>
              <div>
                <p className="font-semibold text-q-text text-sm">{opt.label}</p>
                <p className="text-xs text-q-text-muted">{opt.sub}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

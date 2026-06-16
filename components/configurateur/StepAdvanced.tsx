import type { WizardAnswers, BudgetRange } from '@/app/configurateur/data'

const BLUE = '#27509B'

function RadioCard({
  selected,
  onClick,
  label,
  sub,
  dashed,
}: {
  selected: boolean
  onClick: () => void
  label: string
  sub?: string
  dashed?: boolean
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200 cursor-pointer"
      style={{
        background: selected ? 'rgba(39,80,155,0.06)' : '#FFFFFF',
        border: selected
          ? `2px solid ${BLUE}`
          : dashed
            ? '1.5px dashed #D1D5DB'
            : '1.5px solid #E2E8F0',
        boxShadow: selected ? 'none' : '0 1px 2px rgba(0,0,0,0.04)',
      }}
    >
      <span
        className="shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
        style={{
          borderColor: selected ? BLUE : '#D1D5DB',
          background: selected ? BLUE : 'transparent',
        }}
      >
        {selected && (
          <svg viewBox="0 0 12 12" fill="none" width="8" height="8">
            <path d="M2 6l2.5 2.5L10 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <div>
        <p className="font-semibold text-[14px]" style={{ color: selected ? '#0D1526' : '#374151' }}>
          {label}
        </p>
        {sub && (
          <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>
            {sub}
          </p>
        )}
      </div>
    </button>
  )
}

// ── Étape Avancé 1/3 : Montage ──────────────────────────────────

const MOUNTING_OPTIONS: { id: NonNullable<WizardAnswers['mounting']>; label: string; sub?: string }[] = [
  { id: 'tubeless_ready', label: 'Tubeless Ready', sub: 'Recommandé — moins de crevaisons' },
  { id: 'chambre_air', label: 'Avec chambre à air', sub: 'Plus simple à réparer' },
  { id: 'les_deux', label: 'Les deux, peu importe' },
]

export function StepAdvMount({
  answers,
  onChange,
}: {
  answers: WizardAnswers
  onChange: (v: WizardAnswers['mounting']) => void
}) {
  return (
    <div className="space-y-8" style={{ animation: 'fadeSlideIn 0.35s ease-out both' }}>
      <div className="text-center space-y-2">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight" style={{ color: '#0D1526' }}>
          Montage &amp; compatibilité
        </h1>
        <p className="text-base" style={{ color: '#6B7280' }}>
          Quel type de montage tu préfères&nbsp;?
        </p>
      </div>

      <div className="space-y-3 max-w-md mx-auto w-full">
        {MOUNTING_OPTIONS.map((opt) => (
          <RadioCard
            key={opt.id}
            selected={answers.mounting === opt.id}
            onClick={() => onChange(opt.id)}
            label={opt.label}
            sub={opt.sub}
          />
        ))}
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

export function StepAdvBudget({
  answers,
  onChange,
}: {
  answers: WizardAnswers
  onChange: (v: BudgetRange) => void
}) {
  return (
    <div className="space-y-8" style={{ animation: 'fadeSlideIn 0.35s ease-out both' }}>
      <div className="text-center space-y-2">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight" style={{ color: '#0D1526' }}>
          Ton budget / pneu
        </h1>
        <p className="text-base" style={{ color: '#6B7280' }}>
          On filtre les recommandations en conséquence.
        </p>
      </div>

      <div className="space-y-3 max-w-md mx-auto w-full">
        {BUDGET_OPTIONS.map((opt) => (
          <RadioCard
            key={opt.id}
            selected={answers.budget === opt.id}
            onClick={() => onChange(opt.id)}
            label={opt.label}
            dashed={opt.id === 'peu_importe'}
          />
        ))}
      </div>
    </div>
  )
}

// ── Étape Avancé 3/3 : Avant / Arrière ──────────────────────────

const AXLE_OPTIONS: { id: NonNullable<WizardAnswers['axle']>; label: string; sub: string }[] = [
  {
    id: 'meme_pneu',
    label: 'Le même pneu (simple)',
    sub: 'Recommandation unique pour les deux roues',
  },
  {
    id: 'differents',
    label: 'Pneus différents AV / AR',
    sub: 'On te propose une paire optimisée',
  },
]

export function StepAdvAxle({
  answers,
  onChange,
}: {
  answers: WizardAnswers
  onChange: (v: WizardAnswers['axle']) => void
}) {
  return (
    <div className="space-y-8" style={{ animation: 'fadeSlideIn 0.35s ease-out both' }}>
      <div className="text-center space-y-2">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight" style={{ color: '#0D1526' }}>
          Même pneu à l&apos;avant et à l&apos;arrière&nbsp;?
        </h1>
        <p className="text-base" style={{ color: '#6B7280' }}>
          Beaucoup de vététistes mixent (ex. plus de grip à l&apos;avant).
        </p>
      </div>

      <div className="space-y-3 max-w-md mx-auto w-full">
        {AXLE_OPTIONS.map((opt) => (
          <RadioCard
            key={opt.id}
            selected={answers.axle === opt.id}
            onClick={() => onChange(opt.id)}
            label={opt.label}
            sub={opt.sub}
          />
        ))}
      </div>
    </div>
  )
}

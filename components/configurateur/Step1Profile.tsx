import type { RiderProfile, WizardAnswers } from '@/app/configurateur/data'
import { RIDER_PROFILES } from '@/app/configurateur/data'

const PROFILE_ICONS: Record<RiderProfile, React.ReactNode> = {
  grand_rouleur: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
    </svg>
  ),
  reprise_vtt: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden="true">
      <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
    </svg>
  ),
  debutant: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden="true">
      <path d="M12 3L1 9l4 2.18V15c0 .88.39 1.67 1 2.22V20h10v-2.78c.61-.55 1-1.34 1-2.22v-3.82L23 9l-11-6zm4 10.82V15c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1v-1.18L12 16l4-2.18zM12 14L5.45 10.5 12 5.09l6.55 5.41L12 14z" />
    </svg>
  ),
  competiteur: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden="true">
      <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
    </svg>
  ),
  balades: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden="true">
      <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
    </svg>
  ),
  velotaf: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden="true">
      <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5S3.1 13.5 5 13.5 8.5 15.1 8.5 17 6.9 20.5 5 20.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V11c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 10.4C7.3 10.8 7 11.4 7 12c0 .6.3 1.2.8 1.6l3.2 2.4V20h2v-5l-3.2-2.4 3-3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z" />
    </svg>
  ),
}

interface Step1ProfileProps {
  answers: WizardAnswers
  onChange: (profile: RiderProfile) => void
}

export default function Step1Profile({ answers, onChange }: Step1ProfileProps) {
  return (
    <div className="space-y-8" style={{ animation: 'fadeSlideIn 0.35s ease-out both' }}>
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-q-text tracking-tight">Quel rouleur es-tu ?</h1>
        <p className="text-q-text-sub">On adapte les questions suivantes à ton profil.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {RIDER_PROFILES.map((p) => {
          const isSelected = answers.profile === p.id
          return (
            <button
              key={p.id}
              onClick={() => onChange(p.id)}
              aria-pressed={isSelected}
              className={[
                'group relative flex flex-col items-start gap-3 p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer',
                isSelected
                  ? 'border-q-yellow bg-q-yellow/8'
                  : 'border-q-border bg-q-card hover:border-q-border-sub hover:bg-q-card-hover',
              ].join(' ')}
            >
              {isSelected && (
                <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-q-yellow flex items-center justify-center">
                  <svg viewBox="0 0 12 12" fill="none" width="10" height="10">
                    <path d="M2 6l3 3 5-5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}

              <span
                className={[
                  'flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-200',
                  isSelected ? 'bg-q-yellow text-black' : 'bg-q-border/30 text-q-text-muted group-hover:bg-q-border/50',
                ].join(' ')}
              >
                {PROFILE_ICONS[p.id]}
              </span>

              <div>
                <p className={['font-bold text-sm transition-colors', isSelected ? 'text-q-text' : 'text-q-text'].join(' ')}>
                  {p.label}
                </p>
                <p className="text-xs text-q-text-muted mt-0.5">{p.desc}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

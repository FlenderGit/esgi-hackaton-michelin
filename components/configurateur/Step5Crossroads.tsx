interface Step5CrossroadsProps {
  onQuick: () => void
  onAdvanced: () => void
}

export default function Step5Crossroads({ onQuick, onAdvanced }: Step5CrossroadsProps) {
  return (
    <div className="space-y-8" style={{ animation: 'fadeSlideIn 0.35s ease-out both' }}>
      <div className="space-y-3 text-center max-w-lg mx-auto">
        <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full border-2 border-q-yellow bg-q-yellow/10">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28" className="text-q-yellow">
            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-q-text tracking-tight">On y est presque !</h1>
        <p className="text-q-text-sub leading-relaxed">
          On a assez d&apos;infos pour te conseiller. Tu peux voir tes recommandations maintenant, ou affiner pour un résultat encore plus précis.
        </p>
      </div>

      <div className="space-y-3 max-w-md mx-auto">
        <button
          onClick={onQuick}
          className="group w-full flex items-start gap-4 p-5 rounded-2xl border-2 border-q-yellow bg-q-yellow/10 hover:bg-q-yellow/15 text-left transition-all duration-200 cursor-pointer"
        >
          <span className="shrink-0 w-8 h-8 rounded-full border-2 border-q-yellow flex items-center justify-center mt-0.5">
            <span className="w-3.5 h-3.5 rounded-full bg-q-yellow" />
          </span>
          <div>
            <p className="font-bold text-q-text">Voir mes recommandations →</p>
            <p className="text-sm text-q-text-muted mt-0.5">Le plus rapide · idéal si tu débutes</p>
          </div>
        </button>

        <button
          onClick={onAdvanced}
          className="group w-full flex items-start gap-4 p-5 rounded-2xl border-2 border-q-border bg-q-card hover:border-q-border-sub hover:bg-q-card-hover text-left transition-all duration-200 cursor-pointer"
        >
          <span className="shrink-0 w-8 h-8 rounded-full border-2 border-q-border flex items-center justify-center mt-0.5" />
          <div>
            <p className="font-bold text-q-text">Affiner (specs avancées)</p>
            <p className="text-sm text-q-text-muted mt-0.5">Tubeless, budget, avant / arrière…</p>
          </div>
        </button>
      </div>
    </div>
  )
}

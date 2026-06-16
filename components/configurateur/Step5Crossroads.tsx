const BLUE = '#27509B'
const YELLOW = '#FCE500'

interface Step5CrossroadsProps {
  onQuick: () => void
  onAdvanced: () => void
}

export default function Step5Crossroads({ onQuick, onAdvanced }: Step5CrossroadsProps) {
  return (
    <div className="space-y-10" style={{ animation: 'fadeSlideIn 0.35s ease-out both' }}>
      <div className="text-center space-y-3 max-w-lg mx-auto">
        <div
          className="flex items-center justify-center w-16 h-16 mx-auto rounded-full"
          style={{ background: `rgba(252,229,0,0.15)`, border: `2px solid ${YELLOW}` }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2.5" width="28" height="28">
            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight" style={{ color: '#0D1526' }}>
          On y est presque&nbsp;!
        </h1>
        <p className="text-base leading-relaxed" style={{ color: '#6B7280' }}>
          On a assez d&apos;infos pour te conseiller. Tu peux voir tes recommandations maintenant,
          ou affiner pour un résultat encore plus précis.
        </p>
      </div>

      <div className="space-y-4 max-w-md mx-auto w-full">
        {/* Quick path — highlighted */}
        <button
          onClick={onQuick}
          className="w-full flex items-start gap-4 p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer hover:shadow-md"
          style={{
            background: `rgba(252,229,0,0.12)`,
            border: `2px solid ${YELLOW}`,
          }}
        >
          <span
            className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border-2 mt-0.5"
            style={{ borderColor: YELLOW, background: 'rgba(252,229,0,0.2)' }}
          >
            <span className="w-3.5 h-3.5 rounded-full" style={{ background: YELLOW }} />
          </span>
          <div>
            <p className="font-bold text-[15px]" style={{ color: '#0D1526' }}>
              Voir mes recommandations →
            </p>
            <p className="text-sm mt-0.5" style={{ color: '#6B7280' }}>
              Le plus rapide · idéal si tu débutes
            </p>
          </div>
        </button>

        {/* Advanced path */}
        <button
          onClick={onAdvanced}
          className="w-full flex items-start gap-4 p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer hover:shadow-sm"
          style={{
            background: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          <span
            className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border-2 mt-0.5"
            style={{ borderColor: '#D1D5DB' }}
          />
          <div>
            <p className="font-bold text-[15px]" style={{ color: '#0D1526' }}>
              Affiner (specs avancées)
            </p>
            <p className="text-sm mt-0.5" style={{ color: '#6B7280' }}>
              Tubeless, budget, avant / arrière… (3 questions)
            </p>
          </div>
        </button>
      </div>
    </div>
  )
}

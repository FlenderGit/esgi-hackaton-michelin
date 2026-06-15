import MichelinLogo from './MichelinLogo'

interface ModeSelectorProps {
  onSelect: (mode: 'quick' | 'full') => void
}

const PROFILES = [
  { emoji: '☕', name: 'Pédale Douce' },
  { emoji: '💪', name: 'Grosse Pédale' },
  { emoji: '📊', name: 'Tryharder' },
  { emoji: '🚨', name: 'Taffeur Psychorigide' },
  { emoji: '🥐', name: 'Pédaleur Gourmand' },
]

export default function ModeSelector({ onSelect }: ModeSelectorProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <header className="px-6 py-5 border-b border-[#161616]">
        <div className="max-w-3xl mx-auto">
          <MichelinLogo />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#FFD100]/20 bg-[#FFD100]/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD100]" />
              <span className="text-[#FFD100] text-xs font-medium tracking-widest uppercase">
                Quiz cycliste
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              Quel cycliste
              <br />
              <span className="text-[#FFD100]">es-tu ?</span>
            </h1>

            <p className="text-[#777] text-base sm:text-lg leading-relaxed max-w-sm mx-auto">
              Découvre ton profil parmi 5 archétypes du cycliste français.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ModeCard
              title="Version Rapide"
              questions={8}
              time="~2 min"
              description="Les questions essentielles pour cerner ton profil sans te prendre la tête."
              badge="Recommandé"
              onSelect={() => onSelect('quick')}
            />
            <ModeCard
              title="Version Complète"
              questions={20}
              time="~5 min"
              description="L'expérience intégrale pour une analyse en profondeur de ta personnalité cycliste."
              onSelect={() => onSelect('full')}
            />
          </div>

          <div className="text-center space-y-3">
            <p className="text-[#3A3A3A] text-xs uppercase tracking-widest">5 profils possibles</p>
            <div className="flex flex-wrap justify-center gap-2">
              {PROFILES.map((p) => (
                <span
                  key={p.name}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141414] border border-[#222] text-[#666] text-xs"
                >
                  <span>{p.emoji}</span>
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

interface ModeCardProps {
  title: string
  questions: number
  time: string
  description: string
  badge?: string
  onSelect: () => void
}

function ModeCard({ title, questions, time, description, badge, onSelect }: ModeCardProps) {
  return (
    <button
      onClick={onSelect}
      className="group relative flex flex-col items-start gap-4 p-6 rounded-2xl border border-[#222] bg-[#111] text-left hover:border-[#FFD100]/40 hover:bg-[#141414] transition-all duration-300 hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
    >
      {badge && (
        <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-[#FFD100] text-black text-[10px] font-black tracking-wider uppercase">
          {badge}
        </span>
      )}

      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="text-[#FFD100] font-black text-2xl">{questions}</span>
          <span className="text-[#555] text-sm">questions · {time}</span>
        </div>
        <h3 className="text-white font-bold text-xl group-hover:text-[#FFD100] transition-colors duration-200">
          {title}
        </h3>
      </div>

      <p className="text-[#666] text-sm leading-relaxed flex-1">{description}</p>

      <div className="flex items-center gap-2 text-[#444] group-hover:text-[#FFD100] transition-all duration-200 text-sm font-medium">
        <span>Commencer</span>
        <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200 inline-block">
          →
        </span>
      </div>
    </button>
  )
}

import type { WizardAnswers, TerrainType, WeatherType } from '@/app/configurateur/data'

const TERRAIN_OPTIONS: { id: TerrainType; label: string; emoji: string }[] = [
  { id: 'sentiers', label: 'Sentiers', emoji: '🌿' },
  { id: 'chemins', label: 'Chemins', emoji: '🪨' },
  { id: 'asphalte', label: 'Asphalte', emoji: '🛣️' },
  { id: 'boue', label: 'Boue', emoji: '💧' },
  { id: 'mixte', label: 'Mixte', emoji: '🔀' },
]

const WEATHER_OPTIONS: { id: WeatherType; label: string; emoji: string }[] = [
  { id: 'sec', label: 'Sec', emoji: '☀️' },
  { id: 'humide', label: 'Humide', emoji: '🌧️' },
  { id: 'boueux', label: 'Boueux', emoji: '🌊' },
]

interface Step2TerrainProps {
  answers: WizardAnswers
  onTerrainChange: (terrain: TerrainType[]) => void
  onWeatherChange: (weather: WeatherType[]) => void
}

function toggle<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]
}

export default function Step2Terrain({ answers, onTerrainChange, onWeatherChange }: Step2TerrainProps) {
  return (
    <div className="space-y-8" style={{ animation: 'fadeSlideIn 0.35s ease-out both' }}>
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-q-text tracking-tight">Où roules-tu le plus souvent ?</h1>
        <p className="text-q-text-sub">Plusieurs choix possibles pour chaque section.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-q-text-muted uppercase tracking-wider">Terrain principal</h2>
          <div className="flex flex-wrap gap-2">
            {TERRAIN_OPTIONS.map((opt) => {
              const isSelected = answers.terrain.includes(opt.id)
              return (
                <button
                  key={opt.id}
                  onClick={() => onTerrainChange(toggle(answers.terrain, opt.id))}
                  aria-pressed={isSelected}
                  className={[
                    'flex items-center gap-2 px-4 py-2.5 rounded-full border-2 text-sm font-medium transition-all duration-200 cursor-pointer',
                    isSelected
                      ? 'border-q-yellow bg-q-yellow text-black'
                      : 'border-q-border bg-q-card text-q-text hover:border-q-border-sub hover:bg-q-card-hover',
                  ].join(' ')}
                >
                  <span>{opt.emoji}</span>
                  <span>{opt.label}</span>
                  {isSelected && <span className="text-xs font-bold">✓</span>}
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-q-text-muted uppercase tracking-wider">Conditions météo</h2>
          <div className="flex flex-wrap gap-2">
            {WEATHER_OPTIONS.map((opt) => {
              const isSelected = answers.weather.includes(opt.id)
              return (
                <button
                  key={opt.id}
                  onClick={() => onWeatherChange(toggle(answers.weather, opt.id))}
                  aria-pressed={isSelected}
                  className={[
                    'flex items-center gap-2 px-4 py-2.5 rounded-full border-2 text-sm font-medium transition-all duration-200 cursor-pointer',
                    isSelected
                      ? 'border-q-yellow bg-q-yellow text-black'
                      : 'border-q-border bg-q-card text-q-text hover:border-q-border-sub hover:bg-q-card-hover',
                  ].join(' ')}
                >
                  <span>{opt.emoji}</span>
                  <span>{opt.label}</span>
                  {isSelected && <span className="text-xs font-bold">✓</span>}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

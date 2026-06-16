import type { WizardAnswers, TerrainType, WeatherType } from '@/app/configurateur/data'

const BLUE = '#27509B'

const TERRAIN_OPTIONS: { id: TerrainType; label: string }[] = [
  { id: 'sentiers', label: 'Sentiers' },
  { id: 'chemins', label: 'Chemins' },
  { id: 'asphalte', label: 'Asphalte' },
  { id: 'boue', label: 'Boue' },
  { id: 'mixte', label: 'Mixte' },
]

const WEATHER_OPTIONS: { id: WeatherType; label: string }[] = [
  { id: 'sec', label: 'Sec' },
  { id: 'humide', label: 'Humide' },
  { id: 'boueux', label: 'Boueux' },
]

interface Step2TerrainProps {
  answers: WizardAnswers
  onTerrainChange: (terrain: TerrainType[]) => void
  onWeatherChange: (weather: WeatherType[]) => void
}

function toggle<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]
}

function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-150 cursor-pointer"
      style={{
        background: selected ? BLUE : '#FFFFFF',
        color: selected ? '#ffffff' : '#374151',
        border: selected ? `2px solid ${BLUE}` : '1.5px solid #E2E8F0',
        boxShadow: selected ? 'none' : '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      {selected && <span className="text-xs">✓</span>}
      {label}
    </button>
  )
}

export default function Step2Terrain({ answers, onTerrainChange, onWeatherChange }: Step2TerrainProps) {
  return (
    <div className="space-y-10" style={{ animation: 'fadeSlideIn 0.3s ease-out both' }}>
      <div className="text-center space-y-2">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight" style={{ color: '#0D1526' }}>
          Où roules-tu le plus souvent&nbsp;?
        </h1>
        <p className="text-base text-gray-500">Plusieurs choix possibles.</p>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Terrain principal</h2>
            <span className="text-xs text-gray-400 font-normal">· choix multiple</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {TERRAIN_OPTIONS.map((opt) => (
              <Chip
                key={opt.id}
                label={opt.label}
                selected={answers.terrain.includes(opt.id)}
                onClick={() => onTerrainChange(toggle(answers.terrain, opt.id))}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Conditions météo</h2>
          <div className="flex flex-wrap gap-2.5">
            {WEATHER_OPTIONS.map((opt) => (
              <Chip
                key={opt.id}
                label={opt.label}
                selected={answers.weather.includes(opt.id)}
                onClick={() => onWeatherChange(toggle(answers.weather, opt.id))}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

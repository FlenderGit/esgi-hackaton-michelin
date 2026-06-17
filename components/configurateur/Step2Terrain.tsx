import type {
  WizardAnswers,
  TerrainType,
  WeatherType,
} from "@/app/configurateur/data";

const TERRAIN_OPTIONS: {
  id: TerrainType;
  label: string;
  emoji: string;
  color: string;
}[] = [
    {
      id: "sentiers",
      label: "Sentiers",
      emoji: "🌲",
      color: "from-green-700/20 to-emerald-600/10",
    },
    {
      id: "chemins",
      label: "Chemins",
      emoji: "🏔️",
      color: "from-amber-700/20 to-orange-600/10",
    },
    {
      id: "asphalte",
      label: "Asphalte",
      emoji: "🛣️",
      color: "from-slate-600/20 to-gray-500/10",
    },
    {
      id: "boue",
      label: "Boue",
      emoji: "💧",
      color: "from-yellow-800/20 to-amber-700/10",
    },
    {
      id: "mixte",
      label: "Mixte",
      emoji: "🔄",
      color: "from-violet-700/20 to-purple-600/10",
    },
  ];

const WEATHER_OPTIONS: { id: WeatherType; label: string; emoji: string }[] = [
  { id: "sec", label: "Sec", emoji: "☀️" },
  { id: "humide", label: "Humide", emoji: "🌧️" },
  { id: "boueux", label: "Boueux", emoji: "🌊" },
];

interface Step2TerrainProps {
  answers: WizardAnswers;
  onTerrainChange: (terrain: TerrainType[]) => void;
  onWeatherChange: (weather: WeatherType[]) => void;
}

function toggle<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

export default function Step2Terrain({
  answers,
  onTerrainChange,
  onWeatherChange,
}: Step2TerrainProps) {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
          Étape 2
        </p>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-q-text">
          Où roules-tu ?
        </h2>
        <p className="text-q-text-muted">
          Plusieurs choix possibles.{" "}
          <span className="text-q-text-dim">
            On combine pour trouver la bonne gomme.
          </span>
        </p>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-bold text-q-text-sub uppercase tracking-wider">
              Terrain principal
            </h3>
            <span className="text-xs text-q-text-dim">· choix multiple</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {TERRAIN_OPTIONS.map((opt) => {
              const sel = answers.terrain.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() =>
                    onTerrainChange(toggle(answers.terrain, opt.id))
                  }
                  aria-pressed={sel}
                  className={`relative flex flex-col items-center gap-2 p-5 rounded-2xl transition-all duration-200 cursor-pointer border-2 group ${sel
                      ? "border-q-yellow shadow-[0_0_16px_rgba(252,229,0,0.1)]"
                      : "border-q-border/50 hover:border-q-yellow/30"
                    }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${opt.color} flex items-center justify-center text-2xl transition-transform duration-200 group-hover:scale-110`}
                  >
                    {opt.emoji}
                  </div>
                  <span
                    className={`text-sm font-semibold ${sel ? "text-q-yellow" : "text-q-text-sub"}`}
                  >
                    {opt.label}
                  </span>
                  {sel && (
                    <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-q-yellow flex items-center justify-center">
                      <svg viewBox="0 0 12 12" fill="none" width="8" height="8">
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="#000C34"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-q-text-sub uppercase tracking-wider">
            Conditions météo
          </h3>
          <div className="flex flex-wrap gap-3">
            {WEATHER_OPTIONS.map((opt) => {
              const sel = answers.weather.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() =>
                    onWeatherChange(toggle(answers.weather, opt.id))
                  }
                  aria-pressed={sel}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-150 cursor-pointer border-2 ${sel
                      ? "border-q-yellow bg-q-yellow/10 text-q-yellow"
                      : "border-q-border/50 text-q-text-sub hover:border-q-yellow/30"
                    }`}
                >
                  <span className="text-base">{opt.emoji}</span>
                  {opt.label}
                  {sel && <span className="text-xs">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

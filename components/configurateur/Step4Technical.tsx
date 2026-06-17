import type { WizardAnswers, WizardBikeType } from "@/app/configurateur/data";
import { WIDTH_OPTIONS } from "@/app/configurateur/data";

const BIKE_TYPES: { id: WizardBikeType; label: string; emoji: string }[] = [
  { id: "vtt", label: "VTT", emoji: "🚵" },
  { id: "route", label: "Route", emoji: "🚴" },
  { id: "gravel", label: "Gravel", emoji: "🏔️" },
  { id: "ville", label: "Ville", emoji: "🏙️" },
  { id: "electrique", label: "Électrique", emoji: "⚡" },
];

interface Step4TechnicalProps {
  answers: WizardAnswers;
  onBikeTypeChange: (type: WizardBikeType) => void;
  onWidthChange: (width: string) => void;
}

export default function Step4Technical({
  answers,
  onBikeTypeChange,
  onWidthChange,
}: Step4TechnicalProps) {
  const widthOpts = answers.bikeType ? WIDTH_OPTIONS[answers.bikeType] : [];

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
          Étape 4
        </p>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-q-text">
          Parle-nous de ton vélo
        </h2>
        <p className="text-q-text-muted">
          Pas sûr ? Choisis « Je ne sais pas », on s&apos;en occupe.
        </p>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-q-text-sub uppercase tracking-wider">
            Type de vélo
          </h3>
          <div className="flex flex-wrap gap-3">
            {BIKE_TYPES.map((bt) => {
              const sel = answers.bikeType === bt.id;
              return (
                <button
                  key={bt.id}
                  onClick={() => {
                    onBikeTypeChange(bt.id);
                    onWidthChange("");
                  }}
                  aria-pressed={sel}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-150 cursor-pointer border-2 ${
                    sel
                      ? "border-q-yellow bg-q-yellow/10 text-q-yellow"
                      : "border-q-border/50 text-q-text-sub hover:border-q-yellow/30"
                  }`}
                >
                  <span className="text-base">{bt.emoji}</span>
                  {bt.label}
                  {sel && <span className="text-xs">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {answers.bikeType && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-bold text-q-text-sub uppercase tracking-wider">
                Largeur de pneu
              </h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-primary/15 text-primary font-medium">
                ⓘ sur le flanc du pneu
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {widthOpts.map((opt) => {
                const sel = answers.width === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => onWidthChange(sel ? "" : opt.value)}
                    aria-pressed={sel}
                    className={`px-5 py-3 rounded-full text-sm font-bold transition-all duration-150 cursor-pointer border-2 tabular-nums ${
                      sel
                        ? "border-q-yellow bg-q-yellow/10 text-q-yellow"
                        : "border-q-border/50 text-q-text-sub hover:border-q-yellow/30"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
              <button
                onClick={() =>
                  onWidthChange(
                    answers.width === "je_ne_sais_pas" ? "" : "je_ne_sais_pas",
                  )
                }
                aria-pressed={answers.width === "je_ne_sais_pas"}
                className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-150 cursor-pointer border-2 border-dashed ${
                  answers.width === "je_ne_sais_pas"
                    ? "border-q-yellow bg-q-yellow/10 text-q-yellow"
                    : "border-q-border/50 text-q-text-dim hover:border-q-yellow/30"
                }`}
              >
                Je ne sais pas
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import type { WizardAnswers, PriorityKey } from "@/app/configurateur/data";

const CRITERIA: {
  id: PriorityKey;
  label: string;
  desc: string;
  emoji: string;
}[] = [
  {
    id: "adherence",
    label: "Adhérence",
    desc: "Grip virages & freinage",
    emoji: "🎯",
  },
  {
    id: "anti_crevaison",
    label: "Anti-crevaison",
    desc: "Résistance aux perforations",
    emoji: "🛡️",
  },
  {
    id: "vitesse",
    label: "Vitesse / rendement",
    desc: "Moins de résistance au roulement",
    emoji: "⚡",
  },
  {
    id: "confort",
    label: "Confort",
    desc: "Absorption des chocs",
    emoji: "🍃",
  },
  {
    id: "longevite",
    label: "Longévité",
    desc: "Durée de vie de la gomme",
    emoji: "🔄",
  },
  { id: "poids", label: "Poids", desc: "Légèreté pour relancer", emoji: "🪶" },
];

interface Step3PrioritiesProps {
  answers: WizardAnswers;
  onChange: (priorities: PriorityKey[]) => void;
}

export default function Step3Priorities({
  answers,
  onChange,
}: Step3PrioritiesProps) {
  const selected = answers.priorities;

  function handleClick(id: PriorityKey) {
    if (selected.includes(id)) {
      onChange(selected.filter((p) => p !== id));
    } else if (selected.length < 3) {
      onChange([...selected, id]);
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
          Étape 3
        </p>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-q-text">
          Qu&apos;est-ce qui compte le plus ?
        </h2>
        <p className="text-q-text-muted">
          Sélectionne tes <strong className="text-q-text">3 critères</strong>{" "}
          prioritaires. Le 1er pèse le plus.
        </p>
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((id, idx) => {
            const crit = CRITERIA.find((c) => c.id === id)!;
            return (
              <div
                key={id}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-bold bg-q-yellow text-q-bg"
              >
                <span className="flex items-center justify-center w-5 h-5 rounded-full text-xs font-black bg-q-bg text-q-yellow">
                  {idx + 1}
                </span>
                {crit.emoji} {crit.label}
                <button
                  onClick={() => onChange(selected.filter((p) => p !== id))}
                  className="opacity-70 hover:opacity-100 cursor-pointer ml-0.5"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CRITERIA.map((crit) => {
          const idx = selected.indexOf(crit.id);
          const isSelected = idx >= 0;
          const isFull = selected.length >= 3 && !isSelected;

          return (
            <button
              key={crit.id}
              onClick={() => !isFull && handleClick(crit.id)}
              disabled={isFull}
              aria-pressed={isSelected}
              className={`flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-200 w-full border-2 group ${
                isSelected
                  ? "border-q-yellow bg-q-yellow/8"
                  : isFull
                    ? "border-q-border/30 bg-q-card/30 opacity-35 cursor-not-allowed"
                    : "border-q-border/50 hover:border-q-yellow/30 cursor-pointer"
              }`}
            >
              <span
                className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-xl text-lg transition-all ${
                  isSelected
                    ? "bg-q-yellow text-q-bg font-black text-sm"
                    : "bg-q-card/60"
                }`}
              >
                {isSelected ? idx + 1 : crit.emoji}
              </span>

              <div className="flex-1 min-w-0">
                <p className="font-bold text-[15px] text-q-text">
                  {crit.label}
                </p>
                <p className="text-sm text-q-text-muted">{crit.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {selected.length === 3 && (
        <p className="text-sm text-q-text-dim">
          Top 3 sélectionné — retire un critère pour en changer un.
        </p>
      )}
    </div>
  );
}

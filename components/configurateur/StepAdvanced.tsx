import type { WizardAnswers, BudgetRange } from "@/app/configurateur/data";

function OptionCard({
  selected,
  onClick,
  icon,
  label,
  sub,
  recommended,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  sub?: string;
  recommended?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className={`relative w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200 cursor-pointer border-2 ${
        selected
          ? "border-q-yellow bg-q-yellow/8 shadow-[0_0_20px_rgba(252,229,0,0.06)]"
          : "border-q-border/40 hover:border-q-border/70 hover:bg-q-card/30"
      }`}
    >
      {recommended && !selected && (
        <span className="absolute -top-2.5 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-q-yellow/15 text-q-yellow border border-q-yellow/20">
          Recommandé
        </span>
      )}
      <span
        className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
          selected
            ? "bg-q-yellow/15 text-q-yellow"
            : "bg-q-border/15 text-q-text-dim"
        }`}
      >
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <p
          className={`font-semibold text-[14px] ${selected ? "text-q-text" : "text-q-text-sub"}`}
        >
          {label}
        </p>
        {sub && (
          <p className="text-xs mt-0.5 text-q-text-dim leading-relaxed">
            {sub}
          </p>
        )}
      </div>
      <span
        className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
          selected ? "border-q-yellow bg-q-yellow" : "border-q-border/50"
        }`}
      >
        {selected && (
          <svg viewBox="0 0 12 12" fill="none" width="8" height="8">
            <path
              d="M2 6l2.5 2.5L10 3.5"
              stroke="#000C34"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </button>
  );
}

function BudgetChip({
  selected,
  onClick,
  label,
  wide,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  wide?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer border-2 ${
        wide ? "col-span-2" : ""
      } ${
        selected
          ? "border-q-yellow bg-q-yellow/10 text-q-yellow"
          : "border-q-border/40 text-q-text-sub hover:border-q-border/70"
      }`}
    >
      {label}
    </button>
  );
}

function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-2">
      <span className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-q-yellow/10 text-q-yellow">
        {icon}
      </span>
      <div>
        <h3 className="text-lg font-bold text-q-text">{title}</h3>
        <p className="text-sm text-q-text-muted mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

const MOUNTING_OPTIONS: {
  id: NonNullable<WizardAnswers["mounting"]>;
  label: string;
  sub: string;
  recommended?: boolean;
  icon: React.ReactNode;
}[] = [
  {
    id: "tubeless_ready",
    label: "Tubeless Ready",
    sub: "Moins de crevaisons, meilleur confort",
    recommended: true,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        width="20"
        height="20"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "chambre_air",
    label: "Chambre à air",
    sub: "Classique et simple à réparer",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        width="20"
        height="20"
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    id: "les_deux",
    label: "Pas de préférence",
    sub: "On regarde tous les pneus",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        width="20"
        height="20"
      >
        <path d="M4 12h16M12 4v16" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function StepAdvMount({
  answers,
  onChange,
}: {
  answers: WizardAnswers;
  onChange: (v: WizardAnswers["mounting"]) => void;
}) {
  return (
    <div className="space-y-5">
      <SectionHeader
        icon={
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            width="18"
            height="18"
          >
            <path
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        title="Type de montage"
        subtitle="Compatibilité de tes jantes"
      />
      <div className="space-y-2.5 max-w-lg mx-auto w-full">
        {MOUNTING_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.id}
            selected={answers.mounting === opt.id}
            onClick={() => onChange(opt.id)}
            icon={opt.icon}
            label={opt.label}
            sub={opt.sub}
            recommended={opt.recommended}
          />
        ))}
      </div>
    </div>
  );
}

const BUDGET_OPTIONS: { id: BudgetRange; label: string }[] = [
  { id: "lt35", label: "< 35€" },
  { id: "35-55", label: "35 – 55€" },
  { id: "55-80", label: "55 – 80€" },
  { id: "gt80", label: "> 80€" },
];

export function StepAdvBudget({
  answers,
  onChange,
}: {
  answers: WizardAnswers;
  onChange: (v: BudgetRange) => void;
}) {
  return (
    <div className="space-y-5">
      <SectionHeader
        icon={
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            width="18"
            height="18"
          >
            <path
              d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        title="Budget par pneu"
        subtitle="On filtre selon ta fourchette"
      />
      <div className="max-w-lg mx-auto w-full">
        <div className="grid grid-cols-2 gap-2.5">
          {BUDGET_OPTIONS.map((opt) => (
            <BudgetChip
              key={opt.id}
              selected={answers.budget === opt.id}
              onClick={() => onChange(opt.id)}
              label={opt.label}
            />
          ))}
          <BudgetChip
            selected={answers.budget === "peu_importe"}
            onClick={() => onChange("peu_importe")}
            label="Peu importe"
            wide
          />
        </div>
      </div>
    </div>
  );
}

const AXLE_OPTIONS: {
  id: NonNullable<WizardAnswers["axle"]>;
  label: string;
  sub: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "meme_pneu",
    label: "Même pneu avant & arrière",
    sub: "Plus simple, une seule recommandation",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        width="20"
        height="20"
      >
        <circle cx="7" cy="12" r="4" />
        <circle cx="17" cy="12" r="4" />
        <path d="M11 12h2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "differents",
    label: "Pneus différents AV / AR",
    sub: "Paire optimisée — plus de grip devant",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        width="20"
        height="20"
      >
        <circle cx="7" cy="12" r="4" />
        <circle cx="17" cy="12" r="4" strokeDasharray="3 2" />
        <path d="M11 12h2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function StepAdvAxle({
  answers,
  onChange,
}: {
  answers: WizardAnswers;
  onChange: (v: WizardAnswers["axle"]) => void;
}) {
  return (
    <div className="space-y-5">
      <SectionHeader
        icon={
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            width="18"
            height="18"
          >
            <circle cx="5" cy="12" r="3" />
            <circle cx="19" cy="12" r="3" />
            <path d="M8 12h8" strokeLinecap="round" />
          </svg>
        }
        title="Avant & arrière"
        subtitle="Beaucoup de vététistes mixent les pneus"
      />
      <div className="space-y-2.5 max-w-lg mx-auto w-full">
        {AXLE_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.id}
            selected={answers.axle === opt.id}
            onClick={() => onChange(opt.id)}
            icon={opt.icon}
            label={opt.label}
            sub={opt.sub}
          />
        ))}
      </div>
    </div>
  );
}

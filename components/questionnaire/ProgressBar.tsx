interface ProgressBarProps {
  current: number
  total: number
  mode: 'quick' | 'full'
}

export default function ProgressBar({ current, total, mode }: ProgressBarProps) {
  const percentage = Math.round(((current - 1) / total) * 100)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-q-yellow text-xs font-semibold uppercase tracking-widest">
            {mode === 'quick' ? 'Rapide' : 'Complet'}
          </span>
          <span className="text-q-text-dim text-xs">·</span>
          <span className="text-q-text-muted text-xs">{current} / {total}</span>
        </div>
        <span className="text-q-text-muted text-xs tabular-nums">{percentage}%</span>
      </div>
      <div className="h-0.5 bg-q-border-track rounded-full overflow-hidden">
        <div
          className="h-full bg-q-yellow rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}

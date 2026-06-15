interface ProgressBarProps {
  current: number
  total: number
  mode: 'quick' | 'full'
}

export default function ProgressBar({ current, total, mode }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[#FFD100] text-xs font-semibold uppercase tracking-widest">
            {mode === 'quick' ? 'Rapide' : 'Complet'}
          </span>
          <span className="text-[#3A3A3A] text-xs">·</span>
          <span className="text-[#555] text-xs">
            {current} / {total}
          </span>
        </div>
        <span className="text-[#555] text-xs tabular-nums">{percentage}%</span>
      </div>
      <div className="h-[2px] bg-[#1E1E1E] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#FFD100] rounded-full transition-all duration-500 ease-out"
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

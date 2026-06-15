import type { Question, AnswerKey } from '../data'

interface QuestionCardProps {
  question: Question
  selectedAnswer: AnswerKey | null
  onAnswer: (key: AnswerKey) => void
}

const LABELS: Record<AnswerKey, string> = { a: 'A', b: 'B', c: 'C', d: 'D' }

export default function QuestionCard({ question, selectedAnswer, onAnswer }: QuestionCardProps) {
  return (
    <div
      className="space-y-8"
      style={{ animation: 'fadeSlideIn 0.35s ease-out both' }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
        {question.text}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.answers.map((answer) => {
          const isSelected = selectedAnswer === answer.key
          const isDimmed = selectedAnswer !== null && !isSelected

          return (
            <button
              key={answer.key}
              onClick={() => !selectedAnswer && onAnswer(answer.key)}
              disabled={isDimmed}
              aria-pressed={isSelected}
              className={[
                'group flex items-start gap-4 p-5 rounded-xl border text-left transition-all duration-200 cursor-pointer',
                isSelected
                  ? 'border-[#FFD100] bg-[#FFD100]/8 scale-[0.99]'
                  : isDimmed
                    ? 'border-[#1A1A1A] bg-[#0E0E0E] opacity-35 cursor-not-allowed'
                    : 'border-[#222] bg-[#111] hover:border-[#383838] hover:bg-[#161616] active:scale-[0.98]',
              ].join(' ')}
            >
              <span
                className={[
                  'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200',
                  isSelected
                    ? 'bg-[#FFD100] text-black'
                    : 'bg-[#1E1E1E] text-[#666] group-hover:bg-[#2A2A2A] group-hover:text-[#AAA]',
                ].join(' ')}
              >
                {isSelected ? '✓' : LABELS[answer.key]}
              </span>

              <span
                className={[
                  'text-sm sm:text-base leading-relaxed transition-colors duration-200',
                  isSelected ? 'text-white' : 'text-[#999] group-hover:text-[#CCC]',
                ].join(' ')}
              >
                {answer.text}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

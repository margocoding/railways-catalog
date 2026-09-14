import { motion } from 'framer-motion'

interface CarouselArrowsProps {
  onPrev: () => void
  onNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  className?: string
  /**
   * inline — пара кнопок рядом, в шапке блока.
   * sides — кнопки по краям карусели на уровне картинок (на телефоне — внутри карточек,
   * шире — выступают за край наполовину); родитель
   * должен быть relative. Недоступная стрелка скрывается, а не бледнеет.
   */
  placement?: 'inline' | 'sides'
}

const baseButton =
  'flex items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none'
const inlineButton = `${baseButton} h-10 w-10 shadow-sm disabled:opacity-30`
const sideButton = `${baseButton} absolute top-[38%] z-10 h-10 w-10 -translate-y-1/2 shadow-md disabled:opacity-0 sm:h-12 sm:w-12`

function Chevron({ d }: { d: string }) {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d={d} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  )
}

export function CarouselArrows({
  onPrev,
  onNext,
  canScrollPrev,
  canScrollNext,
  className = '',
  placement = 'inline',
}: CarouselArrowsProps) {
  const sides = placement === 'sides'
  const buttons = (
    <>
      <motion.button
        type="button"
        whileTap={{ scale: 0.94 }}
        whileHover={{ scale: 1.04 }}
        onClick={onPrev}
        disabled={!canScrollPrev}
        aria-label="Предыдущие"
        className={sides ? `${sideButton} left-2 sm:left-0 sm:-translate-x-1/2 ${className}` : inlineButton}
      >
        <Chevron d="M15 18l-6-6 6-6" />
      </motion.button>

      <motion.button
        type="button"
        whileTap={{ scale: 0.94 }}
        whileHover={{ scale: 1.04 }}
        onClick={onNext}
        disabled={!canScrollNext}
        aria-label="Следующие"
        className={sides ? `${sideButton} right-2 sm:right-0 sm:translate-x-1/2 ${className}` : inlineButton}
      >
        <Chevron d="M9 18l6-6-6-6" />
      </motion.button>
    </>
  )

  return sides ? buttons : <div className={`flex shrink-0 gap-2 ${className}`}>{buttons}</div>
}

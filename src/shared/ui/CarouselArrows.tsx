import { motion } from 'framer-motion'

interface CarouselArrowsProps {
  onPrev: () => void
  onNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  className?: string
  /**
   * inline — пара кнопок рядом, в шапке блока.
   * sides — кнопки по краям карусели на уровне картинок (до широких экранов — внутри карточек,
   * на широких — выступают за край на треть); родитель
   * должен быть relative. Недоступная стрелка скрывается, а не бледнеет.
   */
  placement?: 'inline' | 'sides'
}

const baseButton = 'flex items-center justify-center rounded-full transition-colors disabled:pointer-events-none'
const inlineButton = `${baseButton} h-10 w-10 border border-border bg-card text-foreground shadow-sm hover:border-primary hover:text-primary disabled:opacity-30`
// Полупрозрачные оранжевые кнопки в цвет основных кнопок сайта: на телефоне обычного размера,
// с планшета — крупные. Выступают за край карточек только
// на широких экранах, где у контейнера есть поля, — иначе ушли бы за край окна.
const sideButton = `${baseButton} absolute top-[38%] z-10 h-10 w-10 -translate-y-1/2 bg-accent/60 text-accent-foreground shadow-lg backdrop-blur-sm hover:bg-accent disabled:opacity-0 sm:h-24 sm:w-24`

function Chevron({ d, large = false }: { d: string; large?: boolean }) {
  return (
    <svg className={large ? "h-5 w-5 sm:h-10 sm:w-10" : "h-5 w-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d={d} strokeLinecap="round" strokeLinejoin="round" strokeWidth={large ? 2.5 : 2} />
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
        className={sides ? `${sideButton} left-2 xl:left-0 xl:-translate-x-1/3 ${className}` : inlineButton}
      >
        <Chevron d="M15 18l-6-6 6-6" large={sides} />
      </motion.button>

      <motion.button
        type="button"
        whileTap={{ scale: 0.94 }}
        whileHover={{ scale: 1.04 }}
        onClick={onNext}
        disabled={!canScrollNext}
        aria-label="Следующие"
        className={sides ? `${sideButton} right-2 xl:right-0 xl:translate-x-1/3 ${className}` : inlineButton}
      >
        <Chevron d="M9 18l6-6-6-6" large={sides} />
      </motion.button>
    </>
  )

  return sides ? buttons : <div className={`flex shrink-0 gap-2 ${className}`}>{buttons}</div>
}

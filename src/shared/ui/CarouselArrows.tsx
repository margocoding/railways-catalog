import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

interface CarouselArrowsProps {
  onPrev: () => void
  onNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  className?: string
  /**
   * inline — пара кнопок-галочек рядом, в шапке блока.
   * sides — кнопки с паровозиком по краям карусели на уровне картинок (до широких экранов —
   * внутри карточек, на широких — выступают за край на треть); родитель должен быть relative.
   * Недоступная кнопка скрывается, а не бледнеет.
   */
  placement?: 'inline' | 'sides'
}

const baseButton = 'flex items-center justify-center rounded-full disabled:pointer-events-none'
const inlineButton = `${baseButton} h-10 w-10 border border-border bg-card text-foreground shadow-sm transition-colors hover:border-primary hover:text-primary disabled:opacity-30`
// Полупрозрачные оранжевые кнопки в цвет основных кнопок сайта: на телефоне обычного размера,
// с планшета — крупные. Выступают за край карточек только на широких экранах, где у контейнера
// есть поля, — иначе ушли бы за край окна. Скрываются плавно, чтобы дым успел показаться.
const sideButton = `${baseButton} absolute top-[38%] z-10 h-10 w-10 -translate-y-1/2 bg-accent/35 text-accent-foreground shadow-md backdrop-blur-[2px] transition-[background-color,opacity] duration-500 hover:bg-accent disabled:opacity-0 sm:h-24 sm:w-24`

function Chevron({ d }: { d: string }) {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d={d} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  )
}

type Puff = { id: number; drift: number }

/**
 * Паровозик, смотрящий вправо (для кнопки «назад» отражается). На каждое нажатие из трубы
 * поднимаются три клуба дыма, которые растут и тают; отыгравший клуб удаляется из списка.
 */
function Locomotive({ mirrored, puffs, onPuffDone }: { mirrored: boolean; puffs: Puff[]; onPuffDone: (id: number) => void }) {
  return (
    <span className={`relative block h-6 w-8 sm:h-12 sm:w-16 ${mirrored ? '-scale-x-100' : ''}`} aria-hidden="true">
      <svg className="h-full w-full" viewBox="0 0 48 36" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        {/* будка машиниста с окном */}
        <path d="M4 8h11v18H4z" />
        <path d="M7.5 11.5h4v5h-4z" />
        {/* котёл */}
        <path d="M15 14h19a4 4 0 0 1 4 4v8H15z" />
        {/* труба */}
        <path d="M28 14V8M33 14V8M26.5 7.5h8" />
        {/* метельник спереди */}
        <path d="M38 22l6 4v0h-6" />
        {/* рама и колёса */}
        <path d="M3 26h36" />
        <circle cx="10" cy="30" r="4" />
        <circle cx="22" cy="30" r="4" />
        <circle cx="33" cy="30.5" r="3" />
      </svg>
      <AnimatePresence>
        {puffs.map((puff, index) => (
          <motion.span
            key={puff.id}
            className="pointer-events-none absolute left-[63%] top-[8%] h-3 w-3 -translate-x-1/2 rounded-full bg-neutral-500/50 blur-[1px] sm:h-5 sm:w-5"
            initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: 2.6, x: puff.drift, y: -44 }}
            transition={{ duration: 1.3, delay: index * 0.18, ease: 'easeOut' }}
            onAnimationComplete={() => onPuffDone(puff.id)}
          />
        ))}
      </AnimatePresence>
    </span>
  )
}

function SideButton({ direction, onClick, disabled, className }: { direction: 'prev' | 'next'; onClick: () => void; disabled: boolean; className: string }) {
  const reduceMotion = useReducedMotion()
  const [puffs, setPuffs] = useState<Puff[]>([])

  const handleClick = () => {
    onClick()
    if (reduceMotion) return
    const now = Date.now()
    // Дым уходит назад по ходу движения: паровоз смотрит вправо, отражение для «назад» учтено.
    setPuffs((current) => [...current, ...[0, 1, 2].map((i) => ({ id: now + i, drift: -6 - i * 7 }))])
  }

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.94 }}
      whileHover={{ scale: 1.04 }}
      onClick={handleClick}
      disabled={disabled}
      aria-label={direction === 'prev' ? 'Предыдущие' : 'Следующие'}
      className={`${sideButton} ${direction === 'prev' ? 'left-2 xl:left-0 xl:-translate-x-1/3' : 'right-2 xl:right-0 xl:translate-x-1/3'} ${className}`}
    >
      <Locomotive
        mirrored={direction === 'prev'}
        puffs={puffs}
        onPuffDone={(id) => setPuffs((current) => current.filter((puff) => puff.id !== id))}
      />
    </motion.button>
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
  if (placement === 'sides') {
    return (
      <>
        <SideButton direction="prev" onClick={onPrev} disabled={!canScrollPrev} className={className} />
        <SideButton direction="next" onClick={onNext} disabled={!canScrollNext} className={className} />
      </>
    )
  }

  return (
    <div className={`flex shrink-0 gap-2 ${className}`}>
      <motion.button
        type="button"
        whileTap={{ scale: 0.94 }}
        whileHover={{ scale: 1.04 }}
        onClick={onPrev}
        disabled={!canScrollPrev}
        aria-label="Предыдущие"
        className={inlineButton}
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
        className={inlineButton}
      >
        <Chevron d="M9 18l6-6-6-6" />
      </motion.button>
    </div>
  )
}

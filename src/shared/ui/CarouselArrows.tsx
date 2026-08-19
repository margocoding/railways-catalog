import { motion } from 'framer-motion'

interface CarouselArrowsProps {
  onPrev: () => void
  onNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  className?: string
}

export function CarouselArrows({
  onPrev,
  onNext,
  canScrollPrev,
  canScrollNext,
  className = '',
}: CarouselArrowsProps) {
  return (
    <div className={`flex shrink-0 gap-2 ${className}`}>
      <motion.button
        type="button"
        whileTap={{ scale: 0.94 }}
        whileHover={{ scale: 1.04 }}
        onClick={onPrev}
        disabled={!canScrollPrev}
        aria-label="Предыдущие"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-30"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M15 18l-6-6 6-6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      </motion.button>

      <motion.button
        type="button"
        whileTap={{ scale: 0.94 }}
        whileHover={{ scale: 1.04 }}
        onClick={onNext}
        disabled={!canScrollNext}
        aria-label="Следующие"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-30"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M9 18l6-6-6-6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      </motion.button>
    </div>
  )
}
import { useEffect, useId, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/shared/lib/cn'

export interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  children: ReactNode
  className?: string
}

export function Dialog({ open, onOpenChange, title, description, children, className }: DialogProps) {
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    if (!open) return

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEsc)

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onOpenChange])

  if (typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="dialog-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/50"
        >
          <div
            className="flex min-h-full items-center justify-center p-4"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                onOpenChange(false)
              }
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? titleId : undefined}
              aria-describedby={description ? descriptionId : undefined}
              initial={{ scale: 0.96, y: 8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 8 }}
              transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
              className={cn(
                'relative w-full max-w-lg overflow-hidden rounded-xl border border-border bg-background shadow-lg',
                className
              )}
              onClick={(event: any) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Закрыть"
                onClick={() => onOpenChange(false)}
                className="absolute right-4 top-4 z-20 inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M12.5 3.5L3.5 12.5M3.5 3.5L12.5 12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <div className="max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain">
                {(title || description) && (
                  <div className="sticky top-0 z-10 border-b border-border bg-background px-6 pb-4 pr-14 pt-6">
                    {title && (
                      <h2 id={titleId} className="text-lg font-semibold">
                        {title}
                      </h2>
                    )}
                    {description && (
                      <p id={descriptionId} className="mt-1 text-sm text-muted-foreground">
                        {description}
                      </p>
                    )}
                  </div>
                )}
                <div className={cn('px-6 pb-6', title || description ? 'pt-4' : 'pt-14')}>
                  {children}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
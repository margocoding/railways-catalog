import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/shared/lib/cn'

export interface DrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  children: ReactNode
  className?: string
  side?: 'left' | 'right' | 'top' | 'bottom'
}

export function Drawer({
  open,
  onOpenChange,
  title,
  children,
  className,
  side = 'right',
}: DrawerProps) {
  useEffect(() => {
    if (!open) return

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false)
      }
    }

    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [open, onOpenChange])

  if (!open) return null

  const sideClasses = {
    left: 'left-0 top-0 h-full w-full max-w-sm border-r',
    right: 'right-0 top-0 h-full w-full max-w-sm border-l',
    top: 'top-0 left-0 w-full h-full max-h-[80vh] border-b',
    bottom: 'bottom-0 left-0 w-full h-full max-h-[80vh] border-t',
  }

  const slideAnimation = {
    left: 'slide-in-from-left',
    right: 'slide-in-from-right',
    top: 'slide-in-from-top',
    bottom: 'slide-in-from-bottom',
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'drawer-title' : undefined}
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      {/* Drawer content */}
      <div
        className={cn(
          'fixed z-50 bg-background shadow-lg animate-in',
          slideAnimation[side],
          'duration-200',
          sideClasses[side],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {title && (
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h2 id="drawer-title" className="text-lg font-semibold">
                {title}
              </h2>
              <button
                onClick={() => onOpenChange(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                aria-label="Закрыть"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          <div className="flex-1 overflow-auto p-4">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  )
}

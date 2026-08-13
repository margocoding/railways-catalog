import { useState, type ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

export interface AccordionItem {
  id: string
  trigger: ReactNode
  content: ReactNode
}

export interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  defaultOpen?: string[]
  className?: string
}

export function Accordion({ items, allowMultiple, defaultOpen = [], className }: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen)

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      )
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]))
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id)
        return (
          <div key={item.id} className="rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              className="w-full flex items-center justify-between px-4 py-3 text-left font-medium hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              {item.trigger}
              <svg
                className={cn(
                  'h-5 w-5 transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              id={`accordion-content-${item.id}`}
              role="region"
              aria-labelledby={item.id}
              className={cn(
                'overflow-hidden transition-all duration-200',
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <div className="px-4 pb-4 pt-2">{item.content}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

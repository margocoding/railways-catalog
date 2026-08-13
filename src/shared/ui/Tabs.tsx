import { useState, type ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

export interface Tab {
  id: string
  label: string
  content: ReactNode
}

export interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
}

export function Tabs({ tabs, defaultTab, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  return (
    <div className={className}>
      <div role="tablist" className="flex gap-1 rounded-lg bg-muted p-1 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(e) => {
              const currentIndex = tabs.findIndex((t) => t.id === activeTab)
              if (e.key === 'ArrowRight') {
                const nextIndex = (currentIndex + 1) % tabs.length
                setActiveTab(tabs[nextIndex].id)
              } else if (e.key === 'ArrowLeft') {
                const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length
                setActiveTab(tabs[prevIndex].id)
              }
            }}
            className={cn(
              'flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
              activeTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`tabpanel-${tab.id}`}
          aria-labelledby={tab.label}
          hidden={activeTab !== tab.id}
          className={cn(activeTab === tab.id && 'animate-in fade-in duration-200')}
        >
          {activeTab === tab.id && tab.content}
        </div>
      ))}
    </div>
  )
}

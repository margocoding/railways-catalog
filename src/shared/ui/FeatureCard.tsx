// src/shared/ui/FeatureCard.tsx
import { Card, CardContent } from './Card'
import { cn } from '../lib/cn'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  accent?: string // tailwind-градиент, напр. 'from-primary to-accent'
  className?: string
}

export function FeatureCard({
  icon,
  title,
  description,
  accent = 'from-primary to-accent',
  className,
}: FeatureCardProps) {
  return (
    <Card className={cn('relative overflow-hidden', className)}>
      {/* цветная полоска сверху */}
      <div className={cn('absolute inset-x-0 top-0 h-1 bg-gradient-to-r', accent)} />
      <CardContent className="p-6">
        {/* градиентная подложка иконки */}
        <div className={cn('flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-3xl shadow-lg mb-4', accent)}>
          {icon}
        </div>
        <h3 className="font-bold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}
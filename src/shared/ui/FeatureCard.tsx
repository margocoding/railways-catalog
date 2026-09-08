// src/shared/ui/FeatureCard.tsx
import { Card, CardContent } from './Card'
import { cn } from '../lib/cn'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  accent?: string
  className?: string
}

export function FeatureCard({
  icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <div className="absolute inset-x-0 top-0 h-1 bg-accent" />
      <CardContent className="p-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted text-3xl mb-4">
          {icon}
        </div>
        <h3 className="font-bold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

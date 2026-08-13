import { cn } from '@/shared/lib/cn'

type Variant = 'default' | 'outline' | 'secondary'

const base =
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2'

const variants: Record<Variant, string> = {
  default: 'bg-primary text-primary-foreground',
  outline: 'border border-border text-foreground',
  secondary: 'bg-muted text-muted-foreground',
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: Variant
}

export function Badge({ variant = 'default', className, ...props }: BadgeProps) {
  return (
    <span className={cn(base, variants[variant], className)} {...props} />
  )
}

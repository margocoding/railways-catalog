import { cn } from '@/shared/lib/cn'

type Variant = 'default' | 'muted' | 'interactive' | 'outlined'

const base =
  'rounded-xl border border-border bg-card text-card-foreground overflow-hidden'

const variants: Record<Variant, string> = {
  default: '',
  muted: 'bg-muted/40 border-border/60',
  interactive:
    'cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10',
  outlined: 'bg-transparent border-border/60',
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant
}

export function Card({ variant = 'default', className, ...props }: CardProps) {
  return <div className={cn(base, variants[variant], className)} {...props} />
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-xl font-bold leading-tight tracking-tight', className)} {...props} />
  )
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-muted-foreground leading-relaxed', className)} {...props} />
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6', className)} {...props} />
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex items-center p-6 pt-0', className)} {...props} />
}
import { cn } from '@/shared/lib/cn'

type Variant = 'default' | 'muted'

const base =
  'rounded-xl border border-border bg-card text-card-foreground shadow-sm'

const variants: Record<Variant, string> = {
  default: '',
  muted: 'bg-muted/30',
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant
}

export function Card({ variant = 'default', className, ...props }: CardProps) {
  return (
    <div className={cn(base, variants[variant], className)} {...props} />
  )
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props} />
  )
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-muted-foreground', className)} {...props} />
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pt-0', className)} {...props} />
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex items-center p-6 pt-0', className)} {...props} />
}

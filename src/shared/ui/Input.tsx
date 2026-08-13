import { cn } from '@/shared/lib/cn'

type Size = 'sm' | 'md' | 'lg'

const base =
  'w-full rounded-lg border border-border bg-muted/50 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors'

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-14 px-6 text-base',
}

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: Size
  error?: boolean
}

export function Input({ size = 'md', error, className, ...props }: InputProps) {
  return (
    <input
      className={cn(base, sizes[size], error && 'border-primary ring-1 ring-primary', className)}
      {...props}
    />
  )
}

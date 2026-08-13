import { cn } from '@/shared/lib/cn'

type Size = 'sm' | 'md' | 'lg'

const base =
  'w-full rounded-lg border border-border bg-muted/50 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none'

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 py-2 text-sm',
  md: 'h-11 px-4 py-3 text-sm',
  lg: 'h-14 px-6 py-4 text-base',
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: Size
  error?: boolean
}

export function Textarea({ size = 'md', error, className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(base, sizes[size], error && 'border-primary ring-1 ring-primary', className)}
      {...props}
    />
  )
}

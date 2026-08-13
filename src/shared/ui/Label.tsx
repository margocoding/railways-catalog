import { cn } from '@/shared/lib/cn'

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  error?: boolean
}

export function Label({ className, error, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        'text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        error ? 'text-primary' : 'text-foreground',
        className
      )}
      {...props}
    />
  )
}

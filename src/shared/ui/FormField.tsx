import { cn } from '@/shared/lib/cn'

export interface FormFieldProps {
  label?: string
  hint?: string
  error?: string
  children: React.ReactNode
  className?: string
}

export function FormField({ label, hint, error, children, className }: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {label && <label className="text-sm font-semibold leading-none">{label}</label>}
      {children}
      {(hint || error) && (
        <p className={cn('text-xs', error ? 'text-primary' : 'text-muted-foreground')}>
          {error || hint}
        </p>
      )}
    </div>
  )
}

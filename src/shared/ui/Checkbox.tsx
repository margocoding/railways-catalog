import { cn } from '@/shared/lib/cn'

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: boolean
}

export function Checkbox({ label, error, className, id, ...props }: CheckboxProps) {
  const checkboxId = id || `checkbox-${Math.random().toString(36).slice(2)}`
  
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={checkboxId}
        className={cn(
          'h-4 w-4 rounded border-border bg-muted/50 text-primary focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-primary ring-1 ring-primary',
          className
        )}
        {...props}
      />
      {label && (
        <label
          htmlFor={checkboxId}
          className={cn(
            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer',
            error && 'text-primary'
          )}
        >
          {label}
        </label>
      )}
    </div>
  )
}

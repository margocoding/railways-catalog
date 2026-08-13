import { cn } from '@/shared/lib/cn'

type Size = 'sm' | 'md' | 'lg'

const base =
  'w-full rounded-lg border border-border bg-muted/50 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors'

const sizes: Record<Size, string> = {
  sm: 'h-9 pl-3 pr-8 text-sm',
  md: 'h-11 pl-4 pr-10 text-sm',
  lg: 'h-14 pl-6 pr-12 text-base',
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  size?: Size
  error?: boolean
  options: Array<{ value: string; label: string }>
}

export function Select({ size = 'md', error, className, options, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={cn(
          base,
          sizes[size],
          error && 'border-primary ring-1 ring-primary',
          className,
          // Remove default arrow
          'appearance-none'
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {/* Custom arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}

import { cn } from '@/shared/lib/cn'

export interface IconBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'muted' | 'primary'
}

const sizes = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
}

const variants = {
  default: 'bg-primary text-primary-foreground',
  muted: 'bg-muted text-muted-foreground',
  primary: 'bg-primary/10 text-primary',
}

export function IconBox({ size = 'md', variant = 'default', className, children, ...props }: IconBoxProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-lg',
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

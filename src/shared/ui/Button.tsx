import { cn } from '@/shared/lib/cn'
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'

type Variant =
  'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center cursor-pointer justify-center gap-2 rounded-lg font-semibold tracking-[0.01em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-accent-foreground hover:bg-[#E85E14] active:bg-primary active:text-primary-foreground',
  secondary:
    'border border-border bg-muted/50 text-foreground hover:border-primary hover:text-primary',
  outline: 'border border-border text-foreground hover:bg-muted',
  ghost: 'text-foreground hover:bg-muted',
  link: 'text-primary underline-offset-4 hover:underline',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
}

const sizes: Record<Size, string> = {
  sm: 'min-h-11 px-4 py-2 text-base',
  md: 'min-h-12 px-5 py-2.5 text-base',
  lg: 'min-h-14 px-7 py-3 text-base',
}

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: Variant
  size?: Size
  asChild?: boolean
  children?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      className,
      asChild,
      children,
      ...props
    },
    ref,
  ) => {
    if (asChild) {
      // When asChild is true, render children directly (for Link wrapping)
      return <>{children}</>
    }
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'

import { cn } from '@/shared/lib/cn'

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: 'h1' | 'h2' | 'h3'
}

const variants = {
  h1: 'text-4xl font-black md:text-5xl',
  h2: 'text-3xl font-bold md:text-4xl',
  h3: 'text-2xl font-semibold md:text-3xl',
}

export function SectionHeading({ variant = 'h2', className, ...props }: SectionHeadingProps) {
  const Component = variant
  return <Component className={cn('tracking-tight', variants[variant], className)} {...props} />
}

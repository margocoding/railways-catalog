import { cn } from '@/shared/lib/cn'
import { useEffect, useRef } from 'react'

type Size = 'sm' | 'md' | 'lg'

const base =
  'w-full rounded-lg border border-border bg-muted/50 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none overflow-hidden'

const sizes: Record<Size, string> = {
  sm: 'min-h-[36px] px-3 py-2 text-sm',
  md: 'min-h-[44px] px-4 py-3 text-sm',
  lg: 'min-h-[56px] px-6 py-4 text-base',
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: Size
  error?: boolean
}

export function Textarea({ size = 'md', error, className, ...props }: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const adjustHeight = () => {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }

    adjustHeight()
    
    const observer = new ResizeObserver(adjustHeight)
    observer.observe(textarea)

    textarea.addEventListener('input', adjustHeight)
    return () => {
      observer.disconnect()
      textarea.removeEventListener('input', adjustHeight)
    }
  }, [])

  return (
    <textarea
      ref={textareaRef}
      className={cn(base, sizes[size], error && 'border-primary ring-1 ring-primary', className)}
      {...props}
    />
  )
}

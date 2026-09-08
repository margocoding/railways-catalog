import { useState, type ImgHTMLAttributes } from 'react'
import { MdNoPhotography } from 'react-icons/md'
import { cn } from '../lib'

interface ProductImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string | undefined
  fallbackClassName?: string
  iconClassName?: string
}

export function ProductImage({
  src,
  alt,
  className,
  fallbackClassName,
  iconClassName,
  ...props
}: ProductImageProps) {
  const [failedSrc, setFailedSrc] = useState<string>()

  if (!src || failedSrc === src) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-muted text-muted-foreground',
          fallbackClassName,
        )}
      >
        <MdNoPhotography className={cn('h-8 w-8', iconClassName)} />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      ref={(node) => { if (node?.complete && node.naturalWidth === 0) setFailedSrc(src) }}
      onError={() => setFailedSrc(src)}
      {...props}
    />
  )
}
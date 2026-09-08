import { useState } from 'react'
import { FiPackage } from 'react-icons/fi'
import { getImageUrl } from '@/shared/lib/product-helpers'

export function CatalogImage({
  src,
  alt,
  className = '',
}: {
  src?: string
  alt: string
  className?: string
}) {
  const [failedSrc, setFailedSrc] = useState<string>()
  const url = src ? getImageUrl(src) : ''
  return url && failedSrc !== url ? (
    <img
      src={url}
      alt={alt}
      loading="lazy"
      ref={(node) => { if (node?.complete && node.naturalWidth === 0) setFailedSrc(url) }}
      onError={() => setFailedSrc(url)}
      className={`h-full w-full object-contain ${className}`}
    />
  ) : (
    <div
      role="img"
      aria-label={`${alt}: фото отсутствует`}
      className="flex h-full w-full flex-col items-center justify-center gap-2 bg-muted text-muted-foreground"
    >
      <FiPackage className="h-10 w-10 stroke-1" aria-hidden="true" />
      <span className="text-xs">Фото отсутствует</span>
    </div>
  )
}

import { formatSpec } from './plain-text'
import type { Product } from '@/entities/product'

export function getSpecValue(
  product: Product,
  specId: string,
): string | number | undefined {
  const spec = product.specs?.find((s) => s.id === specId)
  if (!spec) return undefined

  return formatSpec(spec.value, spec.unit)
}

export function getImageUrl(uploadUrl: string): string {
  if (!uploadUrl) return ''
  if (/^https?:\/\//i.test(uploadUrl)) return uploadUrl
  if (uploadUrl.startsWith('/uploads/'))
    return `${(import.meta.env.VITE_IMAGES_API_URL ?? '').replace(/\/$/, '')}${uploadUrl}`
  return uploadUrl.startsWith('/') ? uploadUrl : ''
}

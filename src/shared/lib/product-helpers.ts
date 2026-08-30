import type { Product } from '@/entities/product'

export function getSpecValue(product: Product, specId: string): string | number | undefined {
  const spec = product.specs?.find((s) => s.id === specId)
  if (!spec) return undefined

  if (spec.unit) {
    return `${spec.value} ${spec.unit}`
  }

  return spec.value
}

export function getImageUrl(uploadUrl: string): string {
  return `${import.meta.env.VITE_IMAGES_API_URL}${uploadUrl}`
}
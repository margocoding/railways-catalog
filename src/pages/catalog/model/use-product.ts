import { useState, useEffect, useMemo } from 'react'
import { productApi } from '@/entities/product'
import type { ProductDetailed } from '@/entities/product/api/product.api'

export function useProduct(slug: string | undefined) {
  const [product, setProduct] = useState<ProductDetailed | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [railLength, setRailLength] = useState('12.5')

  useEffect(() => {
    if (!slug) {
      setProduct(null)
      setLoading(false)
      return
    }

    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const data = await productApi.getBySlug(slug!)
        if (!cancelled) {
          setProduct(data)
          setSelectedImage(0)
        }
      } catch (err) {
        if (!cancelled) {
          setError('Товар не найден')
          setProduct(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [slug])

  const weightSpec = product?.specs?.find((s) => s.id === 'weight')
  const lengthSpec = product?.specs?.find((s) => s.id === 'length')

  const weightPerMeter =
    typeof weightSpec?.value === 'number' ? weightSpec.value : 0

  const defaultRailLength =
    typeof lengthSpec?.value === 'number' ? lengthSpec.value : 12.5

  const totalWeight = useMemo(
    () => weightPerMeter * Number(railLength || 0),
    [weightPerMeter, railLength],
  )

  const tons = totalWeight / 1000

  const displaySpecs = useMemo(
    () =>
      product?.specs?.filter(
        (spec) => spec.id !== 'weight' || spec.unit !== 'кг/м',
      ) ?? [],
    [product?.specs],
  )

  const selectedProductImage =
    product?.images[selectedImage] ||
    product?.images[0] ||
    '/placeholders/product.svg'

  const similarProducts = product?.similarProducts ?? []
  const isRail = product?.categorySlug === 'rails'

  return {
    product,
    loading,
    error,
    selectedImage,
    setSelectedImage,
    railLength,
    setRailLength,
    weightPerMeter,
    defaultRailLength,
    totalWeight,
    tons,
    displaySpecs,
    selectedProductImage,
    similarProducts,
    isRail,
  }
}
import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { productApi, type Product, type GetProductsParams } from '@/entities/product'
import { categoryApi, type Category, type FilterOption } from '@/entities/category'
import type { PaginationMeta } from '@/shared/api'
import type { SortOption } from '@/entities/product/model/types'

type FilterCondition = 'new' | 'used' | 'service' | 'all'
type FilterStock = 'all' | 'in-stock' | 'on-order'

export interface FilterState {
  search: string
  condition: FilterCondition
  stock: FilterStock
  sort: SortOption
  attributes: Record<string, string>
}

export interface UseCatalogReturn {
  products: Product[]
  categories: Category[]
  currentCategory?: Category
  currentSubcategory?: Category['subcategories'] extends (infer U)[] | undefined ? U : never
  filters: FilterOption[]
  filterValue: FilterState
  pagination: PaginationMeta
  loading: boolean
  error: string | null
  handleFilterChange: (nextFilters: FilterState) => void
  handlePageChange: (page: number) => void
}

export function useCatalog(): UseCatalogReturn {
  const [searchParams, setSearchParams] = useSearchParams()

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [pagination, setPagination] = useState<PaginationMeta>({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const categorySlug = searchParams.get('category') ?? undefined
  const subcategorySlug = searchParams.get('subcategory') ?? undefined
  const page = parseInt(searchParams.get('page') ?? '1', 10)
  const limit = parseInt(searchParams.get('limit') ?? '20', 10)
  const search = searchParams.get('search') ?? ''
  const condition = (searchParams.get('condition') as FilterCondition) ?? 'all'
  const sort = (searchParams.get('sort') as SortOption) ?? 'name'
  const stock = (searchParams.get('stock') as FilterStock) ?? 'all'

  const attributeFilters = useMemo(() => {
    const attrs: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      if (key.startsWith('attribute_')) {
        const attrKey = key.replace('attribute_', '')
        attrs[attrKey] = value
      }
    })
    return attrs
  }, [searchParams])

  useEffect(() => {
    let cancelled = false

    async function loadCategories() {
      try {
        const response = await categoryApi.getAll({ limit: 100 })
        if (!cancelled) {
          setCategories(response.items)
        }
      } catch (err) {
        console.error('Failed to load categories:', err)
      }
    }

    loadCategories()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function loadProducts() {
      try {
        setLoading(true)
        setError(null)

        const params: GetProductsParams = {
          page,
          limit,
          category: categorySlug,
          subcategory: subcategorySlug,
          search: search || undefined,
          condition: condition !== 'all' ? condition : undefined,
          stock: stock !== 'all' ? stock : undefined,
          sort,
          attributes: attributeFilters,
        }

        const response = await productApi.getAll(params)
        if (!cancelled) {
          setProducts(response.items)
          setPagination(response.pagination)
        }
      } catch (err) {
        if (!cancelled) {
          setError('Ошибка загрузки продуктов')
          console.error('Failed to load products:', err)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadProducts()
    return () => {
      cancelled = true
    }
  }, [page, limit, categorySlug, subcategorySlug, search, condition, stock, sort, attributeFilters])

  const filters = useMemo<FilterOption[]>(() => {
    const specsById = new Map<
      string,
      {
        label: string
        values: Map<string, string>
      }
    >()

    for (const product of products) {
      if (!product.specs) continue

      for (const spec of product.specs) {
        if (spec.value === undefined || spec.value === null) continue

        const value = String(spec.value)
        const displayValue = spec.unit ? `${value} ${spec.unit}` : value

        if (!specsById.has(spec.id)) {
          specsById.set(spec.id, {
            label: spec.label,
            values: new Map(),
          })
        }

        specsById.get(spec.id)!.values.set(value, displayValue)
      }
    }

    return Array.from(specsById.entries()).map(([id, spec]) => ({
      key: id,
      label: spec.label,
      type: 'select',
      options: Array.from(spec.values.entries())
        .sort((a, b) => a[1].localeCompare(b[1], 'ru', { numeric: true }))
        .map(([value, label]) => ({ value, label })),
    }))
  }, [products])

  const handleFilterChange = (nextFilters: FilterState) => {
    const params = new URLSearchParams(searchParams)

    params.set('page', '1')

    if (nextFilters.search) {
      params.set('search', nextFilters.search)
    } else {
      params.delete('search')
    }

    if (nextFilters.condition !== 'all') {
      params.set('condition', nextFilters.condition)
    } else {
      params.delete('condition')
    }

    if (nextFilters.stock !== 'all') {
      params.set('stock', nextFilters.stock)
    } else {
      params.delete('stock')
    }

    if (nextFilters.sort !== 'name') {
      params.set('sort', nextFilters.sort)
    } else {
      params.delete('sort')
    }

    Array.from(params.keys())
      .filter((key) => key.startsWith('attribute_'))
      .forEach((key) => params.delete(key))

    Object.entries(nextFilters.attributes).forEach(([key, value]) => {
      if (value && value !== 'all') {
        params.set(`attribute_${key}`, value)
      }
    })

    setSearchParams(params)
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(newPage))
    setSearchParams(params)
  }

  const currentCategory = categories.find((c) => c.slug === categorySlug)
  const currentSubcategory = currentCategory?.subcategories?.find(
    (s) => s.slug === subcategorySlug,
  )

  const filterValue: FilterState = {
    search,
    condition,
    stock,
    sort,
    attributes: attributeFilters,
  }

  return {
    products,
    categories,
    currentCategory,
    currentSubcategory,
    filters,
    filterValue,
    pagination,
    loading,
    error,
    handleFilterChange,
    handlePageChange,
  }
}
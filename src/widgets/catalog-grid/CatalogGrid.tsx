import type { Product } from '@/entities/product/model/types'
import { ProductCard } from '@/entities/product/ui/ProductCard'
import { FiSearch } from 'react-icons/fi'
export function CatalogGrid({ products }: { products: Product[] }) {
  return products.length ? (
    <div className="grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  ) : (
    <div className="rounded-lg border border-border bg-muted px-6 py-14 text-center">
      <FiSearch className="mx-auto mb-4 h-8 w-8 text-muted-foreground" />
      <h2 className="mb-2 text-2xl font-bold">Ничего не найдено</h2>
      <p className="text-muted-foreground">
        Измените параметры поиска или сбросьте фильтры.
      </p>
    </div>
  )
}

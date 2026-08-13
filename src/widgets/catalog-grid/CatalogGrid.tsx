import type { Product } from "../../entities/product/model/types"
import { ProductCard } from "../../entities/product/ui/ProductCard"


interface CatalogGridProps {
  products: Product[]
}

export function CatalogGrid({ products }: CatalogGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-xl font-bold mb-2">Ничего не найдено</h3>
        <p className="text-[hsl(var(--muted-foreground))]">Попробуйте изменить параметры поиска или фильтры</p>
      </div>
    )
  }

  return (
    <>
      {/* Count */}
      <div className="mb-4 text-sm text-[hsl(var(--muted-foreground))]">
        Найдено: <span className="font-bold text-[hsl(var(--foreground))]">{products.length}</span> позиций
      </div>
      
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}

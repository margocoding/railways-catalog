import type { Product } from '../../entities/product/model/types'
import { ProductCard } from '../../entities/product/ui/ProductCard'

interface CatalogGridProps {
    products: Product[]
}

export function CatalogGrid({ products }: CatalogGridProps) {
    if (products.length === 0) {
        return (
            <div className="py-16 text-center">
                <div className="mb-4 text-6xl">📭</div>

                <h3 className="mb-2 text-xl font-bold">
                    Ничего не найдено
                </h3>

                <p className="text-[hsl(var(--muted-foreground))]">
                    Попробуйте изменить параметры поиска или фильтры
                </p>
            </div>
        )
    }

    return (
        <div>
            {/* Count */}
            <div className="mb-4 text-sm text-[hsl(var(--muted-foreground))]">
                Найдено:{' '}
                <span className="font-bold text-[hsl(var(--foreground))]">
          {products.length}
        </span>{' '}
                позиций
            </div>

            {/* Header */}
            <div className="hidden lg:grid grid-cols-[80px_minmax(220px,1.8fr)_minmax(180px,1.2fr)_80px_120px_56px] items-center gap-4 border-y border-[hsl(var(--border))] py-3 text-sm font-medium text-[hsl(var(--foreground))]">
                <div />

                <div>Название</div>

                <div>ГОСТ</div>

                <div>Вес</div>

                <div>Цена с НДС, шт</div>

                <div />
            </div>

            {/* Products */}
            <div>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    )
}
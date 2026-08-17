import { Link } from 'react-router'

import { formatPrice } from '../../../shared/lib/catalog-helpers'
import type { Product } from '../model/types'
import { AddToCartButton } from '../../../features/cart/ui/AddToCartButton'

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const productUrl = `/catalog/${product.categorySlug}/${product.subcategorySlug}/product/${product.slug}`

    return (
        <div className="group grid min-h-[100px] grid-cols-[80px_minmax(220px,1.8fr)_minmax(180px,1.2fr)_80px_120px_56px] items-center gap-4 border-t border-[hsl(var(--border))]">
            <Link
                to={productUrl}
                className="flex h-[80px] w-[80px] items-center justify-center overflow-hidden bg-[hsl(var(--muted))]"
            >
                <img
                    src={product.images[0] || '/placeholders/product.svg'}
                    alt={product.title}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
            </Link>

            <Link
                to={productUrl}
                className="min-w-0 font-semibold text-[hsl(var(--foreground))] transition-colors hover:text-[hsl(var(--accent))]"
            >
                {product.title}
            </Link>

            <Link
                to={productUrl}
                className="text-sm leading-5 text-[hsl(var(--muted-foreground))]"
            >
                {product.gost || '—'}
            </Link>

            <div className="text-sm text-[hsl(var(--muted-foreground))]">
                {product.weight ? `${product.weight} кг` : '—'}
            </div>

            <div>
                {product.priceOnRequest ? (
                    <span className="font-semibold text-[hsl(var(--accent))]">
            По запросу
          </span>
                ) : (
                    <span className="text-lg font-bold text-[hsl(var(--accent))]">
            {formatPrice(product.price)} ₽
          </span>
                )}
            </div>

            <AddToCartButton product={product} />
        </div>
    )
}
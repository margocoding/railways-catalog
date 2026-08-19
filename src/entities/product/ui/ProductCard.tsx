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
        <div className="group border-t border-[hsl(var(--border))]">
            {/* =====================================================
                DESKTOP
            ===================================================== */}
            <div className="hidden min-h-[100px] grid-cols-[80px_minmax(220px,1.8fr)_minmax(180px,1.2fr)_80px_120px_56px] items-center gap-4 md:grid">
                {/* Image */}
                <Link
                    to={productUrl}
                    className="flex h-[80px] w-[80px] items-center justify-center overflow-hidden rounded-lg bg-[hsl(var(--muted))]"
                >
                    <img
                        src={
                            product.images[0] ||
                            '/placeholders/product.svg'
                        }
                        alt={product.title}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>

                {/* Title */}
                <Link
                    to={productUrl}
                    className="min-w-0 font-semibold text-[hsl(var(--foreground))] transition-colors hover:text-[hsl(var(--accent))]"
                >
                    {product.title}
                </Link>

                {/* GOST */}
                <Link
                    to={productUrl}
                    className="text-sm leading-5 text-[hsl(var(--muted-foreground))]"
                >
                    {product.gost || '—'}
                </Link>

                {/* Weight */}
                <div className="text-sm text-[hsl(var(--muted-foreground))]">
                    {product.weight
                        ? `${product.weight} кг`
                        : '—'}
                </div>

                {/* Price */}
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

                {/* Cart */}
                <AddToCartButton product={product} />
            </div>

            {/* =====================================================
                MOBILE
            ===================================================== */}
            <div className="flex gap-4 py-4 md:hidden">
                {/* Image */}
                <Link
                    to={productUrl}
                    className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[hsl(var(--muted))]"
                >
                    <img
                        src={
                            product.images[0] ||
                            '/placeholders/product.svg'
                        }
                        alt={product.title}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>

                {/* Main content */}
                <div className="min-w-0 flex-1">
                    {/* Title */}
                    <Link
                        to={productUrl}
                        className="block font-semibold leading-5 text-[hsl(var(--foreground))] transition-colors hover:text-[hsl(var(--accent))]"
                    >
                        {product.title}
                    </Link>

                    {/* GOST */}
                    <Link
                        to={productUrl}
                        className="mt-1 block text-xs leading-4 text-[hsl(var(--muted-foreground))]"
                    >
                        {product.gost || '—'}
                    </Link>

                    {/* Weight */}
                    <div className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">
                        Масса:{' '}
                        {product.weight
                            ? `${product.weight} кг`
                            : '—'}
                    </div>

                    {/* Bottom row */}
                    <div className="mt-3 flex items-center justify-between gap-3">
                        {/* Price */}
                        <div className="min-w-0">
                            {product.priceOnRequest ? (
                                <span className="text-sm font-semibold text-[hsl(var(--accent))]">
                                    По запросу
                                </span>
                            ) : (
                                <span className="text-base font-bold text-[hsl(var(--accent))]">
                                    {formatPrice(product.price)} ₽
                                </span>
                            )}
                        </div>

                        {/* Cart */}
                        <div className="shrink-0">
                            <AddToCartButton product={product} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
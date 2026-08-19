import { Link } from 'react-router'

import { formatPrice } from '../../../shared/lib/catalog-helpers'
import type { Product } from '../model/types'
import { AddToCartButton } from '../../../features/cart/ui/AddToCartButton'

interface ProductCardProps {
    product: Product
}

function getSpecValue(
    product: Product,
    id: string,
) {
    const spec = product.specs?.find(
        (item) => item.id === id,
    )

    if (!spec) {
        return '—'
    }

    return `${spec.value}${spec.unit ? ` ${spec.unit}` : ''}`
}

export function ProductCard({ product }: ProductCardProps) {
    const productUrl = `/catalog/${product.categorySlug}/${product.subcategorySlug}/product/${product.slug}`

    const weight = getSpecValue(product, 'weight')

    return (
        <div className="group border-t border-border">
            <div className="hidden min-h-25 grid-cols-[80px_minmax(220px,1.8fr)_minmax(180px,1.2fr)_120px_120px_56px] items-center gap-4 md:grid">
                <Link
                    to={productUrl}
                    className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg bg-muted"
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

                <Link
                    to={productUrl}
                    className="min-w-0 font-semibold text-foreground transition-colors hover:text-primary"
                >
                    {product.title}
                </Link>

                <Link
                    to={productUrl}
                    className="text-sm leading-5 text-muted-foreground"
                >
                    {product.gost || '—'}
                </Link>

                <div className="text-sm text-muted-foreground">
                    {weight}
                </div>

                <div>
                    {product.priceOnRequest ? (
                        <span className="font-semibold text-primary">
                            По запросу
                        </span>
                    ) : (
                        <span className="text-lg font-bold text-primary">
                            {formatPrice(product.price)} ₽
                        </span>
                    )}
                </div>

                <AddToCartButton product={product} />
            </div>

            <div className="flex gap-4 py-4 md:hidden">
                <Link
                    to={productUrl}
                    className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted"
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

                <div className="min-w-0 flex-1">
                    <Link
                        to={productUrl}
                        className="block font-semibold leading-5 text-foreground transition-colors hover:text-primary"
                    >
                        {product.title}
                    </Link>

                    <Link
                        to={productUrl}
                        className="mt-1 block text-xs leading-4 text-muted-foreground"
                    >
                        {product.gost || '—'}
                    </Link>

                    <div className="mt-2 text-xs text-muted-foreground">
                        Масса: {weight}
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3">
                        <div>
                            {product.priceOnRequest ? (
                                <span className="text-sm font-semibold text-primary">
                                    По запросу
                                </span>
                            ) : (
                                <span className="text-base font-bold text-primary">
                                    {formatPrice(product.price)} ₽
                                </span>
                            )}
                        </div>

                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>
        </div>
    )
}
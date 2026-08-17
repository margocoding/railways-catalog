import { Link } from 'react-router'

import {
    categories,
    products,
    subcategories,
} from '../../entities/product/model/mockData'
import type { Category } from '../../entities/product/model/types'

interface CatalogSidebarProps {
    activeCategory?: string
    activeSubcategory?: string
}

export function CatalogSidebar({
                                   activeCategory,
                                   activeSubcategory,
                               }: CatalogSidebarProps) {
    return (
        <aside className="z-10 w-full flex-shrink-0 lg:w-64">
            <nav className="sticky top-20 space-y-1">
                {categories.map((category) => (
                    <SidebarCategory
                        key={category.slug}
                        category={category}
                        isActive={activeCategory === category.slug}
                        activeSubcategory={activeSubcategory}
                    />
                ))}
            </nav>
        </aside>
    )
}

function SidebarCategory({
                             category,
                             isActive,
                             activeSubcategory,
                         }: {
    category: Category
    isActive: boolean
    activeSubcategory?: string
}) {
    const categorySubcategories = subcategories.filter(
        (subcategory) => subcategory.categorySlug === category.slug,
    )

    const productsCount = categorySubcategories.reduce(
        (total, subcategory) =>
            total + getProductsCount(category.slug, subcategory.slug),
        0,
    )

    return (
        <div className="relative z-10 group">
            {/* Category */}
            <Link
                to={`/catalog?category=${category.slug}`}
                className={`block rounded-lg px-4 py-3 font-medium transition-colors ${
                    isActive
                        ? 'bg-[hsl(var(--primary))/0.2] text-[hsl(var(--primary))]'
                        : 'hover:bg-[hsl(var(--muted))]'
                }`}
            >
                <div className="flex items-center justify-between gap-3">
                    <span>{category.name}</span>

                    <span className="text-xs text-[hsl(var(--muted-foreground))]">
            {productsCount}
          </span>
                </div>
            </Link>

            {/* Desktop */}
            <div className="invisible absolute left-full top-0 z-50 hidden w-64 translate-x-1 opacity-0 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 lg:block">
                <div className="overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-xl">
                    {categorySubcategories.map((subcategory) => {
                        const subcategoryUrl = `/catalog?category=${category.slug}&subcategory=${subcategory.slug}`

                        return (
                            <Link
                                key={subcategory.slug}
                                to={subcategoryUrl}
                                className={`block px-4 py-3 transition-colors hover:bg-[hsl(var(--muted))] ${
                                    activeSubcategory === subcategory.slug
                                        ? 'bg-[hsl(var(--muted))]'
                                        : ''
                                }`}
                            >
                                <div className="text-sm font-medium">
                                    {subcategory.name}
                                </div>

                                <div className="mt-0.5 text-xs text-[hsl(var(--muted-foreground))]">
                                    {getProductsCount(category.slug, subcategory.slug)} позиций
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>

            {/* Mobile */}
            <div className="lg:hidden">
                <details open={isActive} className="group/details">
                    <summary className="cursor-pointer list-none px-4 py-2 text-sm text-[hsl(var(--muted-foreground))]">
                        {categorySubcategories.length} категорий
                    </summary>

                    <div className="space-y-1 px-4 pb-2">
                        {categorySubcategories.map((subcategory) => (
                            <Link
                                key={subcategory.slug}
                                to={`/catalog?category=${category.slug}&subcategory=${subcategory.slug}`}
                                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                                    activeSubcategory === subcategory.slug
                                        ? 'bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]'
                                        : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]'
                                }`}
                            >
                                {subcategory.name}
                            </Link>
                        ))}
                    </div>
                </details>
            </div>
        </div>
    )
}

function getProductsCount(
    categorySlug: string,
    subcategorySlug: string,
): number {
    return products.filter(
        (product) =>
            product.categorySlug === categorySlug &&
            product.subcategorySlug === subcategorySlug,
    ).length
}
import { useState } from 'react'
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
            <nav className="sticky top-20 space-y-2">
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
    const [isOpen, setIsOpen] = useState(isActive)
    
    const categorySubcategories = subcategories.filter(
        (subcategory) => subcategory.categorySlug === category.slug,
    )

    return (
        <div className="relative z-10">
            {/* Category Header */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full rounded-lg px-4 py-3 font-medium transition-colors text-left ${
                    isActive
                        ? 'bg-[hsl(var(--primary))/0.1] text-[hsl(var(--primary))]'
                        : 'hover:bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]'
                }`}
            >
                <div className="flex items-center justify-between gap-3">
                    <span>{category.name}</span>
                    
                    <span 
                        className={`text-xs text-[hsl(var(--muted-foreground))] transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                        }`}
                    >
                        ▼
                    </span>
                </div>
            </button>

            {/* Subcategories - Accordion */}
            <div 
                className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="px-4 pb-2 pt-1 space-y-1">
                    {categorySubcategories.map((subcategory) => {
                        const isSubActive = activeSubcategory === subcategory.slug
                        
                        return (
                            <Link
                                key={subcategory.slug}
                                to={`/catalog?category=${category.slug}&subcategory=${subcategory.slug}`}
                                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                                    isSubActive
                                        ? 'bg-[hsl(var(--primary))/0.1] text-[hsl(var(--primary))] font-medium'
                                        : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{subcategory.name}</span>
                                    <span className="text-xs text-[hsl(var(--muted-foreground))]">
                                        {getProductsCount(category.slug, subcategory.slug)}
                                    </span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
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
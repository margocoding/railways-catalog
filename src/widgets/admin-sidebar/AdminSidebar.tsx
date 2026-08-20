import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { cn } from '@/shared/lib/cn'
import { categories, subcategories } from '@/entities/product'

export function AdminSidebar() {
  const location = useLocation()
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set())

  const toggleCategory = (slug: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) {
        next.delete(slug)
      } else {
        next.add(slug)
      }
      return next
    })
  }

  const menuItems = [
    { to: '/admin', label: 'Дашборд', icon: '📊' },
    { to: '/admin/products', label: 'Продукты', icon: '📦' },
    { to: '/admin/orders', label: 'Заказы', icon: '🛒' },
  ]

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-[hsl(var(--background))] border-r border-border overflow-y-auto">
      <nav className="p-4 space-y-2">
        {/* Основные пункты меню */}
        <div className="space-y-1 mb-6">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.to
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[hsl(var(--primary))/0.1] text-[hsl(var(--primary))]'
                    : 'text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]'
                )}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Разделитель */}
        <div className="border-t border-border my-4" />

        {/* Заголовок секции каталога */}
        <div className="px-4 py-2 text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
          Каталог товаров
        </div>

        {/* Дерево категорий */}
        <div className="space-y-1">
          {categories.map((category) => {
            const isOpen = openCategories.has(category.slug)
            const categorySubcategories = subcategories.filter(
              (sub) => sub.categorySlug === category.slug
            )

            return (
              <div key={category.slug}>
                <button
                  type="button"
                  onClick={() => toggleCategory(category.slug)}
                  className={cn(
                    'w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left',
                    isOpen
                      ? 'bg-[hsl(var(--primary))/0.1] text-[hsl(var(--primary))]'
                      : 'text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]'
                  )}
                >
                  <span className="truncate">{category.name}</span>
                  <svg
                    className={cn(
                      'h-4 w-4 transition-transform duration-200',
                      isOpen && 'rotate-180'
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Субкатегории */}
                {isOpen && categorySubcategories.length > 0 && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-border pl-3">
                    {categorySubcategories.map((sub) => (
                      <Link
                        key={sub.slug}
                        to={`/admin/products?category=${category.slug}&subcategory=${sub.slug}`}
                        className="block px-3 py-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]/50 rounded"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </nav>
    </aside>
  )
}

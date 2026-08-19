import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCatalog } from '@/entities/catalog'
import { cn } from '@/shared/lib/cn'

export function AdminSidebar() {
  const { categories, selectedCategory, selectCategory } = useCatalog()
  const location = useLocation()
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set())

  const getSubcategoriesForCategory = (categorySlug: string) => {
    // Здесь можно использовать хук или пропсы для получения субкатегорий
    // Для простоты используем локальную логику
    return []
  }

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
    selectCategory(slug)
  }

  const isActiveCategory = (slug: string) => selectedCategory === slug
  
  const menuItems = [
    { to: '/admin', label: 'Дашборд', icon: '📊' },
    { to: '/admin/products', label: 'Продукты', icon: '📦' },
    { to: '/admin/categories', label: 'Категории', icon: '📂' },
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
            const isActive = isActiveCategory(category.slug)

            return (
              <div key={category.slug}>
                <button
                  type="button"
                  onClick={() => toggleCategory(category.slug)}
                  className={cn(
                    'w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left',
                    isActive
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
                {isOpen && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-border pl-3">
                    {/* Здесь будет рендеринг субкатегорий */}
                    <div className="text-xs text-[hsl(var(--muted-foreground))] py-2">
                      Загрузка субкатегорий...
                    </div>
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

import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { cn } from '@/shared/lib/cn'

export function AdminSidebar() {
  const location = useLocation()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const menuItems = [
    { to: '/admin', label: 'Дашборд', icon: '📊' },
    { to: '/admin/products', label: 'Продукты', icon: '📦' },
    { to: '/admin/orders', label: 'Заказы', icon: '🛒' },
  ]

  return (
    <>
      {/* Мобильная кнопка открытия */}
      <button
        type="button"
        className="lg:hidden fixed left-4 top-20 z-40 p-2 rounded-lg bg-[hsl(var(--background))] border border-border shadow-sm"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Затемнение фона для мобильных */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-[hsl(var(--background))] border-r border-border overflow-y-auto transition-transform duration-300 z-50',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0 lg:z-30'
        )}
      >
        <nav className="p-4 space-y-2">
          {/* Основные пункты меню */}
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.to
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileOpen(false)}
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
        </nav>
      </aside>
    </>
  )
}

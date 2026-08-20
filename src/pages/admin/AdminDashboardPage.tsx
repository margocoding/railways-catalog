import { useState } from 'react'
import { Route, Routes } from 'react-router'
import { AdminLoginPage } from '@/entities/auth'
import { AdminHeader } from '@/widgets/admin-header'
import { AdminSidebar } from '@/widgets/admin-sidebar'
import { getToken } from '@/entities/auth/model/auth.model'
import { AdminProductsPage } from './products'

export function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!getToken()
  })

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <AdminLoginPage onLoginSuccess={handleLoginSuccess} />
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <AdminHeader onLogout={handleLogout} />
      <AdminSidebar />
      
      <main className="ml-64 pt-16 min-h-[calc(100vh-4rem)]">
        <Routes>
          <Route path="/" element={
            <div className="p-6">
              <h1 className="text-3xl font-black mb-6 text-[hsl(var(--foreground))]">Панель управления</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Placeholder для будущих виджетов админки */}
                <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6">
                  <h3 className="font-bold mb-2 text-[hsl(var(--foreground))]">Продукты</h3>
                  <p className="text-[hsl(var(--muted-foreground))] text-sm mb-4">
                    Управление каталогом продукции
                  </p>
                  <div className="text-3xl font-black text-[hsl(var(--primary))]">—</div>
                </div>

                <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6">
                  <h3 className="font-bold mb-2 text-[hsl(var(--foreground))]">Заказы</h3>
                  <p className="text-[hsl(var(--muted-foreground))] text-sm mb-4">
                    Обработка заказов клиентов
                  </p>
                  <div className="text-3xl font-black text-[hsl(var(--primary))]">—</div>
                </div>

                <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6">
                  <h3 className="font-bold mb-2 text-[hsl(var(--foreground))]">Клиенты</h3>
                  <p className="text-[hsl(var(--muted-foreground))] text-sm mb-4">
                    База данных клиентов
                  </p>
                  <div className="text-3xl font-black text-[hsl(var(--primary))]">—</div>
                </div>
              </div>
            </div>
          } />
          <Route path="/products" element={<AdminProductsPage />} />
        </Routes>
      </main>
    </div>
  )
}

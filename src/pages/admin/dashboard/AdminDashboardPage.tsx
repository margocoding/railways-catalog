import { FiPackage, FiDollarSign, FiInbox, FiAlertCircle } from 'react-icons/fi'
import { OrdersChart } from './ui/OrdersChart'
import { RecentOrders } from './ui/RecentOrders'
import { RecentRequests } from './ui/RecentRequests'
import { useDashboard } from '@/entities/stats/model/useDashboard';
import { MetricCard } from './ui/MetricCard';

function calculateTrend(current: number, previous: number): { value: number; isPositive: boolean } | undefined {
  if (previous === 0) return undefined
  const change = ((current - previous) / previous) * 100
  return {
    value: Math.abs(Math.round(change)),
    isPositive: change >= 0,
  }
}

export function AdminDashboardPage() {
  const { stats, isLoading, error } = useDashboard()

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-black mb-2 text-foreground">Панель управления</h1>
          <p className="text-muted-foreground">Загрузка статистики...</p>
        </div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-black mb-2 text-foreground">Панель управления</h1>
          <p className="text-red-500">{error || 'Ошибка загрузки данных'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-black mb-2 text-foreground">Панель управления</h1>
        <p className="text-muted-foreground">Обзор ключевых показателей бизнеса</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Заказы сегодня"
          value={stats.ordersToday}
          icon={<FiPackage className="h-6 w-6" />}
          trend={calculateTrend(stats.ordersToday, stats.ordersYesterday)}
          subtitle={
            stats.ordersYesterday > 0
              ? `Вчера: ${stats.ordersYesterday}`
              : undefined
          }
        />

        <MetricCard
          title="Выручка сегодня"
          value={`${stats.revenueToday.toLocaleString('ru-RU')} ₽`}
          icon={<FiDollarSign className="h-6 w-6" />}
          trend={calculateTrend(stats.revenueToday, stats.revenueYesterday)}
          subtitle={
            stats.revenueYesterday > 0
              ? `Вчера: ${stats.revenueYesterday.toLocaleString('ru-RU')} ₽`
              : undefined
          }
        />

        <MetricCard
          title="Новые заявки сегодня"
          value={stats.requestsToday}
          icon={<FiInbox className="h-6 w-6" />}
        />

        <MetricCard
          title="Товары с низким остатком"
          value={stats.lowStockProducts}
          icon={<FiAlertCircle className="h-6 w-6" />}
          subtitle={`из ${stats.totalProducts} товаров`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <OrdersChart data={stats.ordersChart} />

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-bold mb-6">Общая статистика</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-muted-foreground">Всего товаров</span>
              <span className="font-semibold">{stats.totalProducts}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-muted-foreground">Всего услуг</span>
              <span className="font-semibold">{stats.totalServices}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-muted-foreground">Средний чек</span>
              <span className="font-semibold">
                {stats.ordersToday > 0
                  ? `${Math.round(stats.revenueToday / stats.ordersToday).toLocaleString('ru-RU')} ₽`
                  : '—'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders orders={stats.recentOrders} />
        <RecentRequests requests={stats.recentRequests} />
      </div>
    </div>
  )
}
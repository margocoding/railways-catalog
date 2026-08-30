interface OrdersChartProps {
  data: Array<{
    date: string
    count: number
    revenue: number
  }>
}

export function OrdersChart({ data }: OrdersChartProps) {
  const maxCount = Math.max(...data.map((d) => d.count))

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="text-lg font-bold mb-6">Заказы за последние 7 дней</h3>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.date} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.date}</span>
              <span className="font-semibold">{item.count} заказов</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${(item.count / maxCount) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Выручка: {item.revenue.toLocaleString('ru-RU')} ₽
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
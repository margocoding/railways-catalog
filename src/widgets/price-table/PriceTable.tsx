import { Badge } from '../../shared/ui/Badge'

interface PriceItem {
  name: string
  gost: string
  price: string
  stock: 'in-stock' | 'low-stock' | 'out-of-stock' | '3-days'
}

const priceItems: PriceItem[] = [
  { name: 'Рельс Р-65 новый', gost: 'ГОСТ Р 51685-2022', price: 'от 68 500 ₽', stock: 'in-stock' },
  { name: 'Рельс Р-50 новый', gost: '—', price: 'По запросу', stock: 'in-stock' },
  { name: 'Накладка стыковая 1Р-65', gost: '—', price: 'По запросу', stock: 'in-stock' },
  { name: 'Шпала железобетонная Ш-1-1', gost: '—', price: 'По запросу', stock: '3-days' },
  { name: 'Болт стыковой М22х135 в сборе', gost: '—', price: 'По запросу', stock: 'in-stock' },
  { name: 'Башмак тормозной 8739.00СБ', gost: '—', price: 'По запросу', stock: 'in-stock' },
]

function getStockBadge(stock: PriceItem['stock']) {
  switch (stock) {
    case 'in-stock':
      return <Badge variant="default">В наличии</Badge>
    case 'low-stock':
      return <Badge variant="secondary">Мало</Badge>
    case 'out-of-stock':
      return <Badge variant="outline">Нет в наличии</Badge>
    case '3-days':
      return <Badge variant="outline">Отгрузка 3 дня</Badge>
  }
}

export function PriceTable() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Популярные позиции</h2>
        
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 font-semibold text-muted-foreground">Наименование</th>
                <th className="text-left py-4 px-4 font-semibold text-muted-foreground">ГОСТ</th>
                <th className="text-left py-4 px-4 font-semibold text-muted-foreground">Цена</th>
                <th className="text-left py-4 px-4 font-semibold text-muted-foreground">Наличие</th>
              </tr>
            </thead>
            <tbody>
              {priceItems.map((item, index) => (
                <tr key={index} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="py-4 px-4 font-medium">{item.name}</td>
                  <td className="py-4 px-4 text-muted-foreground">{item.gost}</td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-primary">{item.price}</span>
                  </td>
                  <td className="py-4 px-4">{getStockBadge(item.stock)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {priceItems.map((item, index) => (
            <div key={index} className="rounded-xl border border-border bg-card p-4 space-y-3">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{item.name}</h3>
                  {item.gost !== '—' && (
                    <p className="text-sm text-muted-foreground">ГОСТ: {item.gost}</p>
                  )}
                </div>
                {getStockBadge(item.stock)}
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-border/50">
                {item.gost === '—' && <span className="text-xs text-muted-foreground">ГОСТ не указан</span>}
                <span className="font-semibold text-primary text-lg">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Breadcrumbs } from '../../shared/ui/Breadcrumbs'
import { PriceActions } from '../../widgets/price-actions/PriceActions'
import { PriceTable } from '../../widgets/price-table/PriceTable'
import { PriceRequestForm } from '../../widgets/price-request-form/PriceRequestForm'
import { Layout } from '../../widgets/Layout'

export function PricePage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Хлебные крошки + H1 + интро */}
        <Breadcrumbs items={[
          { label: 'Главная', href: '/' },
          { label: 'Прайс-лист' }
        ]} />
        
        <h1 className="text-3xl font-black mb-2">Прайс-лист</h1>
        <p className="text-[hsl(var(--muted-foreground))] mb-8 max-w-3xl">
          Актуальные цены на материалы верхнего строения пути. 
          Для оптовых партий — индивидуальные условия.
        </p>

        {/* Кнопки действий */}
        <PriceActions />

        {/* Таблица популярных позиций */}
        <PriceTable />

        {/* Примечание */}
        <section className="mb-12">
          <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))] p-6">
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              <strong className="text-[hsl(var(--foreground))]">Обратите внимание:</strong> цены указаны «от» и зависят от объёма партии 
              и состояния материала (новый/б/у). Актуальную цену и наличие уточняйте у менеджера по телефону или через форму ниже.
            </p>
          </div>
        </section>

        {/* Форма запроса прайса */}
        <PriceRequestForm />
      </div>
    </Layout>
  )
}

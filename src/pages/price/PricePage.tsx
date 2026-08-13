import { Breadcrumbs } from '../../shared/ui/Breadcrumbs'
import { SectionHeading } from '../../shared/ui/SectionHeading'
import { PriceActions } from '../../widgets/price-actions/PriceActions'
import { PriceTable } from '../../widgets/price-table/PriceTable'
import { PriceRequestForm } from '../../widgets/price-request-form/PriceRequestForm'

export function PricePage() {
  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Хлебные крошки + H1 + интро */}
        <Breadcrumbs items={[
          { label: 'Главная', href: '/' },
          { label: 'Прайс-лист' }
        ]} />
        
        <SectionHeading variant="h1" className="mb-4">Прайс-лист</SectionHeading>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
          Актуальные цены на материалы верхнего строения пути. 
          Для оптовых партий — индивидуальные условия.
        </p>

        {/* Кнопки действий */}
        <PriceActions />

        {/* Таблица популярных позиций */}
        <PriceTable />

        {/* Примечание */}
        <section className="py-6 md:py-8">
          <div className="container mx-auto px-4">
            <div className="rounded-xl border border-border bg-muted/30 p-4 md:p-6">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Обратите внимание:</strong> цены указаны «от» и зависят от объёма партии 
                и состояния материала (новый/б/у). Актуальную цену и наличие уточняйте у менеджера по телефону или через форму ниже.
              </p>
            </div>
          </div>
        </section>

        {/* Форма запроса прайса */}
        <PriceRequestForm />
      </div>
    </div>
  )
}

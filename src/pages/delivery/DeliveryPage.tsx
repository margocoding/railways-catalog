import { Breadcrumbs } from '../../shared/ui/Breadcrumbs'
import { SectionHeading } from '../../shared/ui/SectionHeading'
import { DeliveryMethods } from '../../widgets/delivery-methods/DeliveryMethods'
import { DeliverySteps } from '../../widgets/delivery-steps/DeliverySteps'
import { DeliveryCTA } from '../../widgets/delivery-cta/DeliveryCTA'
import { Layout } from '../../widgets/Layout'

export function DeliveryPage() {
  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Хлебные крошки + H1 + интро */}
          <Breadcrumbs items={[
            { label: 'Главная', href: '/' },
            { label: 'Доставка' }
          ]} />
          
          <SectionHeading variant="h1" className="mb-4">Доставка</SectionHeading>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            Доставляем материалы ВСП по всей России и СНГ — железнодорожным и автомобильным транспортом, 
            прямо на объект или ваш склад.
          </p>

          {/* Способы доставки */}
          <DeliveryMethods />

          {/* Как происходит доставка */}
          <DeliverySteps />

          {/* Преимущества */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Преимущества доставки</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  { icon: '⏱️', title: 'Отгрузка 48ч', desc: 'Быстрая отгрузка со склада в течение 48 часов' },
                  { icon: '🏭', title: 'Собственные склады', desc: 'Материалы всегда в наличии на наших складах' },
                  { icon: '📄', title: 'Полный пакет документов', desc: 'Предоставляем все сопроводительные документы' },
                  { icon: '🚜', title: 'Помощь с разгрузкой', desc: 'Консультации по разгрузке и размещению' },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl border border-border bg-card p-6 text-center hover:border-primary/50 transition-colors">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h3 className="font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA с формой */}
          <DeliveryCTA />
        </div>
      </div>
    </Layout>
  )
}

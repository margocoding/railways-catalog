import { Breadcrumbs } from '../../shared/ui/Breadcrumbs'
import { DeliveryMethods } from '../../widgets/delivery-methods/DeliveryMethods'
import { DeliverySteps } from '../../widgets/delivery-steps/DeliverySteps'
import { DeliveryCTA } from '../../widgets/delivery-cta/DeliveryCTA'
import { Layout } from '../../widgets/Layout'

export function DeliveryPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Хлебные крошки + H1 + интро */}
        <Breadcrumbs items={[
          { label: 'Главная', href: '/' },
          { label: 'Доставка' }
        ]} />
        
        <h1 className="text-3xl font-black mb-2">Доставка</h1>
        <p className="text-[hsl(var(--muted-foreground))] mb-8 max-w-3xl">
          Доставляем материалы ВСП по всей России и СНГ — железнодорожным и автомобильным транспортом, 
          прямо на объект или ваш склад.
        </p>

        {/* Способы доставки */}
        <DeliveryMethods />

        {/* Как происходит доставка */}
        <DeliverySteps />

        {/* География - блок с картой-заглушкой */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Работаем по всей России и СНГ</h2>
          <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden">
            <div className="aspect-video bg-[hsl(var(--muted))] flex items-center justify-center">
              <div className="text-center p-6">
                <div className="text-5xl mb-4">🗺️</div>
                <h3 className="text-xl font-bold mb-2">Интерактивная карта</h3>
                <p className="text-[hsl(var(--muted-foreground))]">
                  Здесь будет отображена карта регионов нашей работы<br />
                  Россия, Беларусь, Казахстан и другие страны СНГ
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Преимущества */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Преимущества доставки</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '⏱️', title: 'Отгрузка 48ч', desc: 'Быстрая отгрузка со склада в течение 48 часов' },
              { icon: '🏭', title: 'Собственные склады', desc: 'Материалы всегда в наличии на наших складах' },
              { icon: '📄', title: 'Полный пакет документов', desc: 'Предоставляем все сопроводительные документы' },
              { icon: '🚜', title: 'Помощь с разгрузкой', desc: 'Консультации по разгрузке и размещению' },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 text-center hover:border-[hsl(var(--primary))/0.5] transition-colors">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA с формой */}
        <DeliveryCTA />
      </div>
    </Layout>
  )
}

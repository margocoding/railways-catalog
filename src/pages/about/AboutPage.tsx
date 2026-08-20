import { DirectionCard } from '@/shared/ui/DirectionCard'
import { StatCard } from '@/shared/ui/StatCard'
import { FiPhone } from 'react-icons/fi'
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs'
import { Layout } from '../../widgets/Layout'

export function AboutPage() {
  const breadcrumbs = [
    { label: 'Главная', href: '/' },
    { label: 'О компании', href: undefined },
  ]

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />
        
        <h1 className="text-3xl font-black mb-8">О компании</h1>

        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <p className="text-[hsl(var(--muted-foreground))] mb-4">
              Компания «СтальПуть» — надёжный поставщик железнодорожных материалов и путевых изделий 
              на рынке России и стран СНГ. Мы специализируемся на комплексных поставках для 
              строительства, ремонта и содержания железнодорожных путей.
            </p>
            <p className="text-[hsl(var(--muted-foreground))] mb-4">
              Наш ассортимент включает более 500 позиций: рельсы всех типов, шпалы, крепёж, 
              башмаки, упоры и сопутствующие материалы. Собственный склад позволяет поддерживать 
              постоянный запас продукции и обеспечивать быструю отгрузку.
            </p>
            <p className="text-[hsl(var(--muted-foreground))]">
              Работаем как с крупными предприятиями, так и с небольшими организациями. 
              Индивидуальный подход к каждому клиенту и гибкая ценовая политика — 
              наши главные преимущества.
            </p>
          </div>
          <div className="aspect-video bg-[hsl(var(--muted))] rounded-xl overflow-hidden">
            <img 
              src="/placeholders/about.svg" 
              alt="О компании" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatCard value="10+" label="Лет на рынке" />
          <StatCard value="500+" label="Довольных партнёров" />
          <StatCard value="500+" label="Позиций в каталоге" />
          <StatCard value="24/7" label="Поддержка клиентов" />
        </div>

        {/* What we do */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Чем занимаемся</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DirectionCard
              icon="🛤️"
              title="Поставка ВСП"
              description="Комплексные поставки верхнего строения пути: рельсы, шпалы, крепёж"
            />
            <DirectionCard 
              icon="⚙️"
              title="Обработка рельсов"
              description="Порезка, сверление, шлифовка рельсов по размерам заказчика"
            />
            <DirectionCard 
              icon="🚧"
              title="Монтаж/демонтаж"
              description="Работы по укладке и разборке железнодорожных путей"
            />
          </div>
        </div>

        {/* Requisites */}
        <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Реквизиты</h2>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent-gradient rounded-lg font-bold text-white text-sm hover:opacity-90 transition-opacity"
              onClick={() => {
                // Здесь будет логика скачивания файла реквизитов
                console.log('Скачать реквизиты')
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Скачать реквизиты
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-[hsl(var(--muted-foreground))]">Наименование:</span>
              <div className="font-medium">ООО «СтальПуть»</div>
            </div>
            <div>
              <span className="text-[hsl(var(--muted-foreground))]">ИНН:</span>
              <div className="font-medium">7700000000</div>
            </div>
            <div>
              <span className="text-[hsl(var(--muted-foreground))]">ОГРН:</span>
              <div className="font-medium">1027700000000</div>
            </div>
            <div>
              <span className="text-[hsl(var(--muted-foreground))]">Адрес:</span>
              <div className="font-medium">г. Москва, ул. Примерная, 1</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent-gradient rounded-lg font-bold text-white hover:opacity-90 transition-opacity"
            onClick={() => window.dispatchEvent(new CustomEvent('open-request-form'))}
          >
            <FiPhone className="w-5 h-5" />
            Запросить КП
          </button>
        </div>
      </div>
    </Layout>
  )
}





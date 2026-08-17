import { FiCheck, FiPhone } from 'react-icons/fi'
import type { Service } from '../../entities/service/model/mocks'
import { SERVICES } from '../../entities/service/model/mocks'
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs'
import { Button } from '../../shared/ui/Button'
import { Input } from '../../shared/ui/Input'
import { Textarea } from '../../shared/ui/Textarea'
import { Layout } from '../../widgets/Layout'
import { Link } from 'react-router'

export function ServicesPage() {
  const breadcrumbs = [
    { label: 'Главная', href: '/' },
    { label: 'Услуги', href: undefined },
  ]

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />
        
        <h1 className="text-3xl font-black mb-2">Услуги</h1>
        <p className="text-[hsl(var(--muted-foreground))] mb-8">
          Не только поставка, но и обработка и монтаж
        </p>

        {/* Services List - Vertical layout instead of grid */}
        <div className="space-y-4 mb-12">
          {SERVICES.map((service) => (
            <ServiceListItem key={service.slug} service={service} />
          ))}
        </div>

        {/* How we work */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Как мы работаем</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StepCard 
              number="01" 
              title="Заявка" 
              description="Оставляете заявку на сайте или по телефону" 
            />
            <StepCard 
              number="02" 
              title="Расчёт" 
              description="Рассчитываем стоимость и сроки" 
            />
            <StepCard 
              number="03" 
              title="Договор" 
              description="Заключаем договор, выставляем счёт" 
            />
            <StepCard 
              number="04" 
              title="Выполнение" 
              description="Выполняем работы, отгружаем результат" 
            />
          </div>
        </div>

        {/* CTA Form */}
        <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Заказать услугу</h2>
              <p className="text-[hsl(var(--muted-foreground))] mb-6">
                Оставьте заявку — перезвоним в течение 15 минут
              </p>
              <ul className="space-y-3 text-sm text-[hsl(var(--muted-foreground))]">
                <li className="flex items-center gap-2">
                  <FiCheck className="w-4 h-4 text-[hsl(var(--primary))]" />
                  Бесплатный расчёт стоимости
                </li>
                <li className="flex items-center gap-2">
                  <FiCheck className="w-4 h-4 text-[hsl(var(--primary))]" />
                  Консультация специалиста
                </li>
                <li className="flex items-center gap-2">
                  <FiCheck className="w-4 h-4 text-[hsl(var(--primary))]" />
                  Гибкие условия оплаты
                </li>
              </ul>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Ваше имя" size="lg" />
              <Input type="tel" placeholder="Телефон" size="lg" />
              <Input type="email" placeholder="Email" size="lg" />
              <Input placeholder="Адрес доставки" size="lg" />
              <Textarea placeholder="Комментарий к заказу" rows={3} />
              <Button variant="primary" size="lg" className="w-full">
                <FiPhone className="w-5 h-5" />
                Заказать услугу
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

function ServiceListItem({ service }: { service: Service }) {
  return (
    <Link to={`/services/${service.slug}`} className="block">
      <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6 hover:border-[hsl(var(--primary))/0.5] transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          {/* Icon */}
          <div className="text-4xl flex-shrink-0">{service.icon}</div>
          
          {/* Content */}
          <div className="flex-grow">
            <h3 className="text-xl font-bold mb-2 hover:text-[hsl(var(--primary))] transition-colors">
              {service.title}
            </h3>
            <p className="text-[hsl(var(--muted-foreground))] mb-3">{service.description}</p>
            
            <ul className="space-y-1 text-sm text-[hsl(var(--muted-foreground))]">
              {service.slug === 'cutting' && (
                <>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-[hsl(var(--primary))] flex-shrink-0" />
                    Резка ж/д и крановых рельсов
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-[hsl(var(--primary))] flex-shrink-0" />
                    Точность ±1 мм
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-[hsl(var(--primary))] flex-shrink-0" />
                    Любая длина под заказ
                  </li>
                </>
              )}
              {service.slug === 'drilling' && (
                <>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-[hsl(var(--primary))] flex-shrink-0" />
                    Отверстия любого диаметра
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-[hsl(var(--primary))] flex-shrink-0" />
                    По чертежу заказчика
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-[hsl(var(--primary))] flex-shrink-0" />
                    Сверление без перегрева
                  </li>
                </>
              )}
              {service.slug === 'grinding' && (
                <>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-[hsl(var(--primary))] flex-shrink-0" />
                    Устранение износа головки
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-[hsl(var(--primary))] flex-shrink-0" />
                    Восстановление профиля
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-[hsl(var(--primary))] flex-shrink-0" />
                    Продление срока службы
                  </li>
                </>
              )}
              {service.slug === 'dismantling' && (
                <>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-[hsl(var(--primary))] flex-shrink-0" />
                    Полный комплекс работ
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-[hsl(var(--primary))] flex-shrink-0" />
                    Собственная техника
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-[hsl(var(--primary))] flex-shrink-0" />
                    Работы по всей России
                  </li>
                </>
              )}
            </ul>
          </div>
          
          {/* Button */}
          <div className="flex-shrink-0">
            <button className="w-full md:w-auto py-3 px-6 bg-accent-gradient rounded-lg font-bold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              <FiPhone className="w-5 h-5" />
              Заказать
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6 text-center">
      <div className="text-4xl font-black text-[hsl(var(--primary))] mb-2">{number}</div>
      <h4 className="font-bold mb-2">{title}</h4>
      <p className="text-sm text-[hsl(var(--muted-foreground))]">{description}</p>
    </div>
  )
}

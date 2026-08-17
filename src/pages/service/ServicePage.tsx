import { useParams } from 'react-router'
import { FiCheck, FiPhone, FiArrowLeft } from 'react-icons/fi'
import { SERVICES } from '../../entities/service/model/mocks'
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs'
import { Button } from '../../shared/ui/Button'
import { Input } from '../../shared/ui/Input'
import { Textarea } from '../../shared/ui/Textarea'
import { Layout } from '../../widgets/Layout'
import { Link } from 'react-router'

export function ServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const service = SERVICES.find(s => s.slug === slug)

  if (!service) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold">Услуга не найдена</h1>
        </div>
      </Layout>
    )
  }

  const breadcrumbs: { label: string; href?: string }[] = [
    { label: 'Главная', href: '/' },
    { label: 'Услуги', href: '/services' },
    { label: service.title, href: undefined },
  ]

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />
        
        <Link to="/services" className="inline-flex items-center gap-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors mb-6">
          <FiArrowLeft className="w-4 h-4" />
          Назад к услугам
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Info */}
          <div>
            <div className="text-5xl mb-4">{service.icon}</div>
            <h1 className="text-3xl font-black mb-4">{service.title}</h1>
            <p className="text-[hsl(var(--muted-foreground))] mb-6 text-lg">
              {service.description}
            </p>

            <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Что входит в услугу:</h2>
              <ul className="space-y-3">
                {slug === 'cutting' && (
                  <>
                    <li className="flex items-center gap-2">
                      <FiCheck className="w-5 h-5 text-[hsl(var(--primary))]" />
                      Резка ж/д и крановых рельсов
                    </li>
                    <li className="flex items-center gap-2">
                      <FiCheck className="w-5 h-5 text-[hsl(var(--primary))]" />
                      Точность ±1 мм
                    </li>
                    <li className="flex items-center gap-2">
                      <FiCheck className="w-5 h-5 text-[hsl(var(--primary))]" />
                      Любая длина под заказ
                    </li>
                  </>
                )}
                {slug === 'drilling' && (
                  <>
                    <li className="flex items-center gap-2">
                      <FiCheck className="w-5 h-5 text-[hsl(var(--primary))]" />
                      Отверстия любого диаметра
                    </li>
                    <li className="flex items-center gap-2">
                      <FiCheck className="w-5 h-5 text-[hsl(var(--primary))]" />
                      По чертежу заказчика
                    </li>
                    <li className="flex items-center gap-2">
                      <FiCheck className="w-5 h-5 text-[hsl(var(--primary))]" />
                      Сверление без перегрева
                    </li>
                  </>
                )}
                {slug === 'grinding' && (
                  <>
                    <li className="flex items-center gap-2">
                      <FiCheck className="w-5 h-5 text-[hsl(var(--primary))]" />
                      Устранение износа головки
                    </li>
                    <li className="flex items-center gap-2">
                      <FiCheck className="w-5 h-5 text-[hsl(var(--primary))]" />
                      Восстановление профиля
                    </li>
                    <li className="flex items-center gap-2">
                      <FiCheck className="w-5 h-5 text-[hsl(var(--primary))]" />
                      Продление срока службы
                    </li>
                  </>
                )}
                {slug === 'dismantling' && (
                  <>
                    <li className="flex items-center gap-2">
                      <FiCheck className="w-5 h-5 text-[hsl(var(--primary))]" />
                      Полный комплекс работ
                    </li>
                    <li className="flex items-center gap-2">
                      <FiCheck className="w-5 h-5 text-[hsl(var(--primary))]" />
                      Собственная техника
                    </li>
                    <li className="flex items-center gap-2">
                      <FiCheck className="w-5 h-5 text-[hsl(var(--primary))]" />
                      Работы по всей России
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* How we work */}
            <div>
              <h2 className="text-xl font-bold mb-4">Как мы работаем</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-4 text-center">
                  <div className="text-2xl font-black text-[hsl(var(--primary))] mb-1">01</div>
                  <div className="font-bold text-sm">Заявка</div>
                </div>
                <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-4 text-center">
                  <div className="text-2xl font-black text-[hsl(var(--primary))] mb-1">02</div>
                  <div className="font-bold text-sm">Расчёт</div>
                </div>
                <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-4 text-center">
                  <div className="text-2xl font-black text-[hsl(var(--primary))] mb-1">03</div>
                  <div className="font-bold text-sm">Договор</div>
                </div>
                <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-4 text-center">
                  <div className="text-2xl font-black text-[hsl(var(--primary))] mb-1">04</div>
                  <div className="font-bold text-sm">Выполнение</div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6 h-fit sticky top-24">
            <h2 className="text-2xl font-bold mb-2">Заказать услугу</h2>
            <p className="text-[hsl(var(--muted-foreground))] mb-6">
              Оставьте заявку — перезвоним в течение 15 минут
            </p>
            
            <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))] mb-6">
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

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Ваше имя" size="lg" required />
              <Input type="tel" placeholder="Телефон" size="lg" required />
              <Input type="email" placeholder="Email" size="lg" required />
              <Input placeholder="Адрес доставки" size="lg" required />
              <Textarea 
                placeholder="Комментарий к заказу" 
                rows={3} 
              />
              <input type="hidden" name="serviceSlug" value={service.slug} />
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

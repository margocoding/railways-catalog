import { useParams, Link } from 'react-router'
import { FiCheck, FiArrowLeft } from 'react-icons/fi'
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs'
import { Button } from '@/shared/ui/Button'
import { Layout } from '@/widgets/Layout'
import { useService } from '@/entities/service/model/hooks/useService'
import { getImageUrl } from '@/shared/lib'
import { ServiceRequestForm } from '@/features/service-request/ServiceRequestForm'

export function ServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const { service, isLoading, error, notFound } = useService(slug)

  const breadcrumbs = service
    ? [
        { label: 'Главная', href: '/' },
        { label: 'Услуги', href: '/services' },
        { label: service.title, href: undefined },
      ]
    : [
        { label: 'Главная', href: '/' },
        { label: 'Услуги', href: '/services' },
      ]

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        {isLoading && (
          <div className="py-16 text-center">
            <p className="text-[hsl(var(--muted-foreground))]">Загрузка услуги...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="py-16 text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Link to="/services">
              <Button variant="primary">
                <FiArrowLeft className="w-4 h-4 mr-2" />
                Вернуться к услугам
              </Button>
            </Link>
          </div>
        )}

        {notFound && !isLoading && (
          <div className="py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Услуга не найдена</h1>
            <Link to="/services">
              <Button variant="primary">
                <FiArrowLeft className="w-4 h-4 mr-2" />
                Вернуться к услугам
              </Button>
            </Link>
          </div>
        )}

        {service && !isLoading && !error && !notFound && (
          <>
            <div className="mb-8">
              <Link
                to="/services"
                className="inline-flex items-center text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors mb-4"
              >
                <FiArrowLeft className="w-4 h-4 mr-1" />
                Назад к услугам
              </Link>

              <div className="flex flex-col md:flex-row items-start gap-6 mb-4">
                <div className="h-32 w-32 md:h-40 md:w-40 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                  {service.image ? (
                    <img
                      src={getImageUrl(service.image)}
                      alt={service.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                      <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-black mb-2">{service.title}</h1>
                  <p className="text-lg text-[hsl(var(--muted-foreground))]">{service.description}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2 space-y-8">
                {service.fullDescription && (
                  <section className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6">
                    <h2 className="text-xl font-bold mb-4">Описание услуги</h2>
                    <p className="text-[hsl(var(--muted-foreground))] leading-relaxed whitespace-pre-line">
                      {service.fullDescription}
                    </p>
                  </section>
                )}

                {service.features && service.features.length > 0 && (
                  <section className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6">
                    <h2 className="text-xl font-bold mb-4">Преимущества</h2>
                    <ul className="space-y-3">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <FiCheck className="w-5 h-5 text-[hsl(var(--primary))] flex-shrink-0 mt-0.5" />
                          <span className="text-[hsl(var(--muted-foreground))]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                <section className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6">
                  <h2 className="text-xl font-bold mb-4">Как мы работаем</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-black text-[hsl(var(--primary))] mb-2">01</div>
                      <h4 className="font-bold text-sm mb-1">Заявка</h4>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">Оставляете заявку на сайте</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-[hsl(var(--primary))] mb-2">02</div>
                      <h4 className="font-bold text-sm mb-1">Расчёт</h4>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">Рассчитываем стоимость</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-[hsl(var(--primary))] mb-2">03</div>
                      <h4 className="font-bold text-sm mb-1">Договор</h4>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">Заключаем договор</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-[hsl(var(--primary))] mb-2">04</div>
                      <h4 className="font-bold text-sm mb-1">Выполнение</h4>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">Выполняем работу</p>
                    </div>
                  </div>
                </section>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-20">
                  <ServiceRequestForm
                    serviceId={service.id}
                    serviceTitle={service.title}
                    compact
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}
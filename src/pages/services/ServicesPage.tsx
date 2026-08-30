// src/pages/services/ui/ServicesPage.tsx
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs'
import { Layout } from '@/widgets/Layout'
import { useServices } from '@/entities/service/model/hooks/useServices'
import { ServiceListItem } from '@/entities/service/ui/ServiceListItem'
import { HowWeWork } from '@/widgets/how-we-work/ui/HowWeWork'
import { ServiceRequestForm } from '@/features/service-request/ServiceRequestForm'

export function ServicesPage() {
  const { services, isLoading, error } = useServices()

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

        {isLoading && (
          <div className="py-12 text-center">
            <p className="text-[hsl(var(--muted-foreground))]">Загрузка услуг...</p>
          </div>
        )}

        {error && (
          <div className="py-12 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {!isLoading && !error && services.length > 0 && (
          <div className="space-y-4 mb-12">
            {services.map((service) => (
              <ServiceListItem key={service.id} service={service} />
            ))}
          </div>
        )}

        {!isLoading && !error && services.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-[hsl(var(--muted-foreground))]">Услуги не найдены</p>
          </div>
        )}

        <HowWeWork />

        <ServiceRequestForm />
      </div>
    </Layout>
  )
}
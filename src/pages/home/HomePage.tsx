import { useState } from 'react'
import { FiFileText } from 'react-icons/fi'
import { Layout } from '@/widgets/Layout'
import { Hero } from '@/widgets/hero/ui/Hero'
import { CategoriesCarousel } from '@/widgets/categories-carousel/ui/CategoriesCarousel'
import { PopularProducts } from '@/widgets/popular-products/ui/PopularProducts'
import { MaterialsServices } from '@/widgets/materials-services/MaterialsServices'
import { CompanyInfo } from '@/widgets/company-info/CompanyInfo'
import { FastenersSection } from '@/widgets/fasteners-section/FastenersSection'
import { RequestFormModal } from '@/shared/ui/RequestFormModal'

export function HomePage() {
  const [requestFormOpen, setRequestFormOpen] = useState(false)

  return (
    <Layout>
      <Hero />
      <CategoriesCarousel />
      <PopularProducts />
      <MaterialsServices />
      <CompanyInfo />
      <FastenersSection />

      <button
        type="button"
        onClick={() => setRequestFormOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-4 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
      >
        <FiFileText className="h-5 w-5" />
        Получить КП
      </button>

      <RequestFormModal
        open={requestFormOpen}
        onOpenChange={setRequestFormOpen}
      />
    </Layout>
  )
}
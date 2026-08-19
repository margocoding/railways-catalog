import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { AboutPage } from './pages/about/AboutPage'
import { CatalogPage } from './pages/catalog/CatalogPage'
import { ProductPage } from './pages/catalog/ProductPage'
import { ContactsPage } from './pages/contacts/ContactsPage'
import { DeliveryPage } from './pages/delivery/DeliveryPage'
import { PricePage } from './pages/price/PricePage'
import { ServicesPage } from './pages/services/ServicesPage'
import { ServicePage } from './pages/services/ServicePage'
import { CartPage } from './pages/cart/CartPage'
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'
import { AdminLoginPage } from './entities/auth'
import { Layout } from './widgets/Layout'
import { Hero } from './widgets/hero/Hero'
import { CategoriesCarousel } from './widgets/categories-carousel/CategoriesCarousel'
import { PopularProducts } from './widgets/popular-products/PopularProducts'
import { MaterialsServices } from './widgets/materials-services/MaterialsServices'
import { CompanyInfo } from './widgets/company-info/CompanyInfo'
import { FastenersSection } from './widgets/fasteners-section/FastenersSection'
import { RequestFormModal } from './shared/ui/RequestFormModal'
import { ProtectedRoute } from './shared/ui/ProtectedRoute'

function HomePage() {
    const [requestFormOpen, setRequestFormOpen] = useState(false)

    return (
        <Layout>
            <Hero />
            <CategoriesCarousel />
            <PopularProducts />
            <MaterialsServices />
            <CompanyInfo />
            <FastenersSection />
            <RequestFormModal
                open={requestFormOpen}
                onOpenChange={setRequestFormOpen}
            />
        </Layout>
    )
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/catalog/:categorySlug/:subcategorySlug/product/:productSlug" element={<ProductPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:slug" element={<ServicePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/delivery" element={<DeliveryPage />} />
                <Route path="/price" element={<PricePage />} />
                <Route path="/cart" element={<CartPage />} />
                
                {/* Admin routes */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route 
                    path="/admin/*" 
                    element={
                        <ProtectedRoute>
                            <AdminDashboardPage />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App

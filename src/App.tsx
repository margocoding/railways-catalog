import { BrowserRouter, Routes, Route } from 'react-router'
import { Layout } from './widgets/Layout'
import { Hero } from './widgets/hero/Hero'
import { TrustBar } from './widgets/trust-bar/TrustBar'
import { Advantages } from './widgets/advantages/Advantages'
import { ServicesTeaser } from './widgets/services-teaser/ServicesTeaser'
import { QuoteCTA } from './widgets/quote-cta/QuoteCTA'
import { CatalogPage } from './pages/catalog/CatalogPage'
import { SectionPage } from './pages/catalog/SectionPage'
import { ProductPage } from './pages/catalog/ProductPage'
import { ServicesPage } from './pages/services/ServicesPage'
import { AboutPage } from './pages/about/AboutPage'
import { ContactsPage } from './pages/contacts/ContactsPage'
import { DeliveryPage } from './pages/delivery/DeliveryPage'
import { PricePage } from './pages/price/PricePage'
import { HomeCategoriesSidebar } from './widgets/home-categories-sidebar/HomeCategoriesSidebar'

function HomePage() {
  return (
    <Layout>
      <Hero />
      <HomeCategoriesSidebar />
      <TrustBar />
      <Advantages />
      <ServicesTeaser />
      <QuoteCTA />
    </Layout>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:section" element={<SectionPage />} />
        <Route path="/catalog/:section/:category/:slug" element={<ProductPage />} />
        <Route path="/catalog/:section/:slug" element={<ProductPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/price" element={<PricePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

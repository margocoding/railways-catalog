import { BrowserRouter, Route, Routes } from 'react-router'
import { AboutPage } from './pages/about/AboutPage'
import { CatalogPage } from './pages/catalog/CatalogPage'
import { ProductPage } from './pages/catalog/ProductPage'
import { SectionPage } from './pages/catalog/SectionPage'
import { ContactsPage } from './pages/contacts/ContactsPage'
import { DeliveryPage } from './pages/delivery/DeliveryPage'
import { PricePage } from './pages/price/PricePage'
import { ServicesPage } from './pages/services/ServicesPage'
import { ServicePage } from './pages/service/ServicePage'
import { Layout } from './widgets/Layout'
import { Advantages } from './widgets/advantages/Advantages'
import { Hero } from './widgets/hero/Hero'
import { QuoteCTA } from './widgets/quote-cta/QuoteCTA'
import { ServicesTeaser } from './widgets/services-teaser/ServicesTeaser'
import { TrustBar } from './widgets/trust-bar/TrustBar'

function HomePage() {
  return (
    <Layout>
      <Hero />
      {/* <HomeCategoriesSidebar /> */}
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
        <Route path="/catalog/:section/:category" element={<SectionPage />} />
        <Route path="/catalog/:section/:category/:slug" element={<ProductPage />} />
        <Route path="/catalog/:section/:slug" element={<ProductPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/price" element={<PricePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

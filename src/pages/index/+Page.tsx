import { Layout } from '../../widgets/Layout'
import { Hero } from '../../widgets/hero/Hero'
import { TrustBar } from '../../widgets/trust-bar/TrustBar'
import { CategoryGrid } from '../../widgets/category-grid/CategoryGrid'
import { Advantages } from '../../widgets/advantages/Advantages'
import { ServicesTeaser } from '../../widgets/services-teaser/ServicesTeaser'
import { GeographyMap } from '../../widgets/geography-map/GeographyMap'
import { QuoteCTA } from '../../widgets/quote-cta/QuoteCTA'

export default function Page() {
  return (
    <Layout>
      <Hero />
      <TrustBar />
      <CategoryGrid />
      <Advantages />
      <ServicesTeaser />
      <GeographyMap />
      <QuoteCTA />
    </Layout>
  )
}

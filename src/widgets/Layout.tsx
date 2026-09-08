import { Header } from './header/ui/Header'
import { Footer } from './footer/Footer'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell flex min-h-dvh flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

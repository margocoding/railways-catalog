import React from 'react'
import { Link } from 'vike-react-router'

interface HeaderProps {
  children?: React.ReactNode
}

export function Layout({ children }: HeaderProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <header className="sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-accent-gradient flex items-center justify-center">
              <span className="text-white font-black text-xl">ЖД</span>
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">ЖЕЛДОРКАТАЛОГ</h1>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">B2B портал</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/catalog" className="hover:text-[hsl(var(--primary))] transition-colors font-medium">Каталог</Link>
            <Link to="/services" className="hover:text-[hsl(var(--primary))] transition-colors font-medium">Услуги</Link>
            <Link to="/delivery" className="hover:text-[hsl(var(--primary))] transition-colors font-medium">Доставка</Link>
            <Link to="/price" className="hover:text-[hsl(var(--primary))] transition-colors font-medium">Прайс</Link>
            <Link to="/about" className="hover:text-[hsl(var(--primary))] transition-colors font-medium">О компании</Link>
            <Link to="/contacts" className="hover:text-[hsl(var(--primary))] transition-colors font-medium">Контакты</Link>
          </nav>
          
          <a href="tel:+78000000000" className="font-bold hover:text-[hsl(var(--primary))] transition-colors">
            8 (800) 000-00-00
          </a>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--card))] py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded bg-accent-gradient flex items-center justify-center">
                  <span className="text-white font-black text-sm">ЖД</span>
                </div>
                <span className="font-bold">ЖЕЛДОРКАТАЛОГ</span>
              </div>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Поставки железнодорожных материалов по всей России с 2010 года.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
                <li><Link to="/catalog/rails" className="hover:text-[hsl(var(--primary))]">Рельсы</Link></li>
                <li><Link to="/catalog/sleepers" className="hover:text-[hsl(var(--primary))]">Шпалы и плиты</Link></li>
                <li><Link to="/catalog/fasteners" className="hover:text-[hsl(var(--primary))]">Крепёж</Link></li>
                <li><Link to="/catalog/shoes" className="hover:text-[hsl(var(--primary))]">Башмаки</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
                <li><Link to="/delivery" className="hover:text-[hsl(var(--primary))]">Доставка</Link></li>
                <li><Link to="/price" className="hover:text-[hsl(var(--primary))]">Прайс-лист</Link></li>
                <li><Link to="/about" className="hover:text-[hsl(var(--primary))]">О компании</Link></li>
                <li><Link to="/contacts" className="hover:text-[hsl(var(--primary))]">Контакты</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
                <li>8 (800) 000-00-00</li>
                <li>info@railcatalog.ru</li>
                <li>г. Москва, ул. Примерная, 1</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[hsl(var(--border))] mt-8 pt-8 text-center text-sm text-[hsl(var(--muted-foreground))]">
            © 2024 ЖЕЛДОРКАТАЛОГ. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  )
}

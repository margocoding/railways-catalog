import React from 'react'

interface HeaderProps {
  children?: React.ReactNode
}

export function Layout({ children }: HeaderProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <header className="sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-accent-gradient flex items-center justify-center">
              <span className="text-white font-black text-xl">ЖД</span>
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">ЖЕЛДОРКАТАЛОГ</h1>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">B2B портал</p>
            </div>
          </a>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="/catalog" className="hover:text-[hsl(var(--primary))] transition-colors font-medium">Каталог</a>
            <a href="/services" className="hover:text-[hsl(var(--primary))] transition-colors font-medium">Услуги</a>
            <a href="/delivery" className="hover:text-[hsl(var(--primary))] transition-colors font-medium">Доставка</a>
            <a href="/price" className="hover:text-[hsl(var(--primary))] transition-colors font-medium">Прайс</a>
            <a href="/about" className="hover:text-[hsl(var(--primary))] transition-colors font-medium">О компании</a>
            <a href="/contacts" className="hover:text-[hsl(var(--primary))] transition-colors font-medium">Контакты</a>
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
                <li><a href="/catalog/rails" className="hover:text-[hsl(var(--primary))]">Рельсы</a></li>
                <li><a href="/catalog/sleepers" className="hover:text-[hsl(var(--primary))]">Шпалы и плиты</a></li>
                <li><a href="/catalog/fasteners" className="hover:text-[hsl(var(--primary))]">Крепёж</a></li>
                <li><a href="/catalog/shoes" className="hover:text-[hsl(var(--primary))]">Башмаки</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
                <li><a href="/delivery" className="hover:text-[hsl(var(--primary))]">Доставка</a></li>
                <li><a href="/price" className="hover:text-[hsl(var(--primary))]">Прайс-лист</a></li>
                <li><a href="/about" className="hover:text-[hsl(var(--primary))]">О компании</a></li>
                <li><a href="/contacts" className="hover:text-[hsl(var(--primary))]">Контакты</a></li>
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

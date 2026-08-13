export function Footer() {
  return (
    <footer className="bg-[hsl(var(--card))] border-t border-[hsl(var(--border))]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - Logo */}
          <div>
            <a href="/" className="flex items-center gap-3 mb-4 min-h-[44px]">
              <div className="w-10 h-10 rounded-lg bg-accent-gradient flex items-center justify-center">
                <span className="text-xl">🛤️</span>
              </div>
              <div>
                <div className="font-black text-lg leading-none">СтальПуть</div>
                <div className="text-xs text-[hsl(var(--muted-foreground))]">Материалы ВСП</div>
              </div>
            </a>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
              Поставки железнодорожных материалов по всей России и СНГ
            </p>
            <div className="flex gap-3">
              {['vk', 'tg', 'yt'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-[hsl(var(--muted))] flex items-center justify-center hover:bg-[hsl(var(--primary))] transition-colors min-h-[44px] min-w-[44px]"
                >
                  <span className="text-xs uppercase">{social}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Catalog */}
          <div>
            <h4 className="font-bold mb-4">Каталог</h4>
            <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
              <li><a href="/catalog/rails" className="hover:text-[hsl(var(--primary))] min-h-[44px] block">Рельсы</a></li>
              <li><a href="/catalog/sleepers" className="hover:text-[hsl(var(--primary))] min-h-[44px] block">Шпалы и плиты</a></li>
              <li><a href="/catalog/fasteners" className="hover:text-[hsl(var(--primary))] min-h-[44px] block">Крепёж</a></li>
              <li><a href="/catalog/shoes" className="hover:text-[hsl(var(--primary))] min-h-[44px] block">Башмаки</a></li>
              <li><a href="/catalog/buffers" className="hover:text-[hsl(var(--primary))] min-h-[44px] block">Упоры тупиковые</a></li>
              <li><a href="/catalog/metal" className="hover:text-[hsl(var(--primary))] min-h-[44px] block">Металлоизделия</a></li>
              <li><a href="/catalog/tools" className="hover:text-[hsl(var(--primary))] min-h-[44px] block">Путевой инструмент</a></li>
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div>
            <h4 className="font-bold mb-4">Компания</h4>
            <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
              <li><a href="/services" className="hover:text-[hsl(var(--primary))] min-h-[44px] block">Услуги</a></li>
              <li><a href="/delivery" className="hover:text-[hsl(var(--primary))] min-h-[44px] block">Доставка</a></li>
              <li><a href="/price" className="hover:text-[hsl(var(--primary))] min-h-[44px] block">Прайс</a></li>
              <li><a href="/about" className="hover:text-[hsl(var(--primary))] min-h-[44px] block">О компании</a></li>
              <li><a href="/contacts" className="hover:text-[hsl(var(--primary))] min-h-[44px] block">Контакты</a></li>
            </ul>
          </div>

          {/* Column 4 - Contacts */}
          <div>
            <h4 className="font-bold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
              <li>
                <a href="tel:+78000000000" className="hover:text-[hsl(var(--primary))] min-h-[44px] block">
                  8 (800) 000-00-00
                </a>
              </li>
              <li>
                <a href="mailto:info@stalput.ru" className="hover:text-[hsl(var(--primary))] min-h-[44px] block">
                  info@stalput.ru
                </a>
              </li>
              <li className="min-h-[44px] flex items-center">г. Москва, ул. Примерная, 1</li>
              <li className="min-h-[44px] flex items-center">Склад: г. Екатеринбург, промзона 5</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[hsl(var(--border))] text-sm text-[hsl(var(--muted-foreground))] text-center">
          © 2026 СтальПуть · Политика конфиденциальности
        </div>
      </div>
    </footer>
  )
}

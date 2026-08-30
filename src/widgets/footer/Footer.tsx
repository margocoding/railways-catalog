import { useCategories } from '@/entities/category/model/hooks/useCategories'
import { FiDownload } from 'react-icons/fi'
import { Link } from 'react-router'

const REQUISITES_FILE = {
  path: '/data/Карта партнера ИНВИА1.pdf',
  filename: 'Карта партнера ИНВИА1.pdf',
}

const companyLinks = [
  { label: 'Услуги', href: '/services' },
  { label: 'Доставка', href: '/delivery' },
  { label: 'Прайс', href: '/price' },
  { label: 'О компании', href: '/about' },
  { label: 'Контакты', href: '/contacts' },
]

const contactItems = [
  {
    label: '+7 (843) 259-73-00',
    href: 'tel:+78432597300',
  },
  {
    label: '+7 (962) 559-73-00',
    href: 'tel:+79625597300',
  },
  {
    label: '+7 (960) 039-01-01',
    href: 'tel:+79600390101',
  },
  {
    label: 'zakaz@ttr2.ru',
    href: 'mailto:zakaz@ttr2.ru',
  },
  {
    label: '422549, Респ Татарстан, Зеленодольский р-н, г Зеленодольск, ул Московская, ЗД.4, помещ.1',
  },
  {
    label: 'Почтовый адрес: 422540, г. Зеленодольск, а/я 34',
  },
]

const socials = [
  { name: 'vk', href: '#' },
  { name: 'tg', href: '#' },
  { name: 'yt', href: '#' },
]

const linkClassName =
  'flex min-h-5 items-center hover:text-[hsl(var(--primary))] transition-colors'

function FooterLinkList({
  items,
}: {
  items: Array<{ label: string; href: string }>
}) {
  return (
    <ul className="text-sm text-[hsl(var(--muted-foreground))]">
      {items.map((item) => (
        <li key={item.label}>
          <a href={item.href} className={linkClassName}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

function FooterSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-4 w-32 rounded bg-[hsl(var(--muted))] animate-pulse"
        />
      ))}
    </div>
  )
}

export function Footer() {
  const { categories, isLoading } = useCategories()

  const catalogLinks = categories.map((category) => ({
    label: category.name,
    href: `/catalog?category=${category.slug}`,
  }))

  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--card))]">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              to="/"
              className="mb-4 flex min-h-11 items-center gap-3"
            >
              <img src="/logo.png" className='w-25'/>
            </Link>

            <p className="mb-4 text-sm text-[hsl(var(--muted-foreground))]">
              Поставки железнодорожных материалов по всей России и СНГ
            </p>

            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name.toUpperCase()}
                  className="flex h-11 w-11 items-center justify-center rounded-lg bg-[hsl(var(--muted))] text-xs uppercase transition-colors hover:bg-[hsl(var(--primary))]"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-bold">Каталог</h4>
            {isLoading ? (
              <FooterSkeleton />
            ) : (
              <FooterLinkList items={catalogLinks} />
            )}
          </div>

          <div>
            <h4 className="mb-4 font-bold">Компания</h4>
            <FooterLinkList items={companyLinks} />
          </div>

          <div>
            <h4 className="mb-4 font-bold">Контакты</h4>

            <ul className="text-sm text-[hsl(var(--muted-foreground))]">
              {contactItems.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a href={item.href} className={linkClassName}>
                      {item.label}
                    </a>
                  ) : (
                    <div className={linkClassName}>
                      {item.label}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <a
              href={REQUISITES_FILE.path}
              download={REQUISITES_FILE.filename}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent-gradient px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              <FiDownload className="h-4 w-4" />
              Скачать реквизиты
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[hsl(var(--border))] pt-8 text-sm text-[hsl(var(--muted-foreground))] sm:flex-row">
          <span>© 2026 ООО «ИНВИА»</span>

          <a
            href="/privacy"
            className="transition-colors hover:text-[hsl(var(--primary))]"
          >
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  )
}
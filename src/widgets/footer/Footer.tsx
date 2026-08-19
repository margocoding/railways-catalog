import { categories } from "@/entities/product/model/mockData"

const companyLinks = [
  { label: "Услуги", href: "/services" },
  { label: "Доставка", href: "/delivery" },
  { label: "Прайс", href: "/price" },
  { label: "О компании", href: "/about" },
  { label: "Контакты", href: "/contacts" },
]

const contactItems = [
  {
    label: "8 (800) 000-00-00",
    href: "tel:+78000000000",
  },
  {
    label: "info@stalput.ru",
    href: "mailto:info@stalput.ru",
  },
  {
    label: "г. Москва, ул. Примерная, 1",
  },
  {
    label: "Склад: г. Екатеринбург, промзона 5",
  },
]

const socials = ["vk", "tg", "yt"]

const linkClassName =
  "flex min-h-5 items-center hover:text-[hsl(var(--primary))] transition-colors"

function FooterLinkList({
  items,
}: {
  items: Array<{ label: string; href: string }>
}) {
  return (
    <ul className="text-sm text-[hsl(var(--muted-foreground))]">
      {items.map((item) => (
        <li key={item.href}>
          <a href={item.href} className={linkClassName}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

export function Footer() {
  const catalogLinks = categories.map((category) => ({
    label: category.name,
    href: `/catalog?category=${category.slug}`,
  }))

  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--card))]">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <a
              href="/"
              className="mb-4 flex min-h-11 items-center gap-3"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-gradient">
                <span className="text-xl">🛤️</span>
              </div>

              <div>
                <div className="font-black text-lg leading-none">
                  СтальПуть
                </div>
                <div className="text-xs text-[hsl(var(--muted-foreground))]">
                  Материалы ВСП
                </div>
              </div>
            </a>

            <p className="mb-4 text-sm text-[hsl(var(--muted-foreground))]">
              Поставки железнодорожных материалов по всей России и СНГ
            </p>

            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social.toUpperCase()}
                  className="flex h-11 w-11 items-center justify-center rounded-lg bg-[hsl(var(--muted))] text-xs uppercase transition-colors hover:bg-[hsl(var(--primary))]"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="mb-4 font-bold">Каталог</h4>
            <FooterLinkList items={catalogLinks} />
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 font-bold">Компания</h4>
            <FooterLinkList items={companyLinks} />
          </div>

          {/* Contacts */}
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

            <button
              type="button"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent-gradient px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
              onClick={() => {
                console.log("Скачать реквизиты")
              }}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Скачать реквизиты
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[hsl(var(--border))] pt-8 text-sm text-[hsl(var(--muted-foreground))] sm:flex-row">
          <span>© 2026 СтальПуть</span>

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
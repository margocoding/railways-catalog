import { Link } from 'react-router'
import { FiChevronRight } from 'react-icons/fi'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `https://tatrels.ru${item.href}` : undefined,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Хлебные крошки"
        className="mb-4 flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]"
      >
        <ol className="flex items-center gap-2" itemScope itemType="https://schema.org/BreadcrumbList">
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <li
                key={index}
                className="flex items-center gap-2"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {item.href && !isLast ? (
                  <Link
                    to={item.href}
                    className="hover:text-[hsl(var(--primary))] transition-colors"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.label}</span>
                  </Link>
                ) : (
                  <span className="text-foreground font-medium" itemProp="name">
                    {item.label}
                  </span>
                )}
                <meta itemProp="position" content={String(index + 1)} />
                {!isLast && <FiChevronRight className="h-4 w-4" aria-hidden="true" />}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
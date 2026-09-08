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
  return (
    <>
      <nav
        aria-label="Хлебные крошки"
        className="mb-6 min-w-0 text-sm text-[hsl(var(--muted-foreground))]"
      >
        <ol className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1" itemScope itemType="https://schema.org/BreadcrumbList">
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <li
                key={index}
                className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {item.href && !isLast ? (
                  <Link
                    to={item.href}
                    className="min-w-0 break-words hover:text-[hsl(var(--primary))] transition-colors"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.label}</span>
                  </Link>
                ) : (
                  <span className="min-w-0 break-words text-foreground font-medium" itemProp="name">
                    {item.label}
                  </span>
                )}
                <meta itemProp="position" content={String(index + 1)} />
                {!isLast && <FiChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
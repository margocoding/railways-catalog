import type { BreadcrumbItem } from '../../shared/lib/catalog-helpers'

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
      <ol className="flex items-center gap-2 flex-wrap">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <span className="text-[hsl(var(--muted-foreground))]/50">/</span>
            )}
            {item.href ? (
              <a 
                href={item.href} 
                className="hover:text-[hsl(var(--primary))] transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-[hsl(var(--foreground))]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

import { Button } from '@/shared/ui/Button'
import type { Service } from '../model/types'
import { getImageUrl } from '@/shared/lib'

interface ServiceTableRowProps {
  service: Service
  onEdit?: (service: Service) => void
  onDelete?: (id: string) => void
}

export function ServiceTableRow({ service, onEdit, onDelete }: ServiceTableRowProps) {
  return (
    <>
      <tr className="group border-b border-border/50 hover:bg-muted/30 transition-colors max-md:hidden">
        <td className="py-4 px-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
              {service.image ? (
                <img
                  src={getImageUrl(service.image)}
                  alt={service.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </td>

        <td className="py-4 px-4">
          <div className="font-medium text-foreground line-clamp-1">
            {service.title}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{service.slug}</p>
        </td>

        <td className="py-4 px-4">
          <span className="text-sm text-muted-foreground line-clamp-2">
            {service.description}
          </span>
        </td>

        <td className="py-4 px-4">
          <span className="text-sm text-muted-foreground">
            {service.features.length} шт.
          </span>
        </td>

        <td className="py-4 px-4">
          <span className="text-xs text-muted-foreground">
            {new Date(service.createdAt).toLocaleDateString('ru-RU')}
          </span>
        </td>

        <td className="py-4 px-4">
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(service)}
                className="h-8 px-2"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(service.id)}
                className="h-8 px-2 text-destructive hover:text-destructive"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </Button>
            )}
          </div>
        </td>
      </tr>

      <div className="md:hidden rounded-xl border border-border bg-card p-4 space-y-3">
        <div className="flex gap-3">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
            {service.image ? (
              <img
                src={getImageUrl(service.image)}
                alt={service.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="block font-medium leading-5 text-foreground line-clamp-2">
              {service.title}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{service.slug}</p>

            <div className="mt-2">
              <span className="text-xs text-muted-foreground">
                {service.features.length} особенностей
              </span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-border/50">
          <p className="text-xs text-muted-foreground line-clamp-2">
            {service.description}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Создано: {new Date(service.createdAt).toLocaleDateString('ru-RU')}
          </p>
        </div>

        {(onEdit || onDelete) && (
          <div className="flex gap-2 pt-2">
            {onEdit && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onEdit(service)}
                className="flex-1"
              >
                Редактировать
              </Button>
            )}
            {onDelete && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(service.id)}
                className="text-destructive hover:text-destructive"
              >
                Удалить
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  )
}
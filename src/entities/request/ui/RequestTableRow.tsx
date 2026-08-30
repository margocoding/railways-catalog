import { FiDownload, FiFile } from 'react-icons/fi'
import { Button } from '@/shared/ui/Button'
import { Badge } from '@/shared/ui/Badge'
import type { Request } from '../model/types'

interface RequestTableRowProps {
  request: Request
  onDelete?: (id: string) => void
}

export function RequestTableRow({ request, onDelete }: RequestTableRowProps) {
  const requestType = request.serviceId ? 'Услуга' : request.productId ? 'Продукт' : 'Общая'

  return (
    <>
      <tr className="group border-b border-border/50 hover:bg-muted/30 transition-colors max-md:hidden">
        <td className="py-4 px-4">
          <div className="font-medium text-foreground">{request.name}</div>
          <p className="text-xs text-muted-foreground mt-0.5">{request.phone}</p>
        </td>

        <td className="py-4 px-4">
          <span className="text-sm text-muted-foreground">{request.email || '—'}</span>
        </td>

        <td className="py-4 px-4">
          <Badge variant={requestType === 'Услуга' ? 'default' : requestType === 'Продукт' ? 'secondary' : 'outline'}>
            {requestType}
          </Badge>
          {request.service && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
              {request.service.title}
            </p>
          )}
          {request.product && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
              {request.product.title}
            </p>
          )}
        </td>

        <td className="py-4 px-4">
          <span className="text-sm text-muted-foreground line-clamp-2 max-w-xs">
            {request.comment || '—'}
          </span>
        </td>

        <td className="py-4 px-4">
          <div className="flex gap-2">
            {request.requestFilePath && (
              <a
                href={request.requestFilePath}
                download
                className="flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <FiFile className="h-3 w-3" />
                Заявка
              </a>
            )}
            {request.partnerMapPath && (
              <a
                href={request.partnerMapPath}
                download
                className="flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <FiFile className="h-3 w-3" />
                Карта
              </a>
            )}
            {!request.requestFilePath && !request.partnerMapPath && (
              <span className="text-xs text-muted-foreground">—</span>
            )}
          </div>
        </td>

        <td className="py-4 px-4">
          <span className="text-xs text-muted-foreground">
            {new Date(request.createdAt).toLocaleDateString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </td>

        <td className="py-4 px-4">
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(request.id)}
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
        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0 flex-1">
            <div className="font-medium text-foreground">{request.name}</div>
            <p className="text-xs text-muted-foreground mt-0.5">{request.phone}</p>
            {request.email && (
              <p className="text-xs text-muted-foreground mt-0.5">{request.email}</p>
            )}
          </div>
          <Badge variant={requestType === 'Услуга' ? 'default' : requestType === 'Продукт' ? 'secondary' : 'outline'}>
            {requestType}
          </Badge>
        </div>

        {(request.service || request.product) && (
          <div className="pt-2 border-t border-border/50">
            <p className="text-xs text-muted-foreground line-clamp-2">
              {request.service?.title || request.product?.title}
            </p>
          </div>
        )}

        {request.comment && (
          <div className="pt-2 border-t border-border/50">
            <p className="text-xs text-muted-foreground line-clamp-3">
              {request.comment}
            </p>
          </div>
        )}

        {(request.requestFilePath || request.partnerMapPath) && (
          <div className="flex gap-3 pt-2 border-t border-border/50">
            {request.requestFilePath && (
              <a
                href={request.requestFilePath}
                download
                className="flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <FiDownload className="h-3 w-3" />
                Заявка
              </a>
            )}
            {request.partnerMapPath && (
              <a
                href={request.partnerMapPath}
                download
                className="flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <FiDownload className="h-3 w-3" />
                Карта партнёра
              </a>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <span className="text-xs text-muted-foreground">
            {new Date(request.createdAt).toLocaleDateString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>

          {onDelete && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(request.id)}
              className="text-destructive hover:text-destructive"
            >
              Удалить
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
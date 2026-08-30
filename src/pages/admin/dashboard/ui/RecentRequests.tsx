import { Link } from 'react-router'
import { FiEye } from 'react-icons/fi'

interface RecentRequestsProps {
  requests: Array<{
    id: string
    name: string
    phone: string
    serviceTitle?: string
    createdAt: string
  }>
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function RecentRequests({ requests }: RecentRequestsProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Последние заявки</h3>
        <Link
          to="/admin/requests"
          className="text-sm text-primary hover:underline"
        >
          Все заявки →
        </Link>
      </div>

      <div className="space-y-3">
        {requests.map((request) => (
          <Link
            key={request.id}
            to="/admin/requests"
            className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium mb-1">{request.name}</p>
              <p className="text-xs text-muted-foreground">{request.phone}</p>
              {request.serviceTitle && (
                <p className="text-xs text-primary mt-1 truncate">
                  {request.serviceTitle}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {formatDate(request.createdAt)}
              </p>
            </div>
            <FiEye className="h-4 w-4 text-muted-foreground ml-4" />
          </Link>
        ))}
      </div>
    </div>
  )
}
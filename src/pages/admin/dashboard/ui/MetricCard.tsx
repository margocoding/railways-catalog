import { type ReactNode } from 'react'
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi'
import { cn } from '@/shared/lib/cn'

interface MetricCardProps {
  title: string
  value: string | number
  icon: ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  subtitle?: string
  className?: string
}

export function MetricCard({
  title,
  value,
  icon,
  trend,
  subtitle,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md',
        className,
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        {trend && (
          <div
            className={cn(
              'flex items-center gap-1 text-xs font-medium',
              trend.isPositive ? 'text-green-600' : 'text-red-600',
            )}
          >
            {trend.isPositive ? (
              <FiTrendingUp className="h-3 w-3" />
            ) : (
              <FiTrendingDown className="h-3 w-3" />
            )}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-3xl font-black text-foreground">{value}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  )
}
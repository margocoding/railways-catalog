import { useCart } from '../model/use-cart'
import { cn } from '@/shared/lib/cn'

interface CartIconProps {
  className?: string
}

export function CartIcon({ className }: CartIconProps) {
  const { totalItems } = useCart()

  return (
    <div className={cn('relative', className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </div>
  )
}

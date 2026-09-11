import { FiShoppingCart } from 'react-icons/fi'
import { useCart } from '@/entities/cart/model/use-cart'
import type { Product } from '@/entities/product/model/types'

interface AddToCartButtonProps {
  product: Product
  variant?: 'outline' | 'accent'
}

export function AddToCartButton({
  product,
  variant = 'outline',
}: AddToCartButtonProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      aria-label={`Добавить в корзину: ${product.title}`}
      className={`flex shrink-0 items-center justify-center rounded-lg border transition-colors ${variant === 'accent' ? 'h-11 w-11 border-accent bg-accent text-accent-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground' : 'h-12 w-12 border-border bg-white text-foreground hover:border-primary hover:text-primary'}`}
    >
      <FiShoppingCart className="h-5 w-5" />
    </button>
  )
}

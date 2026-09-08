import {FiShoppingCart} from 'react-icons/fi'
import {useCart} from '@/entities/cart/model/use-cart'
import type {Product} from '@/entities/product/model/types'

interface AddToCartButtonProps {
    product: Product
}

export function AddToCartButton({product}: AddToCartButtonProps) {
    const {addToCart} = useCart()

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
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-white text-foreground transition-colors hover:border-primary hover:text-primary"
        >
            <FiShoppingCart className="h-5 w-5"/>
        </button>
    )
}

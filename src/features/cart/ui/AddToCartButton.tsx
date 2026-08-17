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
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--accent))] text-white transition-all hover:scale-105 hover:opacity-90"
        >
            <FiShoppingCart className="h-5 w-5"/>
        </button>
    )
}

import { useCart } from '../lib/useCart'

export function CartButton({ productId, title, price, image }: { productId: string; title: string; price: number; image?: string }) {
  const { addItem } = useCart()

  return (
    <button
      onClick={() => addItem({ productId, title, price, quantity: 1, image })}
      className="px-4 py-2 bg-[hsl(var(--primary))] text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
    >
      В корзину
    </button>
  )
}

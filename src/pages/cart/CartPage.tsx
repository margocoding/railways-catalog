import { FiTrash2, FiMinus, FiPlus, FiSend } from 'react-icons/fi'
import { useCart } from '../../features/cart/lib/useCart'
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs'
import { Button } from '../../shared/ui/Button'
import { Input } from '../../shared/ui/Input'
import { Layout } from '../../widgets/Layout'
import { Link } from 'react-router'

export function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()

  const breadcrumbs: { label: string; href?: string }[] = [
    { label: 'Главная', href: '/' },
    { label: 'Корзина', href: undefined },
  ]

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbs} />
          <div className="text-center py-16">
            <h1 className="text-3xl font-black mb-4">Корзина пуста</h1>
            <p className="text-[hsl(var(--muted-foreground))] mb-8">
              Добавьте товары из каталога
            </p>
            <Link to="/catalog">
              <Button variant="primary">Перейти в каталог</Button>
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />
        
        <h1 className="text-3xl font-black mb-2">Корзина</h1>
        <p className="text-[hsl(var(--muted-foreground))] mb-8">
          Оформите заказ, заполнив форму ниже
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-4 flex gap-4">
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}
                <div className="flex-grow">
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-[hsl(var(--muted-foreground))] text-sm mb-2">
                    Цена: {item.price.toLocaleString('ru-RU')} ₽
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-[hsl(var(--muted))] rounded"
                    >
                      <FiMinus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-[hsl(var(--muted))] rounded"
                    >
                      <FiPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg mb-2">
                    {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            
            <div className="flex justify-between items-center pt-4 border-t border-[hsl(var(--border))]">
              <button
                onClick={clearCart}
                className="text-[hsl(var(--muted-foreground))] hover:text-red-500 transition-colors"
              >
                Очистить корзину
              </button>
              <p className="text-xl font-bold">
                Итого: {totalPrice.toLocaleString('ru-RU')} ₽
              </p>
            </div>
          </div>

          {/* Order Form */}
          <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">Оформление заказа</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Ваше имя" size="lg" required />
              <Input type="tel" placeholder="Телефон" size="lg" required />
              <Input type="email" placeholder="Email" size="lg" required />
              <Input placeholder="Адрес доставки" size="lg" required />
              <Button variant="primary" size="lg" className="w-full">
                <FiSend className="w-5 h-5" />
                Отправить запрос
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

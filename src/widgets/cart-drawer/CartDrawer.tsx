import { Drawer } from '@/shared/ui/Drawer'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { FormField } from '@/shared/ui/FormField'
import { useCart } from '@/entities/cart/model/use-cart'
import { cn } from '@/shared/lib/cn'
import { useState } from 'react'
import type { CartItem } from '@/entities/cart/model/types'

interface CartDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart()
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form'>('cart')

  const handleCheckout = () => {
    setCheckoutStep('form')
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Заказ успешно оформлен! Менеджер свяжется с вами в ближайшее время.')
    clearCart()
    setCheckoutStep('cart')
    onOpenChange(false)
  }

  return (
    <Drawer 
      open={open} 
      onOpenChange={(newOpen) => {
        if (!newOpen) {
          setCheckoutStep('cart')
        }
        onOpenChange(newOpen)
      }} 
      title={checkoutStep === 'cart' ? `Корзина (${totalItems})` : 'Оформление заказа'} 
      side="right"
    >
      {items.length === 0 && checkoutStep === 'cart' ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-muted-foreground mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <p className="text-lg font-medium text-foreground">Корзина пуста</p>
          <p className="text-sm text-muted-foreground mt-1">
            Добавьте товары, чтобы оформить заказ
          </p>
          <Button variant="outline" className="mt-4" onClick={() => onOpenChange(false)}>
            Продолжить покупки
          </Button>
        </div>
      ) : checkoutStep === 'form' ? (
        <form onSubmit={handleSubmitOrder} className="flex flex-col h-full">
          <div className="flex-1 overflow-auto space-y-4">
            <div className="mb-4 p-3 bg-muted rounded-lg">
              <p className="text-sm font-semibold text-foreground mb-2">Ваш заказ:</p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Товары ({totalItems})</span>
                <span className="font-medium">{totalPrice.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>

            <FormField label="Имя *" error="">
              <Input placeholder="Иван Иванов" required />
            </FormField>

            <FormField label="Телефон *" error="">
              <Input type="tel" placeholder="+7 (___) ___-__-__" inputMode="tel" required />
            </FormField>

            <FormField label="Email" error="">
              <Input type="email" placeholder="your@email.com" inputMode="email" />
            </FormField>

            <FormField label="Адрес доставки" error="">
              <Input placeholder="Город, улица, дом" />
            </FormField>

            <FormField label="Комментарий к заказу" error="">
              <textarea
                className="w-full rounded-lg border border-border bg-muted/50 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors h-24 p-3 resize-none"
                placeholder="Дополнительная информация..."
              />
            </FormField>
          </div>

          <div className="border-t border-border pt-4 mt-4 space-y-3">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setCheckoutStep('cart')}
              >
                Назад
              </Button>
              <Button type="submit" className="flex-1">
                Подтвердить заказ
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-auto space-y-4">
            {items.map((item: CartItem) => (
              <div
                key={item.product.id}
                className={cn(
                  'flex gap-4 p-3 border border-border rounded-lg',
                  'bg-card hover:bg-card/80 transition-colors'
                )}
              >
                <div className="w-20 h-20 flex-shrink-0 bg-muted rounded-md overflow-hidden">
                  {item.product.images[0] ? (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate">{item.product.title}</h4>
                  <p className="text-sm text-muted-foreground">Арт. {item.product.sku}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-md border border-border hover:bg-muted transition-colors"
                        aria-label="Уменьшить количество"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-md border border-border hover:bg-muted transition-colors"
                        aria-label="Увеличить количество"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Удалить товар"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">
                    {(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽
                  </p>
                  {item.product.priceOnRequest && (
                    <p className="text-xs text-muted-foreground">Цена по запросу</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-4 mt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Товары ({totalItems})</span>
              <span className="font-medium">{totalPrice.toLocaleString('ru-RU')} ₽</span>
            </div>
            <div className="flex items-center justify-between text-base font-semibold">
              <span className="text-foreground">Итого</span>
              <span className="text-primary">{totalPrice.toLocaleString('ru-RU')} ₽</span>
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1" onClick={clearCart}>
                Очистить
              </Button>
              <Button className="flex-1" onClick={handleCheckout}>
                Оформить
              </Button>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  )
}

import {Drawer} from '../../shared/ui/Drawer'
import {Button} from '../../shared/ui/Button'
import {useCart} from '../../entities/cart/model/use-cart'
import {FiTrash2, FiMinus, FiPlus, FiShoppingCart} from 'react-icons/fi'
import {formatPrice} from '../../shared/lib/catalog-helpers'
import {Link} from 'react-router'

interface CartDrawerProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CartDrawer({open, onOpenChange}: CartDrawerProps) {
    const {items, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart} = useCart()

    return (
        <Drawer
            open={open}
            onOpenChange={onOpenChange}
            title={`Корзина (${totalItems})`}
            side="right"
        >
            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <FiShoppingCart className="h-16 w-16 text-muted-foreground mb-4"/>
                    <p className="text-lg font-semibold text-foreground mb-2">
                        Корзина пуста
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                        Добавьте товары из каталога
                    </p>
                    <Link to="/catalog">
                        <Button onClick={() => onOpenChange(false)}>
                            Перейти в каталог
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-auto space-y-3">
                        {items.map(({product, quantity}) => (
                            <div
                                key={product.id}
                                className="flex gap-3 p-3 rounded-lg bg-card border border-border"
                            >
                                <img
                                    src={product.images[0] || '/placeholders/product.svg'}
                                    alt={product.title}
                                    className="h-16 w-16 object-contain bg-muted rounded"
                                />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-sm text-foreground truncate">
                                        {product.title}
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                        Арт. {product.sku}
                                    </p>
                                    <p className="text-sm font-bold text-accent mt-1">
                                        {formatPrice(product.price)} ₽
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            type="button"
                                            onClick={() => updateQuantity(product.id, quantity - 1)}
                                            className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-foreground hover:bg-muted/80 transition-colors"
                                            aria-label="Уменьшить количество"
                                        >
                                            <FiMinus className="h-3 w-3"/>
                                        </button>
                                        <span className="text-sm font-medium w-6 text-center">
                                            {quantity}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => updateQuantity(product.id, quantity + 1)}
                                            className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-foreground hover:bg-muted/80 transition-colors"
                                            aria-label="Увеличить количество"
                                        >
                                            <FiPlus className="h-3 w-3"/>
                                        </button>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeFromCart(product.id)}
                                    className="self-start p-2 text-muted-foreground hover:text-destructive transition-colors"
                                    aria-label="Удалить из корзины"
                                >
                                    <FiTrash2 className="h-4 w-4"/>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-border pt-4 mt-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Итого:</span>
                            <span className="text-lg font-bold text-foreground">
                                {formatPrice(totalPrice)} ₽
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={clearCart}
                                className="flex-1"
                            >
                                Очистить
                            </Button>
                            <Button className="flex-1">
                                Оформить заказ
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Drawer>
    )
}

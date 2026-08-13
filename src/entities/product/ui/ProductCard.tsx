import { formatPrice, getConditionBadgeColor, getConditionLabel } from '../../../shared/lib/catalog-helpers'
import type { Product } from '../model/types'
import { FiShoppingCart } from 'react-icons/fi'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] overflow-hidden hover:border-[hsl(var(--primary))/0.5] transition-all duration-300 hover:shadow-lg">
      {/* Image */}
      <div className="aspect-[4/3] bg-[hsl(var(--muted))] relative overflow-hidden">
        <img 
          src={product.images[0] || '/placeholders/product.svg'} 
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Condition Badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-medium border ${getConditionBadgeColor(product.condition)}`}>
          {getConditionLabel(product.condition)}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 line-clamp-2">{product.title}</h3>
        
        {product.gost && (
          <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">{product.gost}</p>
        )}
        
        {/* Price */}
        <div className="mb-2">
          {product.priceOnRequest ? (
            <span className="text-sm font-medium text-[hsl(var(--accent))]">По запросу</span>
          ) : (
            <span className="text-lg font-bold text-[hsl(var(--accent))]">от {formatPrice(product.price)} ₽</span>
          )}
        </div>
        
        {/* Stock */}
        <div className="text-xs text-[hsl(var(--muted-foreground))] mb-3">
          {product.stock > 100 ? 'В наличии' : 
           product.stock > 0 ? `Остаток: ${product.stock} шт` : 
           'Под заказ'}
        </div>
        
        {/* CTA Button */}
        <button className="w-full py-2 bg-accent-gradient rounded-lg font-bold text-sm text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <FiShoppingCart className="w-4 h-4" />
          Запросить КП
        </button>
      </div>
    </div>
  )
}

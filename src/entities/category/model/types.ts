export interface Category {
  slug: string
  title: string
  icon: string
  count: number
  description: string
}

export const CATEGORIES: Category[] = [
  { slug: 'rails', title: 'Рельсы', icon: '🛤️', count: 18, description: 'Ж/д, крановые, узкоколейные, старогодные' },
  { slug: 'sleepers', title: 'Шпалы и плиты', icon: '🟫', count: 17, description: 'Деревянные, ж/б, резинокордовые' },
  { slug: 'fasteners', title: 'Крепёж', icon: '🔩', count: 66, description: 'Накладки, болты, подкладки, скрепления' },
  { slug: 'shoes', title: 'Башмаки', icon: '👞', count: 8, description: 'Тормозные, накаточные, КСБ' },
  { slug: 'buffers', title: 'Упоры тупиковые', icon: '🛑', count: 2, description: 'Для ж/д и крановых путей' },
  { slug: 'metal', title: 'Металлоизделия', icon: '🔲', count: 4, description: 'По чертежам заказчика' },
  { slug: 'tools', title: 'Путевой инструмент', icon: '🔧', count: 1, description: 'Средства малой механизации' },
]

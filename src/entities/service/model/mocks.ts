export interface Service {
  slug: string
  title: string
  icon: string
  description: string
}

export const SERVICES: Service[] = [
  { slug: 'cutting', title: 'Порезка рельсов', icon: '✂️', description: 'Точная резка под размер заказчика' },
  { slug: 'drilling', title: 'Сверление рельсов', icon: '🔨', description: 'Любой диаметр, по чертежу' },
  { slug: 'grinding', title: 'Шлифовка рельсов', icon: '✨', description: 'Восстановление геометрии профиля' },
  { slug: 'dismantling', title: 'Демонтаж / монтаж путей', icon: '🚧', description: 'Полный цикл работ' },
]

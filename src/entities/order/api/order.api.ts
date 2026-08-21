import type { Order } from '../model/types'

// Mock orders data for initial state
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-1024',
    createdAt: new Date('2025-08-21T10:30:00').toISOString(),
    status: 'new',
    customer: {
      name: 'Иван Петров',
      phone: '+7 (999) 123-45-67',
      email: 'ivan@example.com',
      address: 'г. Москва, ул. Ленина, д. 10, офис 5',
      comment: 'Доставка в рабочее время',
    },
    items: [
      {
        product: {
          id: 'rel-r65-new',
          slug: 'rel-r65-new',
          sku: 'REL-R65-N',
          title: 'Рельс Р-65 новый',
          gost: 'ГОСТ Р 51685-2022',
          price: 68500,
          stock: 150,
          condition: 'new',
          images: ['/test-product.webp'],
          categorySlug: 'rails',
          subcategorySlug: 'new',
          description: 'Рельс железнодорожный новый типа Р-65 для главных путей.',
        },
        quantity: 10,
        price: 68500,
      },
      {
        product: {
          id: 'bolt-m22',
          slug: 'bolt-m22',
          sku: 'BLT-M22',
          title: 'Болт путевой М22',
          gost: 'ГОСТ 11530-93',
          price: 150,
          stock: 60000,
          condition: 'new',
          images: ['/test-product.webp'],
          categorySlug: 'fasteners',
          subcategorySlug: 'bolts',
          description: 'Путевой болт М22 для рельсовых скреплений.',
        },
        quantity: 100,
        price: 150,
      },
    ],
    totalItems: 110,
    totalPrice: 700000,
  },
  {
    id: '2',
    orderNumber: 'ORD-1023',
    createdAt: new Date('2025-08-20T14:15:00').toISOString(),
    status: 'processing',
    customer: {
      name: 'Алексей Смирнов',
      phone: '+7 (999) 987-65-43',
      email: 'alexey@company.ru',
      address: 'г. Санкт-Петербург, пр. Невский, д. 25',
    },
    items: [
      {
        product: {
          id: 'sleeper-wood-1',
          slug: 'sleeper-wood-1',
          sku: 'SLP-WD-1',
          title: 'Шпала деревянная тип 1',
          gost: 'ГОСТ 78-2011',
          price: 1200,
          stock: 5000,
          condition: 'new',
          images: ['/test-product.webp'],
          categorySlug: 'sleepers',
          subcategorySlug: 'wood',
          description: 'Шпала деревянная пропитанная тип 1.',
        },
        quantity: 500,
        price: 1200,
      },
    ],
    totalItems: 500,
    totalPrice: 600000,
  },
  {
    id: '3',
    orderNumber: 'ORD-1022',
    createdAt: new Date('2025-08-19T09:00:00').toISOString(),
    status: 'completed',
    customer: {
      name: 'ООО "СтройТранс"',
      phone: '+7 (495) 555-12-34',
      email: 'info@stroytrans.ru',
      address: 'г. Екатеринбург, ул. Промышленная, д. 5',
    },
    items: [
      {
        product: {
          id: 'plate-rc50',
          slug: 'plate-rc50',
          sku: 'PLT-RC50',
          title: 'Плита подрельсовая RC50',
          gost: 'ТУ 0941-001-44659632-2018',
          price: 2400,
          stock: 12000,
          condition: 'new',
          images: ['/test-product.webp'],
          categorySlug: 'sleepers',
          subcategorySlug: 'plates',
          description: 'Плита подрельсовая полимеркомпозитная RC50.',
        },
        quantity: 200,
        price: 2400,
      },
      {
        product: {
          id: 'plate-rc65',
          slug: 'plate-rc65',
          sku: 'PLT-RC65',
          title: 'Плита подрельсовая RC65',
          gost: 'ТУ 0941-001-44659632-2018',
          price: 2800,
          stock: 10000,
          condition: 'new',
          images: ['/test-product.webp'],
          categorySlug: 'sleepers',
          subcategorySlug: 'plates',
          description: 'Плита подрельсовая полимеркомпозитная RC65.',
        },
        quantity: 150,
        price: 2800,
      },
    ],
    totalItems: 350,
    totalPrice: 900000,
  },
]

// Simulate localStorage for persistence
const STORAGE_KEY = 'orders_data'

function getStoredOrders(): Order[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {
    // ignore
  }
  return mockOrders
}

function saveOrders(orders: Order[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
  } catch {
    // ignore
  }
}

export async function getOrdersApi(): Promise<Order[]> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return getStoredOrders()
}

export async function getOrderByIdApi(id: string): Promise<Order | null> {
  await new Promise(resolve => setTimeout(resolve, 300))
  const orders = getStoredOrders()
  return orders.find(o => o.id === id) || null
}

export async function updateOrderStatusApi(id: string, status: Order['status']): Promise<Order> {
  await new Promise(resolve => setTimeout(resolve, 300))
  const orders = getStoredOrders()
  const orderIndex = orders.findIndex(o => o.id === id)
  
  if (orderIndex === -1) {
    throw new Error('Order not found')
  }
  
  const updatedOrder = { ...orders[orderIndex], status }
  orders[orderIndex] = updatedOrder
  saveOrders(orders)
  
  return updatedOrder
}

export async function createOrderApi(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Promise<Order> {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const orders = getStoredOrders()
  const newOrder: Order = {
    ...orderData,
    id: `order-${Date.now()}`,
    orderNumber: `ORD-${Math.floor(Math.random() * 9000) + 1000}`,
    createdAt: new Date().toISOString(),
    status: 'new',
  }
  
  orders.unshift(newOrder)
  saveOrders(orders)
  
  return newOrder
}

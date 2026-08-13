import { FiTruck, FiPackage } from 'react-icons/fi'
import { TbTrain } from 'react-icons/tb'
import { Card, CardContent, CardHeader } from '../../shared/ui/Card'
import { IconBox } from '../../shared/ui/IconBox'

export function DeliveryMethods() {
  const methods = [
    {
      icon: <TbTrain className="w-6 h-6" />,
      title: 'Ж/Д доставка',
      description: 'Вагонами и контейнерами, оптимально для крупных партий рельсов и шпал',
    },
    {
      icon: <FiTruck className="w-6 h-6" />,
      title: 'Автотранспорт',
      description: 'Доставка автотранспортом до объекта, удобно для небольших партий и крепежа',
    },
    {
      icon: <FiPackage className="w-6 h-6" />,
      title: 'Самовывоз',
      description: 'С собственных складов, отгрузка в день обращения',
    },
  ]

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Способы доставки</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {methods.map((method, i) => (
            <Card key={i} className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <IconBox size="lg" variant="primary" className="mb-3">
                  {method.icon}
                </IconBox>
                <h3 className="text-lg md:text-xl font-bold">{method.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

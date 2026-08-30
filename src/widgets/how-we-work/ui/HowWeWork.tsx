interface StepCardProps {
  number: string
  title: string
  description: string
}

function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6 text-center">
      <div className="text-4xl font-black text-[hsl(var(--primary))] mb-2">{number}</div>
      <h4 className="font-bold mb-2">{title}</h4>
      <p className="text-sm text-[hsl(var(--muted-foreground))]">{description}</p>
    </div>
  )
}

export function HowWeWork() {
  const steps = [
    { number: '01', title: 'Заявка', description: 'Оставляете заявку на сайте или по телефону' },
    { number: '02', title: 'Расчёт', description: 'Рассчитываем стоимость и сроки' },
    { number: '03', title: 'Договор', description: 'Заключаем договор, выставляем счёт' },
    { number: '04', title: 'Выполнение', description: 'Выполняем работы, отгружаем результат' },
  ]

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Как мы работаем</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step) => (
          <StepCard
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </div>
  )
}
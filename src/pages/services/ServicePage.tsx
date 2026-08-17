import { useParams } from 'react-router'
import { FiCheck, FiPhone, FiArrowLeft } from 'react-icons/fi'
import type { Service } from '../../entities/service/model/mocks'
import { SERVICES } from '../../entities/service/model/mocks'
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs'
import { Button } from '../../shared/ui/Button'
import { Input } from '../../shared/ui/Input'
import { Textarea } from '../../shared/ui/Textarea'
import { FormField } from '../../shared/ui/FormField'
import { Layout } from '../../widgets/Layout'
import { Link } from 'react-router'
import { useState } from 'react'

export function ServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  const service = SERVICES.find(s => s.slug === slug)
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: ''
  })

  if (!service) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Услуга не найдена</h1>
            <Link to="/services">
              <Button variant="primary">
                <FiArrowLeft className="w-4 h-4 mr-2" />
                Вернуться к услугам
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  const breadcrumbs = [
    { label: 'Главная', href: '/' },
    { label: 'Услуги', href: '/services' },
    { label: service.title, href: undefined },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Мок запроса на бекенд с serviceId
    const payload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      comment: formData.comment,
      serviceId: service.id // Указываем ID услуги
    }
    
    console.log('Отправка заявки на услугу:', payload)
    
    // Имитация запроса к API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: '', phone: '', email: '', address: '', comment: '' })
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />
        
        {/* Service Header */}
        <div className="mb-8">
          <Link to="/services" className="inline-flex items-center text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors mb-4">
            <FiArrowLeft className="w-4 h-4 mr-1" />
            Назад к услугам
          </Link>
          
          <div className="flex items-start gap-4 mb-4">
            <span className="text-5xl">{service.icon}</span>
            <div>
              <h1 className="text-3xl font-black mb-2">{service.title}</h1>
              <p className="text-lg text-[hsl(var(--muted-foreground))]">{service.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Full Description */}
            {service.fullDescription && (
              <section className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6">
                <h2 className="text-xl font-bold mb-4">Описание услуги</h2>
                <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                  {service.fullDescription}
                </p>
              </section>
            )}

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <section className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6">
                <h2 className="text-xl font-bold mb-4">Преимущества</h2>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FiCheck className="w-5 h-5 text-[hsl(var(--primary))] flex-shrink-0 mt-0.5" />
                      <span className="text-[hsl(var(--muted-foreground))]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* How we work for this service */}
            <section className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6">
              <h2 className="text-xl font-bold mb-4">Как мы работаем</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-black text-[hsl(var(--primary))] mb-2">01</div>
                  <h4 className="font-bold text-sm mb-1">Заявка</h4>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Оставляете заявку на сайте</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-[hsl(var(--primary))] mb-2">02</div>
                  <h4 className="font-bold text-sm mb-1">Расчёт</h4>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Рассчитываем стоимость</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-[hsl(var(--primary))] mb-2">03</div>
                  <h4 className="font-bold text-sm mb-1">Договор</h4>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Заключаем договор</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-[hsl(var(--primary))] mb-2">04</div>
                  <h4 className="font-bold text-sm mb-1">Выполнение</h4>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Выполняем работу</p>
                </div>
              </div>
            </section>
          </div>

          {/* Order Form */}
          <div className="lg:col-span-1">
            <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-2">Заказать услугу</h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
                Оставьте заявку — перезвоним в течение 15 минут
              </p>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-lg font-bold mb-2">Заявка отправлена!</h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
                    Мы свяжемся с вами в ближайшее время
                  </p>
                  <Button 
                    variant="primary" 
                    onClick={() => setSubmitted(false)}
                    className="w-full"
                  >
                    Отправить ещё заявку
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <FormField>
                    <Input 
                      placeholder="Ваше имя" 
                      size="md"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </FormField>
                  <FormField>
                    <Input 
                      type="tel" 
                      placeholder="Телефон" 
                      size="md"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </FormField>
                  <FormField>
                    <Input 
                      type="email" 
                      placeholder="Email" 
                      size="md"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </FormField>
                  <FormField>
                    <Input 
                      placeholder="Адрес доставки" 
                      size="md"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </FormField>
                  <FormField>
                    <Textarea 
                      placeholder="Комментарий к заказу" 
                      rows={3}
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    />
                  </FormField>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="md" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Отправка...</>
                    ) : (
                      <>
                        <FiPhone className="w-4 h-4 mr-2" />
                        Заказать услугу
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

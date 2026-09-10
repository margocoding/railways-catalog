import { useState, type FormEvent } from 'react'
import { toast } from 'react-toastify'
import { Button } from '../../shared/ui/Button'
import { Input } from '../../shared/ui/Input'
import { FormField } from '../../shared/ui/FormField'
import { Card, CardContent } from '../../shared/ui/Card'
import { Checkbox } from '@/shared/ui/Checkbox'
import { PhoneInput } from '@/shared/ui/PhoneInput'
import type { CreateRequestDto } from '@/entities/request/model/types'
import { requestApi } from '@/entities/request/api/request.api'
import { FORM_GOAL, metrikaReachGoal } from '@/shared/analytics/metrika'

const CARGO_TYPES = ['Рельсы', 'Шпалы', 'Крепёж', 'Накладки', 'Другое']

const BENEFITS = [
  'Бесплатный расчёт логистики',
  'Оптимальный маршрут под ваш объект',
  'Полное сопровождение до получения груза',
]

const EMPTY_FORM = {
  from: '',
  to: '',
  cargo: CARGO_TYPES[0],
  volume: '',
  name: '',
  phone: '',
  policyAccepted: false,
}

export function DeliveryCTA() {
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!formData.policyAccepted) {
      toast.error('Необходимо согласие с политикой конфиденциальности')
      return
    }

    setIsSubmitting(true)

    try {
      // Маршрут, тип груза и объём отдельных полей в заявке не имеют, поэтому
      // собираются в комментарий — так же поступает форма заказа услуги.
      const comment = [
        'Расчёт стоимости доставки',
        formData.from.trim() ? `Откуда: ${formData.from.trim()}` : '',
        formData.to.trim() ? `Куда: ${formData.to.trim()}` : '',
        `Тип груза: ${formData.cargo}`,
        formData.volume.trim() ? `Объём: ${formData.volume.trim()} т` : '',
      ]
        .filter(Boolean)
        .join('\n')

      const dto: CreateRequestDto = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        policyAccepted: formData.policyAccepted,
        comment,
      }

      await requestApi.create(dto, { requestFile: null, partnerMapFile: null })

      metrikaReachGoal(FORM_GOAL)
      toast.success('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время')
      setFormData(EMPTY_FORM)
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Ошибка при отправке заявки. Попробуйте позже'

      const errors = Array.isArray(message) ? message : [message]
      errors.forEach((error: string) => {
        toast.error(error)
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <Card>
          <CardContent className="p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Рассчитать стоимость доставки</h2>
                <p className="text-muted-foreground mb-6">
                  Заполните форму — менеджер свяжется с вами в течение 30 минут с точным расчётом стоимости и сроков доставки
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {BENEFITS.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Откуда">
                    <Input
                      placeholder="Город отправления"
                      size="lg"
                      value={formData.from}
                      onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                      disabled={isSubmitting}
                    />
                  </FormField>
                  <FormField label="Куда">
                    <Input
                      placeholder="Город назначения"
                      size="lg"
                      value={formData.to}
                      onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                      disabled={isSubmitting}
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Тип груза">
                    <select
                      className="w-full h-14 px-6 rounded-lg border border-border bg-muted/50 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 text-base"
                      value={formData.cargo}
                      onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                      disabled={isSubmitting}
                    >
                      {CARGO_TYPES.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </FormField>
                  <FormField label="Объём (тонн)">
                    <Input
                      type="number"
                      placeholder="Например: 20"
                      size="lg"
                      inputMode="numeric"
                      value={formData.volume}
                      onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                      disabled={isSubmitting}
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Имя *">
                    <Input
                      placeholder="Ваше имя"
                      size="lg"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      disabled={isSubmitting}
                    />
                  </FormField>
                  <FormField label="Телефон *">
                    <PhoneInput
                      value={formData.phone}
                      onChange={(value) => setFormData({ ...formData, phone: value })}
                      required
                      disabled={isSubmitting}
                    />
                  </FormField>
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox
                    checked={formData.policyAccepted}
                    onChange={(e) => setFormData({ ...formData, policyAccepted: e.target.checked })}
                    id="delivery-policy"
                    required
                    disabled={isSubmitting}
                  />
                  <label
                    htmlFor="delivery-policy"
                    className="text-xs text-muted-foreground leading-tight cursor-pointer"
                  >
                    Я согласен с{' '}
                    <a
                      href="/privacy"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      политикой конфиденциальности
                    </a>
                  </label>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Отправка...' : 'Рассчитать стоимость'}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

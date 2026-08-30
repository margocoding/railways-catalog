import { useState, type FormEvent } from 'react'
import { FiPhone, FiCheck } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Textarea } from '@/shared/ui/Textarea'
import { PhoneInput } from '@/shared/ui/PhoneInput'
import { Checkbox } from '@/shared/ui/Checkbox'
import type { CreateRequestDto } from '@/entities/request/model/types'
import { requestApi } from '@/entities/request/api/request.api'

interface ServiceRequestFormProps {
  serviceId?: string | null
  serviceTitle?: string
  compact?: boolean
}

const BENEFITS = [
  'Бесплатный расчёт стоимости',
  'Консультация специалиста',
  'Гибкие условия оплаты',
]

export function ServiceRequestForm({
  serviceId = null,
  serviceTitle,
  compact = false,
}: ServiceRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: '',
    policyAccepted: false,
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!formData.policyAccepted) {
      toast.error('Необходимо согласие с политикой конфиденциальности')
      return
    }

    setIsSubmitting(true)

    try {
      const combinedComment = [
        formData.address.trim() ? `Адрес: ${formData.address.trim()}` : '',
        formData.comment.trim(),
      ]
        .filter(Boolean)
        .join('\n')

      const dto: CreateRequestDto = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        policyAccepted: formData.policyAccepted,
      }

      if (formData.email.trim()) {
        dto.email = formData.email.trim()
      }

      if (combinedComment) {
        dto.comment = combinedComment
      }

      if (serviceId) {
        dto.serviceId = serviceId
      }

      await requestApi.create(dto, {
        requestFile: null,
        partnerMapFile: null,
      })

      toast.success('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время')
      setSubmitted(true)
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        comment: '',
        policyAccepted: false,
      })
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

  const handleReset = () => {
    setSubmitted(false)
  }

  const successBlock = (
    <div className="text-center py-8">
      <div className="text-5xl mb-4">✅</div>
      <h3 className="text-lg font-bold mb-2">Заявка отправлена!</h3>
      <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
        Мы свяжемся с вами в ближайшее время
      </p>
      <Button
        variant="primary"
        onClick={handleReset}
        className="w-full"
      >
        Отправить ещё заявку
      </Button>
    </div>
  )

  const formBlock = (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        placeholder="Ваше имя"
        size={compact ? 'md' : 'lg'}
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        disabled={isSubmitting}
      />
      <PhoneInput
        value={formData.phone}
        onChange={(value) => setFormData({ ...formData, phone: value })}
        required
        disabled={isSubmitting}
      />
      <Input
        type="email"
        placeholder="Email"
        size={compact ? 'md' : 'lg'}
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        disabled={isSubmitting}
      />
      <Input
        placeholder="Адрес доставки"
        size={compact ? 'md' : 'lg'}
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        disabled={isSubmitting}
      />
      <Textarea
        placeholder="Комментарий к заказу"
        rows={3}
        value={formData.comment}
        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
        disabled={isSubmitting}
      />

      <div className="flex items-start gap-2">
        <Checkbox
          checked={formData.policyAccepted}
          onChange={(e) => setFormData({ ...formData, policyAccepted: e.target.checked })}
          id="service-policy"
          required
          disabled={isSubmitting}
        />
        <label
          htmlFor="service-policy"
          className="text-xs text-[hsl(var(--muted-foreground))] leading-tight cursor-pointer"
        >
          Я согласен с{' '}
          <a
            href="/privacy"
            className="text-[hsl(var(--primary))] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            политикой конфиденциальности
          </a>
        </label>
      </div>

      <Button
        variant="primary"
        size={compact ? 'md' : 'lg'}
        className="w-full"
        type="submit"
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
    </form>
  )

  if (compact) {
    return (
      <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6">
        <h2 className="text-xl font-bold mb-2">
          {serviceTitle ? `Заказать: ${serviceTitle}` : 'Заказать услугу'}
        </h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
          Оставьте заявку — перезвоним в течение 15 минут
        </p>

        {submitted ? successBlock : formBlock}
      </div>
    )
  }

  return (
    <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            {serviceTitle ? `Заказать: ${serviceTitle}` : 'Заказать услугу'}
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] mb-6">
            Оставьте заявку — перезвоним в течение 15 минут
          </p>
          <ul className="space-y-3 text-sm text-[hsl(var(--muted-foreground))]">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2">
                <FiCheck className="w-4 h-4 text-[hsl(var(--primary))]" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {submitted ? successBlock : formBlock}
      </div>
    </div>
  )
}
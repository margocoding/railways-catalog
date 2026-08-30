import { Breadcrumbs } from '@/shared/ui/Breadcrumbs'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Layout } from '@/widgets/Layout'
import {
  FiClock,
  FiDownload,
  FiMail,
  FiMessageCircle,
  FiPhone,
  FiSend
} from 'react-icons/fi'

const PARTNER_CARD_URL = '/data/Карта партнера ИНВИА1.pdf'
const PARTNER_CARD_FILENAME = 'Карта партнера ИНВИА1.pdf'

const CONTACTS = [
  {
    id: 'phone-1',
    icon: FiPhone,
    title: 'Телефон',
    value: '+7 (843) 259-73-00',
    href: 'tel:+78432597300',
  },
  {
    id: 'phone-2',
    icon: FiPhone,
    title: 'Телефон',
    value: '+7 (962) 559-73-00',
    href: 'tel:+79625597300',
  },
  {
    id: 'phone-3',
    icon: FiPhone,
    title: 'Телефон',
    value: '+7 (960) 039-01-01',
    href: 'tel:+79600390101',
  },
  {
    id: 'email',
    icon: FiMail,
    title: 'Email',
    value: 'zakaz@ttr2.ru',
    href: 'mailto:zakaz@ttr2.ru',
  },
  {
    id: 'work-hours',
    icon: FiClock,
    title: 'Режим работы',
    value: 'Пн-Пт 9:00 - 18:00',
    subvalue: 'Сб-Вс выходные',
  },
  {
    id: 'messengers',
    icon: FiMessageCircle,
    title: 'Мессенджеры',
    value: 'Telegram, WhatsApp',
    href: '#',
  },
]

const ADDRESSES = [
  {
    id: 'legal',
    title: 'Юридический/фактический адрес',
    address:
      '422549, Респ Татарстан, Зеленодольский р-н, г Зеленодольск, ул Московская, ЗД.4, помещ.1',
  },
  {
    id: 'postal',
    title: 'Почтовый адрес',
    address: '422540, г. Зеленодольск, а/я 34',
  },
]

const REQUISITES = [
  { label: 'Наименование', value: 'ООО «СтальПуть»' },
  { label: 'ИНН', value: '1648052000' },
  { label: 'КПП', value: '164801001' },
  { label: 'ОГРН', value: '1201600037055' },
  {
    label: 'Юридический/фактический адрес',
    value:
      '422549, Респ Татарстан, Зеленодольский р-н, г Зеленодольск, ул Московская, ЗД.4, помещ.1',
    full: true,
  },
  {
    label: 'Почтовый адрес',
    value: '422540, г. Зеленодольск, а/я 34',
    full: true,
  },
  { label: 'Расчётный счёт', value: '40702810229070006758' },
  { label: 'Корр. счёт', value: '30101810200000000824' },
  { label: 'Банк', value: 'ФИЛИАЛ "НИЖЕГОРОДСКИЙ" АО "АЛЬФА-БАНК"' },
  { label: 'БИК', value: '042202824' },
]

export function ContactsPage() {
  const breadcrumbs = [
    { label: 'Главная', href: '/' },
    { label: 'Контакты', href: undefined },
  ]

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="mb-8 text-3xl font-black text-foreground">Контакты</h1>

        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACTS.map((contact) => (
            <ContactCard key={contact.id} {...contact} />
          ))}
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {ADDRESSES.map((address) => (
            <AddressCard key={address.id} {...address} />
          ))}
        </div>

        <div className="mb-12 rounded-xl border border-border bg-card p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-foreground">Реквизиты</h2>

            <a
              href={encodeURI(PARTNER_CARD_URL)}
              download={PARTNER_CARD_FILENAME}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-gradient px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              <FiDownload className="h-4 w-4" />
              Скачать реквизиты
            </a>
          </div>

          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
            {REQUISITES.map((req) => (
              <div key={req.label} className={req.full ? 'md:col-span-2' : ''}>
                <span className="text-muted-foreground">{req.label}:</span>
                <div className="font-medium text-foreground">{req.value}</div>
              </div>
            ))}
          </div>
        </div>

        <FeedbackForm />
      </div>
    </Layout>
  )
}

function ContactCard({
  icon: Icon,
  title,
  value,
  subvalue,
  href,
}: {
  icon: React.ElementType
  title: string
  value: string
  subvalue?: string
  href?: string
}) {
  const content = (
    <div className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50">
      <div className="mb-3 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <div className="mb-1 text-sm text-muted-foreground">{title}</div>
      <div className="font-bold text-foreground">{value}</div>

      {subvalue && (
        <div className="mt-1 text-xs text-muted-foreground">{subvalue}</div>
      )}
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    )
  }

  return content
}

function AddressCard({
  title,
  address,
}: {
  title: string
  address: string
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="mb-4 font-bold text-foreground">{title}</h3>

      <p className="mb-2 text-muted-foreground">{address}</p>
    </div>
  )
}

function FeedbackForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 md:p-8">
      <h2 className="mb-6 text-2xl font-bold text-foreground">
        Обратная связь
      </h2>

      <form
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        onSubmit={handleSubmit}
      >
        <Input type="text" placeholder="Ваше имя *" required />
        <Input type="tel" placeholder="Телефон *" required />
        <Input type="email" placeholder="Email *" required />
        <Input type="text" placeholder="Тема" />

        <textarea
          placeholder="Сообщение *"
          required
          rows={4}
          className="resize-none rounded-lg border border-border bg-muted px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary md:col-span-2"
        />

        <Button type="submit" size="lg" className="gap-2 md:col-span-2">
          <FiSend className="h-5 w-5" />
          Отправить
        </Button>
      </form>
    </div>
  )
}
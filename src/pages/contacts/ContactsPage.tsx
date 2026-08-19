import {
  FiClock,
  FiDownload,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiSend,
} from 'react-icons/fi'
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs'
import { Layout } from '../../widgets/Layout'

export function ContactsPage() {
  const breadcrumbs = [
    { label: 'Главная', href: '/' },
    { label: 'Контакты', href: undefined },
  ]

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="mb-8 text-3xl font-black">Контакты</h1>

        {/* Contact Cards */}
        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ContactCard
            icon={<FiPhone className="h-6 w-6" />}
            title="Телефон"
            value="+7 (800) 000-00-00"
            href="tel:+78000000000"
          />
          <ContactCard
            icon={<FiMail className="h-6 w-6" />}
            title="Email"
            value="info@stalput.ru"
            href="mailto:info@stalput.ru"
          />
          <ContactCard
            icon={<FiClock className="h-6 w-6" />}
            title="Режим работы"
            value="Пн-Пт 9:00 - 18:00"
            subvalue="Сб-Вс выходные"
          />
          <ContactCard
            icon={<FiMessageCircle className="h-6 w-6" />}
            title="Мессенджеры"
            value="Telegram, WhatsApp"
            href="#"
          />
        </div>

        {/* Addresses */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <AddressCard
            title="Офис"
            address="г. Москва, ул. Примерная, 1, офис 101"
            metro="м. Примерная"
          />
          <AddressCard
            title="Склад"
            address="г. Екатеринбург, промзона 5, склад 12"
            metro="Ж/д ветка"
          />
        </div>

        {/* Requisites */}
        <div className="mb-12 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold">Реквизиты</h2>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-gradient px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
              onClick={() => {
                // Здесь будет логика скачивания файла реквизитов
                console.log('Скачать реквизиты')
              }}
            >
              <FiDownload className="h-4 w-4" />
              Скачать реквизиты
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
            <div>
              <span className="text-[hsl(var(--muted-foreground))]">
                Наименование:
              </span>
              <div className="font-medium">ООО «СтальПуть»</div>
            </div>

            <div>
              <span className="text-[hsl(var(--muted-foreground))]">
                ИНН:
              </span>
              <div className="font-medium">7700000000</div>
            </div>

            <div>
              <span className="text-[hsl(var(--muted-foreground))]">
                ОГРН:
              </span>
              <div className="font-medium">1027700000000</div>
            </div>

            <div>
              <span className="text-[hsl(var(--muted-foreground))]">
                Адрес:
              </span>
              <div className="font-medium">
                г. Москва, ул. Примерная, 1
              </div>
            </div>

            <div>
              <span className="text-[hsl(var(--muted-foreground))]">
                Расчётный счёт:
              </span>
              <div className="font-medium">40702810000000000000</div>
            </div>

            <div>
              <span className="text-[hsl(var(--muted-foreground))]">
                Банк:
              </span>
              <div className="font-medium">ПАО Сбербанк</div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8">
          <h2 className="mb-6 text-2xl font-bold">Обратная связь</h2>

          <form
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Ваше имя *"
              required
              className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-4 py-3 outline-none transition-colors focus:border-[hsl(var(--primary))]"
            />

            <input
              type="tel"
              placeholder="Телефон *"
              required
              className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-4 py-3 outline-none transition-colors focus:border-[hsl(var(--primary))]"
            />

            <input
              type="email"
              placeholder="Email *"
              required
              className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-4 py-3 outline-none transition-colors focus:border-[hsl(var(--primary))]"
            />

            <input
              type="text"
              placeholder="Тема"
              className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-4 py-3 outline-none transition-colors focus:border-[hsl(var(--primary))]"
            />

            <textarea
              placeholder="Сообщение *"
              required
              rows={4}
              className="resize-none rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-4 py-3 outline-none transition-colors focus:border-[hsl(var(--primary))] md:col-span-2"
            />

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-accent-gradient py-3 font-bold text-white transition-opacity hover:opacity-90 md:col-span-2"
            >
              <FiSend className="h-5 w-5" />
              Отправить
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

function ContactCard({
  icon,
  title,
  value,
  subvalue,
  href,
}: {
  icon: React.ReactNode
  title: string
  value: string
  subvalue?: string
  href?: string
}) {
  const content = (
    <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 transition-colors hover:border-[hsl(var(--primary))/0.5]">
      <div className="mb-3 text-[hsl(var(--primary))]">{icon}</div>
      <div className="mb-1 text-sm text-[hsl(var(--muted-foreground))]">
        {title}
      </div>
      <div className="font-bold">{value}</div>

      {subvalue && (
        <div className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
          {subvalue}
        </div>
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
  metro,
}: {
  title: string
  address: string
  metro: string
}) {
  return (
    <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
      <h3 className="mb-4 font-bold">{title}</h3>

      <p className="mb-2 text-[hsl(var(--muted-foreground))]">
        {address}
      </p>

      <p className="mb-4 text-sm text-[hsl(var(--muted-foreground))]">
        {metro}
      </p>

      <button className="flex items-center gap-2 text-sm text-[hsl(var(--primary))] hover:underline">
        <FiMapPin className="h-4 w-4" />
        Открыть на карте
      </button>
    </div>
  )
}
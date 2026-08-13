import { FiClock, FiMail, FiMapPin, FiMessageCircle, FiPhone, FiSend } from 'react-icons/fi'
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
        
        <h1 className="text-3xl font-black mb-8">Контакты</h1>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <ContactCard 
            icon={<FiPhone className="w-6 h-6" />}
            title="Телефон"
            value="+7 (800) 000-00-00"
            href="tel:+78000000000"
          />
          <ContactCard 
            icon={<FiMail className="w-6 h-6" />}
            title="Email"
            value="info@stalput.ru"
            href="mailto:info@stalput.ru"
          />
          <ContactCard 
            icon={<FiClock className="w-6 h-6" />}
            title="Режим работы"
            value="Пн-Пт 9:00 - 18:00"
            subvalue="Сб-Вс выходные"
          />
          <ContactCard 
            icon={<FiMessageCircle className="w-6 h-6" />}
            title="Мессенджеры"
            value="Telegram, WhatsApp"
            href="#"
          />
        </div>

        {/* Addresses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
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
        <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6 mb-12">
          <h2 className="text-2xl font-bold mb-6">Реквизиты</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-[hsl(var(--muted-foreground))]">Наименование:</span>
              <div className="font-medium">ООО «СтальПуть»</div>
            </div>
            <div>
              <span className="text-[hsl(var(--muted-foreground))]">ИНН:</span>
              <div className="font-medium">7700000000</div>
            </div>
            <div>
              <span className="text-[hsl(var(--muted-foreground))]">ОГРН:</span>
              <div className="font-medium">1027700000000</div>
            </div>
            <div>
              <span className="text-[hsl(var(--muted-foreground))]">Адрес:</span>
              <div className="font-medium">г. Москва, ул. Примерная, 1</div>
            </div>
            <div>
              <span className="text-[hsl(var(--muted-foreground))]">Расчётный счёт:</span>
              <div className="font-medium">40702810000000000000</div>
            </div>
            <div>
              <span className="text-[hsl(var(--muted-foreground))]">Банк:</span>
              <div className="font-medium">ПАО Сбербанк</div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">Обратная связь</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Ваше имя *"
              required
              className="px-4 py-3 bg-[hsl(var(--muted))] rounded-lg border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] outline-none transition-colors"
            />
            <input
              type="tel"
              placeholder="Телефон *"
              required
              className="px-4 py-3 bg-[hsl(var(--muted))] rounded-lg border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] outline-none transition-colors"
            />
            <input
              type="email"
              placeholder="Email *"
              required
              className="px-4 py-3 bg-[hsl(var(--muted))] rounded-lg border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] outline-none transition-colors"
            />
            <input
              type="text"
              placeholder="Тема"
              className="px-4 py-3 bg-[hsl(var(--muted))] rounded-lg border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] outline-none transition-colors"
            />
            <textarea
              placeholder="Сообщение *"
              required
              rows={4}
              className="md:col-span-2 px-4 py-3 bg-[hsl(var(--muted))] rounded-lg border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] outline-none transition-colors resize-none"
            />
            <button 
              type="submit"
              className="md:col-span-2 py-3 bg-accent-gradient rounded-lg font-bold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <FiSend className="w-5 h-5" />
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
  href 
}: { 
  icon: React.ReactNode
  title: string
  value: string
  subvalue?: string
  href?: string
}) {
  const content = (
    <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6 hover:border-[hsl(var(--primary))/0.5] transition-colors">
      <div className="text-[hsl(var(--primary))] mb-3">{icon}</div>
      <div className="text-sm text-[hsl(var(--muted-foreground))] mb-1">{title}</div>
      <div className="font-bold">{value}</div>
      {subvalue && <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{subvalue}</div>}
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

function AddressCard({ title, address, metro }: { title: string; address: string; metro: string }) {
  return (
    <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6">
      <h3 className="font-bold mb-4">{title}</h3>
      <p className="text-[hsl(var(--muted-foreground))] mb-2">{address}</p>
      <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">{metro}</p>
      <button className="text-sm text-[hsl(var(--primary))] hover:underline flex items-center gap-2">
        <FiMapPin className="w-4 h-4" />
        Открыть на карте
      </button>
    </div>
  )
}

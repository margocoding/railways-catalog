import { StatCard } from '@/shared/ui/StatCard'
import { FiPhone } from 'react-icons/fi'
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs'
import { Layout } from '../../widgets/Layout'

export function AboutPage() {
  const breadcrumbs = [
    { label: 'Главная', href: '/' },
    { label: 'О компании', href: undefined },
  ]
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />
        
        <h1 className="text-3xl font-black mb-8">О компании</h1>

        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <p className="text-[hsl(var(--muted-foreground))] mb-4">
              Мы — группа компаний, работающая в сфере железнодорожных материалов, древесины и логистики.
            </p>
            <p className="text-[hsl(var(--muted-foreground))] mb-4">
              Группа компаний развивает свою деятельность с 2010 года, а с 2020 года отдельным направлением является организация грузовых перевозок и логистика.
            </p>
            <p className="text-[hsl(var(--muted-foreground))] mb-4">
              Сегодня мы объединяем опыт в снабжении и перевозках, чтобы закрывать задачи клиентов комплексно — от подбора необходимых материалов до их доставки на объект.
            </p>
            <p className="text-[hsl(var(--muted-foreground))]">
              Основное направление нашей работы — поставка материалов для строительства, ремонта и содержания железнодорожных путей.
            </p>
          </div>
          <div className="aspect-video bg-[hsl(var(--muted))] rounded-xl overflow-hidden">
            <img 
              src="/placeholders/about.svg" 
              alt="О компании" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Range */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">В ассортименте</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'железнодорожные рельсы',
              'деревянные и железобетонные шпалы',
              'пропитанные шпалы и брус',
              'стрелочные переводы и комплектующие',
              'рельсовые скрепления',
              'накладки, подкладки и крепёж',
              'детали верхнего строения пути',
              'путевой инструмент',
              'другие материалы и изделия для железнодорожной инфраструктуры',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span className="text-[hsl(var(--muted-foreground))]">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[hsl(var(--muted-foreground))]">
            Мы также работаем с древесиной и её обработкой, в том числе с продукцией, предназначенной для эксплуатации в условиях повышенных нагрузок и воздействия окружающей среды.
          </p>
        </div>

        {/* Supply without complications */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Поставка без лишних сложностей</h2>
          <div className="space-y-4 text-[hsl(var(--muted-foreground))]">
            <p>
              Мы понимаем, что при строительстве и ремонте железнодорожных путей важна не только цена отдельного изделия. Необходимо получить подходящий материал, в нужном количестве, в согласованные сроки и доставить его непосредственно на объект.
            </p>
            <p>
              Поэтому мы организуем поставку с учётом характеристик груза, места назначения и требований заказчика.
            </p>
            <p>
              Собственные склады и производственные мощности позволяют нам поддерживать необходимый запас продукции и оперативно комплектовать заказы. По ключевым позициям обеспечиваем 100% наличие.
            </p>
            <p>
              Вся поставляемая продукция соответствует установленным требованиям и сопровождается необходимыми ГОСТами, паспортами и сертификатами качества.
            </p>
            <p>
              Собственная экспертиза в логистике позволяет нам подбирать оптимальный вариант перевозки и контролировать процесс доставки от отправителя до места выгрузки.
            </p>
          </div>
        </div>

        {/* Working on client's task */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Работаем под задачу клиента</h2>
          <div className="space-y-4 text-[hsl(var(--muted-foreground))]">
            <p>
              Мы готовы работать как с отдельными позициями, так и с комплексными заявками.
            </p>
            <p>
              Помогаем подобрать необходимые материалы, сформировать поставку, согласовать сроки и организовать доставку.
            </p>
            <p>
              Наша задача — сделать закупку железнодорожных материалов максимально понятной и удобной для клиента: от заявки до получения продукции на объекте.
            </p>
            <p>
              Мы строим работу на долгосрочном сотрудничестве, ответственном отношении к обязательствам и внимании к деталям.
            </p>
          </div>
        </div>

        {/* Tagline */}
        <div className="mb-12 rounded-xl bg-accent-gradient p-8 text-center text-white">
          <p className="text-xl font-bold">
            Материалы для пути. Логистика до объекта. Решение задачи в комплексе.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatCard value="14+" label="Лет на рынке" />
          <StatCard value="5000+" label="Довольных партнёров" />
          <StatCard value="100%" label="Наличие по ключевым позициям" />
          <StatCard value="48ч" label="Отгрузка" />
        </div>

        {/* Requisites */}
        <div className="bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] p-6 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Реквизиты</h2>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent-gradient rounded-lg font-bold text-white text-sm hover:opacity-90 transition-opacity"
              onClick={() => {
                console.log('Скачать реквизиты')
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Скачать реквизиты
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-[hsl(var(--muted-foreground))]">Наименование:</span>
              <div className="font-medium">ООО «СтальПуть»</div>
            </div>
            <div>
              <span className="text-[hsl(var(--muted-foreground))]">ИНН:</span>
              <div className="font-medium">1648052000</div>
            </div>
            <div>
              <span className="text-[hsl(var(--muted-foreground))]">КПП:</span>
              <div className="font-medium">164801001</div>
            </div>
            <div>
              <span className="text-[hsl(var(--muted-foreground))]">ОГРН:</span>
              <div className="font-medium">1201600037055</div>
            </div>
            <div className="md:col-span-2">
              <span className="text-[hsl(var(--muted-foreground))]">Юридический/фактический адрес:</span>
              <div className="font-medium">422549, Респ Татарстан, Зеленодольский р-н, г Зеленодольск, ул Московская, ЗД.4, помещ.1</div>
            </div>
            <div className="md:col-span-2">
              <span className="text-[hsl(var(--muted-foreground))]">Почтовый адрес:</span>
              <div className="font-medium">422540, г. Зеленодольск, а/я 34</div>
            </div>
            <div>
              <span className="text-[hsl(var(--muted-foreground))]">Расчётный счёт:</span>
              <div className="font-medium">40702810229070006758</div>
            </div>
            <div>
              <span className="text-[hsl(var(--muted-foreground))]">Корр. счёт:</span>
              <div className="font-medium">30101810200000000824</div>
            </div>
            <div>
              <span className="text-[hsl(var(--muted-foreground))]">Банк:</span>
              <div className="font-medium">ФИЛИАЛ "НИЖЕГОРОДСКИЙ" АО "АЛЬФА-БАНК"</div>
            </div>
            <div>
              <span className="text-[hsl(var(--muted-foreground))]">БИК:</span>
              <div className="font-medium">042202824</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent-gradient rounded-lg font-bold text-white hover:opacity-90 transition-opacity"
            onClick={() => window.dispatchEvent(new CustomEvent('open-request-form'))}
          >
            <FiPhone className="w-5 h-5" />
            Запросить КП
          </button>
        </div>
      </div>
    </Layout>
  )
}

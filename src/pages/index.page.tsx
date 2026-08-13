import { motion } from 'framer-motion'
import { FiTruck, FiAward, FiClock, FiMapPin } from 'react-icons/fi'

export default function Page() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" style={{ background: 'var(--hero-gradient)' }}>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 py-20 text-center relative z-10"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-4 py-2 rounded-full bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] text-sm font-medium mb-6"
          >
            B2B портал железнодорожных материалов
          </motion.span>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            ЖЕЛДОРМАТЕРИАЛЫ
            <span className="block bg-accent-gradient bg-clip-text text-transparent">
              ОТ ПРОИЗВОДИТЕЛЯ
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto mb-10">
            Полный ассортимент рельсов, шпал, крепежа и Путевого инструмента. 
            Отгрузка со склада за 3 дня. Доставка по всей России.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a 
              href="/catalog" 
              className="px-8 py-4 bg-accent-gradient rounded-xl font-bold text-white shadow-lg shadow-[hsl(var(--primary))/20] hover:shadow-[hsl(var(--primary))/40] transition-all hover:scale-105"
            >
              Перейти в каталог
            </a>
            <a 
              href="/price" 
              className="px-8 py-4 rounded-xl font-bold border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))/50] transition-all hover:scale-105"
            >
              Скачать прайс
            </a>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: '14+', label: 'лет на рынке' },
              { value: '50 000+', label: 'тонн отгружено' },
              { value: '3 000+', label: 'клиентов' },
              { value: '85', label: 'регионов доставки' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="p-4 rounded-xl bg-[hsl(var(--card))]/50 backdrop-blur border border-[hsl(var(--border))]"
              >
                <div className="text-3xl md:text-4xl font-black bg-accent-gradient bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-[hsl(var(--muted-foreground))] mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-[hsl(var(--background))]">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-center mb-12"
          >
            КАТАЛОГ ПРОДУКЦИИ
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              { slug: '/catalog/rails', name: 'Рельсы', icon: '🛤️', desc: 'Р-50, Р-65 новые и б/у' },
              { slug: '/catalog/sleepers', name: 'Шпалы и плиты', icon: '🟫', desc: 'Деревянные, ЖБ, полимерные' },
              { slug: '/catalog/fasteners', name: 'Крепёж', icon: '🔩', desc: 'Болты, гайки, скрепления' },
              { slug: '/catalog/shoes', name: 'Башмаки', icon: '👞', desc: 'Тормозные и подкладочные' },
              { slug: '/catalog/buffers', name: 'Упоры тупиковые', icon: '🛑', desc: 'Бетонные и металлические' },
              { slug: '/catalog/metal', name: 'Металлоизделия', icon: '🔲', desc: 'Листы, прутки, трубы' },
              { slug: '/catalog/tools', name: 'Путевой инструмент', icon: '🔧', desc: 'Ручной и механизированный' },
            ].map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.03 }}
              >
                <a 
                  href={cat.slug}
                  className="block p-6 rounded-xl border border-[hsl(var(--border))] bg-card-gradient hover:border-[hsl(var(--primary))/50] transition-all h-full"
                >
                  <div className="text-4xl mb-4">{cat.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{cat.name}</h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">{cat.desc}</p>
                </a>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="/catalog" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-gradient rounded-xl font-bold text-white hover:opacity-90 transition-opacity"
            >
              Весь каталог →
            </a>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-[hsl(var(--card))]">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-center mb-12"
          >
            ПРЕИМУЩЕСТВА РАБОТЫ С НАМИ
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: FiClock, 
                title: 'Быстрая отгрузка', 
                desc: 'Отгрузка со склада в течение 3 дней после подтверждения заказа' 
              },
              { 
                icon: FiAward, 
                title: 'Гарантия качества', 
                desc: 'Вся продукция сертифицирована по ГОСТ и сопровождается паспортами' 
              },
              { 
                icon: FiTruck, 
                title: 'Доставка по РФ', 
                desc: 'Отправляем ж/д транспортом, автовозами и морем в любой регион' 
              },
              { 
                icon: FiMapPin, 
                title: 'Склады в регионах', 
                desc: '7 складских комплексов для оперативной отгрузки ближе к клиенту' 
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent-gradient flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Geography Section */}
      <section className="py-20 bg-[hsl(var(--background))]" style={{ background: 'var(--hero-gradient)' }}>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              ГЕОГРАФИЯ ПОСТАВОК
            </h2>
            <p className="text-lg text-[hsl(var(--muted-foreground))] mb-12">
              Работаем со всеми регионами России. Основные направления: 
              Урал, Сибирь, Дальний Восток, Север, Юг.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {['Москва', 'Екатеринбург', 'Новосибирск', 'Владивосток', 'Санкт-Петербург', 'Челябинск', 'Красноярск', 'Хабаровск'].map((city) => (
                <div 
                  key={city}
                  className="p-3 rounded-lg bg-[hsl(var(--card))]/50 border border-[hsl(var(--border))] text-sm font-medium"
                >
                  {city}
                </div>
              ))}
            </div>
            
            <div className="p-6 rounded-xl bg-[hsl(var(--card))]/30 border border-[hsl(var(--border))]">
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                📍 Отгружаем более 5 000 тонн продукции ежемесячно в 85 регионов России
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[hsl(var(--card))]">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              ГОТОВЫ ОФОРМИТЬ ЗАКАЗ?
            </h2>
            <p className="text-lg text-[hsl(var(--muted-foreground))] mb-8">
              Оставьте заявку — наш менеджер свяжется с вами в течение 15 минут 
              для уточнения деталей и расчёта стоимости доставки.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contacts" 
                className="px-8 py-4 bg-accent-gradient rounded-xl font-bold text-white shadow-lg shadow-[hsl(var(--primary))/20] hover:shadow-[hsl(var(--primary))/40] transition-all hover:scale-105"
              >
                Оставить заявку
              </a>
              <a 
                href="tel:+78000000000"
                className="px-8 py-4 rounded-xl font-bold border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))/50] transition-all hover:scale-105 text-center"
              >
                8 (800) 000-00-00
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

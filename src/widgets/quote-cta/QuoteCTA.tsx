import { motion } from 'framer-motion'

export function QuoteCTA() {
  return (
    <section className="py-20 bg-[hsl(var(--background))]" style={{ background: 'var(--accent-gradient)' }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
              ЗАПРОСИТЕ КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ
            </h2>
            <p className="text-white/80">
              Ответим в течение рабочего часа, подберём наличие и цену
            </p>
          </div>

          <form className="bg-[hsl(var(--card))] p-6 rounded-xl border border-[hsl(var(--border))]" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Имя"
                className="px-4 py-3 rounded-lg bg-[hsl(var(--background))] border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] outline-none transition-colors"
              />
              <input
                type="tel"
                placeholder="Телефон"
                className="px-4 py-3 rounded-lg bg-[hsl(var(--background))] border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] outline-none transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-3 rounded-lg bg-[hsl(var(--background))] border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] outline-none transition-colors md:col-span-2"
              />
              <textarea
                placeholder="Комментарий (опционально)"
                rows={3}
                className="px-4 py-3 rounded-lg bg-[hsl(var(--background))] border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] outline-none transition-colors md:col-span-2 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-accent-gradient rounded-lg font-bold text-white hover:opacity-90 transition-opacity"
            >
              Отправить заявку
            </button>

            <p className="text-xs text-[hsl(var(--muted-foreground))] text-center mt-4">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

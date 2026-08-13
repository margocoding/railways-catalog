import ReactDOMServer from 'react-dom/server'
import { escapeInject, dangerouslySkipEscape } from 'vike/server'
import { PageContextProvider } from './PageContextProvider'
import type { Context } from './types'

export { render }

async function render(pageContext: Context): Promise<ReturnType<typeof escapeInject>> {
  const { Page, pageProps } = pageContext
  
  const html = ReactDOMServer.renderToString(
    <PageContextProvider pageContext={pageContext}>
      <Page {...pageProps} />
    </PageContextProvider>
  )

  return escapeInject`<!DOCTYPE html>
    <html lang="ru">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>СтальПуть — материалы ВСП: рельсы, шпалы, крепёж с доставкой по РФ и СНГ</title>
        <meta name="description" content="Поставки железнодорожных материалов: рельсы Р-65/Р-50, шпалы, крепёж, башмаки. Наличие на складах, отгрузка 48 часов, полный пакет документов." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(html)}</div>
      </body>
    </html>`
}

import { useEffect } from 'react'

interface SeoConfig {
  title: string
  description: string
  keywords?: string
  canonical?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
  noindex?: boolean
}

export function useSeo(config: SeoConfig | null) {
  useEffect(() => {
    if (!config) return

    const cleanup: (() => void)[] = []

    const setTitle = (title: string) => {
      document.title = title
    }

    const setMeta = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement | null
      const existed = !!element

      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }

      element.content = content

      if (!existed) {
        cleanup.push(() => element?.remove())
      }
    }

    const setCanonical = (href: string) => {
      let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
      const existed = !!element

      if (!element) {
        element = document.createElement('link')
        element.rel = 'canonical'
        document.head.appendChild(element)
      }

      element.href = href

      if (!existed) {
        cleanup.push(() => element?.remove())
      }
    }

    const setJsonLd = (data: Record<string, unknown> | Record<string, unknown>[]) => {
      const id = 'seo-json-ld'
      const existing = document.getElementById(id)
      if (existing) existing.remove()

      const script = document.createElement('script')
      script.id = id
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(data)
      document.head.appendChild(script)

      cleanup.push(() => script.remove())
    }

    setTitle(config.title)

    setMeta('description', config.description)
    setMeta('og:title', config.ogTitle || config.title, 'property')
    setMeta('og:description', config.ogDescription || config.description, 'property')
    setMeta('og:url', config.ogUrl || window.location.href, 'property')

    if (config.keywords) {
      setMeta('keywords', config.keywords)
    }

    if (config.ogImage) {
      setMeta('og:image', config.ogImage, 'property')
    }

    if (config.canonical) {
      setCanonical(config.canonical)
    }

    if (config.noindex) {
      setMeta('robots', 'noindex, nofollow')
    }

    if (config.jsonLd) {
      setJsonLd(config.jsonLd)
    }

    return () => {
      cleanup.forEach((fn) => fn())
      const jsonLdScript = document.getElementById('seo-json-ld')
      if (jsonLdScript) jsonLdScript.remove()
    }
  }, [config])
}
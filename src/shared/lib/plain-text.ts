const entities: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', sup2: '²', sup3: '³', times: '×', ndash: '–', mdash: '—', laquo: '«', raquo: '»', deg: '°' }
const superscripts: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '+': '⁺', '-': '⁻' }

// Text-only output: works identically on the server and in the browser.
export function plainText(value: unknown): string {
  let text = value == null ? '' : String(value)
  for (let i = 0; i < 2; i++) {
    text = text.replace(/&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]+);/gi, (match, entity: string) => {
      if (!entity.startsWith('#')) return entities[entity.toLowerCase()] ?? match
      const code = entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10)
      return code > 0 && code <= 0x10ffff && !(code >= 0xd800 && code <= 0xdfff) ? String.fromCodePoint(code) : ''
    })
  }
  return text
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '')
    .replace(/<sup\b[^>]*>\s*([0-9+-]+)\s*<\/sup\s*>/gi, (_, digits: string) => [...digits].map((digit) => superscripts[digit]).join(''))
    .replace(/<\/?(?:p|div|br|li)\b[^>]*>/gi, ' ')
    .replace(/<\/?[a-z][^>]*>/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function formatSpec(value: unknown, unit?: string): string {
  return [plainText(value), plainText(unit)].filter(Boolean).join(' ')
}

export function jsonForHtml(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')
}

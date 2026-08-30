export function normalizeText(text: string): string {
  return text.toLowerCase().replace(/ё/g, 'е').trim()
}
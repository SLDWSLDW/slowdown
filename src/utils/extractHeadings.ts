export interface TocItem {
  id: string
  text: string
  level: number
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function extractHeadings(markdown: string): TocItem[] {
  const lines = markdown.split('\n')
  const items: TocItem[] = []
  let inCodeBlock = false

  for (const line of lines) {
    if (line.trimStart().startsWith('```')) {
      inCodeBlock = !inCodeBlock
      continue
    }
    if (inCodeBlock) continue

    const match = line.match(/^(#{1,3})\s+(.+)$/)
    if (!match) continue

    const level = match[1].length
    const text = match[2].trim()
    const id = slugify(text)

    items.push({ id, text, level })
  }

  return items
}

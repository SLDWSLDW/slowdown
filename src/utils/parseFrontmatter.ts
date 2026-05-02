export interface Frontmatter {
  title?: string
  date?: string
  tags?: string[]
}

export function parseFrontmatter(raw: string): { data: Frontmatter; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const yaml = match[1]
  const content = match[2]
  const data: Record<string, unknown> = {}

  for (const line of yaml.split('\n')) {
    const kv = line.match(/^(\w+):\s*(.+)$/)
    if (!kv) continue
    let value: string = kv[2].trim()
    if (value.startsWith('[') && value.endsWith(']')) {
      data[kv[1]] = value.slice(1, -1).split(',').map((s) => s.trim()).filter(Boolean)
    } else if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      data[kv[1]] = value.slice(1, -1)
    } else {
      data[kv[1]] = value
    }
  }

  return { data: data as Frontmatter, content }
}

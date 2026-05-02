import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { parseFrontmatter } from '../utils/parseFrontmatter'
import config from '../../config.json'

interface PostMeta {
  slug: string
  title: string
  date: string
  tags: string[]
}

const posts = import.meta.glob('/post/*.md', { query: '?raw', import: 'default' })

export default function Writeups() {
  const [items, setItems] = useState<PostMeta[]>([])

  useEffect(() => {
    const entries = Object.entries(posts).map(([path, loader]) => {
      const slug = path.replace('/post/', '').replace('.md', '')
      return { slug, loader }
    })

    Promise.all(
      entries.map(async ({ slug, loader }) => {
        const raw = await loader() as string
        const { data } = parseFrontmatter(raw)
        return {
          slug,
          title: data.title || slug,
          date: data.date || '',
          tags: data.tags || [],
        }
      })
    ).then((results) => {
      results.sort((a, b) => {
        if (!a.date || !b.date) return 0
        return b.date.localeCompare(a.date)
      })
      setItems(results)
    })
  }, [])

  const { comment, title, description } = config.pages.writeups

  return (
    <div className="page writeups-page">
      <div className="page-header">
        <span className="section-comment">{comment}</span>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>

      <div className="writeups-list">
        {items.map((item) => (
          <Link
            key={item.slug}
            to={`/writeups/${item.slug}`}
            className="writeup-card"
          >
            <span className="writeup-main">
              <span className="writeup-icon">$</span>
              <span className="writeup-name">{item.title}</span>
            </span>
            <span className="writeup-meta">
              {item.date && (
                <span className="writeup-date">{item.date}</span>
              )}
              <span className="writeup-tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="writeup-tag">{tag}</span>
                ))}
              </span>
            </span>
            <span className="writeup-link-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

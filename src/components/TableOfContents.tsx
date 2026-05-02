import { useEffect, useState, useRef } from 'react'
import type { TocItem } from '../utils/extractHeadings'

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    const currentObserver = observerRef.current
    for (const item of items) {
      const el = document.getElementById(item.id)
      if (el) currentObserver.observe(el)
    }

    return () => currentObserver.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav className="toc">
      <div className="toc-title">Contents</div>
      <ul className="toc-list">
        {items.map((item) => (
          <li
            key={item.id}
            className={`toc-item toc-level-${item.level} ${activeId === item.id ? 'toc-active' : ''}`}
          >
            <a href={`#${item.id}`} onClick={(e) => {
              e.preventDefault()
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
            }}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

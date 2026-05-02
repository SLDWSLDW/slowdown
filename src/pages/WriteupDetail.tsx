import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { parseFrontmatter } from '../utils/parseFrontmatter'
import { extractHeadings } from '../utils/extractHeadings'
import type { TocItem } from '../utils/extractHeadings'
import MarkdownRenderer from '../components/MarkdownRenderer'
import TableOfContents from '../components/TableOfContents'

const posts = import.meta.glob('/post/*.md', { query: '?raw', import: 'default' })

interface PostMeta {
  title: string
  date: string
  tags: string[]
}

export default function WriteupDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [content, setContent] = useState('')
  const [meta, setMeta] = useState<PostMeta | null>(null)
  const [toc, setToc] = useState<TocItem[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) {
      setNotFound(true)
      setLoading(false)
      return
    }
    const filePath = `/post/${slug}.md`
    const loader = posts[filePath]
    if (loader) {
      loader().then((mod) => {
        const raw = mod as string
        const { data, content } = parseFrontmatter(raw)
        setMeta({
          title: data.title || slug,
          date: data.date || '',
          tags: data.tags || [],
        })
        setContent(content)
        setToc(extractHeadings(content))
        setLoading(false)
      }).catch(() => {
        setNotFound(true)
        setLoading(false)
      })
    } else {
      setNotFound(true)
      setLoading(false)
    }
  }, [slug])

  if (loading) {
    return (
      <div className="page writeup-detail-page">
        <div className="page-header">
          <span className="section-comment"># echo "Loading..."</span>
          <h1>Loading</h1>
        </div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="page writeup-detail-page">
        <div className="page-header">
          <span className="section-comment"># echo "404"</span>
          <h1>Writeup Not Found</h1>
          <p className="page-description">
            The requested writeup could not be found.{' '}
            <Link to="/writeups">Back to writeups</Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="page writeup-detail-page">
      <div className="writeup-detail-header">
        <Link to="/writeups" className="writeup-back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to writeups
        </Link>
        <h1>{meta?.title}</h1>
        <div className="writeup-detail-meta">
          {meta?.date && (
            <span className="writeup-date">{meta.date}</span>
          )}
          {meta?.tags.map((tag) => (
            <span key={tag} className="writeup-tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="writeup-layout">
        <div className="writeup-sidebar">
          <TableOfContents items={toc} />
        </div>
        <div className="writeup-content">
          <MarkdownRenderer content={content} />
        </div>
      </div>
    </div>
  )
}

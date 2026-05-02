import { type ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkDirective from 'remark-directive'
import rehypeKatex from 'rehype-katex'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { Components } from 'react-markdown'
import { slugify } from '../utils/extractHeadings'

import 'katex/dist/katex.min.css'

function admonitionPlugin() {
  return (tree: any) => {
    const visit = (nodes: any[]) => {
      for (const node of nodes) {
        if (node.type === 'containerDirective') {
          const type = ['note', 'warning', 'tip', 'danger'].includes(node.name) ? node.name : 'note'
          node.data = {
            hName: 'div',
            hProperties: { className: `admonition admonition-${type}` },
          }
        }
        if (node.children) {
          visit(node.children)
        }
      }
    }
    visit(tree.children || [])
  }
}

function Heading1({ children }: { children?: ReactNode }) {
  return <h1 id={slugify(extractText(children))}>{children}</h1>
}
function Heading2({ children }: { children?: ReactNode }) {
  return <h2 id={slugify(extractText(children))}>{children}</h2>
}
function Heading3({ children }: { children?: ReactNode }) {
  return <h3 id={slugify(extractText(children))}>{children}</h3>
}

function extractText(node: ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number' || typeof node === 'boolean') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (node && typeof node === 'object' && 'props' in node) {
    return extractText((node as any).props.children)
  }
  return ''
}

const components: Components = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  code({ className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    const code = String(children).replace(/\n$/, '')
    if (match) {
      return (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
        >
          {code}
        </SyntaxHighlighter>
      )
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
  table({ children }) {
    return (
      <div className="table-wrapper">
        <table>{children}</table>
      </div>
    )
  },
}

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm, remarkMath, remarkDirective, admonitionPlugin]}
        rehypePlugins={[rehypeKatex]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

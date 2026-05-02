import { useState, useEffect, useRef } from 'react'
import config from '../../config.json'
import { getInitialLines, executeCommand, type TerminalLine } from '../utils/terminalEngine'

export default function Home() {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLines(getInitialLines())
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return

    const newLines: TerminalLine[] = [
      ...lines,
      { type: 'input', text: trimmed },
    ]

    const outputs = executeCommand(trimmed)

    const isClear = outputs.length === 1 && outputs[0].text === '__CLEAR__'
    if (isClear) {
      setLines([])
    } else {
      setLines([...newLines, ...outputs])
    }

    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  return (
    <div className="page home-page" onClick={() => inputRef.current?.focus()}>
      <section className="hero-section">
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <span className="terminal-title">{config.home.terminalTitle}</span>
        </div>
        <div className="terminal-body" ref={scrollRef}>
          {lines.map((line, i) => {
            if (line.type === 'input') {
              return (
                <div key={i} className="terminal-line">
                  <span className="prompt">root@s10wd0wn</span>
                  <span className="sep">:</span>
                  <span className="path">~</span>
                  <span className="sep">$</span>
                  <span className="cmd">{line.text}</span>
                </div>
              )
            }
            if (line.type === 'output-pre') {
              return (
                <div key={i} className="terminal-line ascii-art">
                  <pre>{line.text}</pre>
                </div>
              )
            }
            return (
              <div key={i} className="terminal-line">
                <div className="terminal-output">
                  {line.text.split('\n').map((t, j) => <p key={j}>{t}</p>)}
                </div>
              </div>
            )
          })}

          <div className="terminal-line">
            <form className="terminal-input-line" onSubmit={handleSubmit}>
              <span className="prompt">root@s10wd0wn</span>
              <span className="sep">:</span>
              <span className="path">~</span>
              <span className="sep">$</span>
              <input
                ref={inputRef}
                className="terminal-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

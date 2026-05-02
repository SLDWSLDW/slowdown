import config from '../../config.json'

export interface TerminalLine {
  type: 'input' | 'output' | 'output-pre' | 'output-html'
  text: string
}

interface FileEntry {
  type: 'file'
  content: string
}

function buildFilesystem() {
  const banner = config.home.banner
  const desc = config.home.paragraphs.map((p) => p.replace(/<\/?strong>/g, '*')).join('\n\n')
  const members = config.members.map((m) => `  ${m.name.padEnd(20)} ${m.role}`).join('\n')
  const projects = config.projects.map((p) => `  ${p.title} - ${p.description}`).join('\n')
  const honors = config.honors.map((h) => `  ${h.title}`).join('\n')

  const fs: Record<string, FileEntry> = {
    'banner': { type: 'file', content: banner },
    'description': { type: 'file', content: desc },
    'members': { type: 'file', content: members },
    'honors': { type: 'file', content: honors },
    'projects': { type: 'file', content: projects },
  }

  return fs
}

export function getInitialLines(): TerminalLine[] {
  const stripHtml = (s: string) => s.replace(/<\/?strong>/g, '*').replace(/<\/?[^>]+>/g, '')
  return [
    { type: 'output-pre', text: config.home.banner },
    { type: 'output', text: stripHtml(config.home.paragraphs[0]) },
    { type: 'output', text: stripHtml(config.home.paragraphs[1]) },
  ]
}

export function executeCommand(input: string): TerminalLine[] {
  const fs = buildFilesystem()
  const parts = input.trim().split(/\s+/)
  const cmd = parts[0]?.toLowerCase()
  const args = parts.slice(1)
  const result: TerminalLine[] = []

  switch (cmd) {
    case 'ping': {
      if (args.length === 0) {
        result.push({ type: 'output', text: 'Welcome to s10wd0wn!' })
      } else {
        const host = args[0]
        result.push({ type: 'output', text: `PING ${host} (127.0.0.1) 56(84) bytes of data.` })
        for (let i = 0; i < 3; i++) {
          const ms = Math.floor(Math.random() * 30 + 5)
          result.push({ type: 'output', text: `64 bytes from 127.0.0.1: icmp_seq=${i + 1} ttl=64 time=${ms}.${Math.floor(Math.random() * 100)}ms` })
        }
        result.push({ type: 'output', text: `--- ${host} ping statistics ---` })
        result.push({ type: 'output', text: `3 packets transmitted, 3 received, 0% packet loss, time ${Math.floor(Math.random() * 10 + 2)}ms` })
      }
      break
    }

    case 'ls': {
      const names = Object.keys(fs)
      result.push({ type: 'output', text: names.join('  ') })
      break
    }

    case 'cat': {
      if (args.length === 0) {
        result.push({ type: 'output', text: 'Usage: cat <filename>' })
        break
      }
      const name = args[0]
      const entry = fs[name]
      if (!entry) {
        result.push({ type: 'output', text: `cat: ${name}: No such file or directory` })
        break
      }
      result.push({ type: 'output', text: entry.content })
      break
    }

    case 'echo':
      result.push({ type: 'output', text: args.join(' ') || '' })
      break

    case 'whoami':
      result.push({ type: 'output', text: 'root' })
      break

    case 'uname':
      result.push({ type: 'output', text: 'Linux s10wd0wn 6.6.1-arch1-1 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux' })
      break

    case 'date':
      result.push({ type: 'output', text: new Date().toString() })
      break

    case 'uptime': {
      const days = Math.floor(Math.random() * 30 + 1)
      const mins = Math.floor(Math.random() * 60)
      const users = Math.floor(Math.random() * 3 + 1)
      result.push({ type: 'output', text: `${days}:${String(mins).padStart(2, '0')} up ${days} day, ${mins} min, ${users} user, load average: ${(Math.random() * 2).toFixed(2)} ${(Math.random() * 1.5).toFixed(2)} ${(Math.random() * 1).toFixed(2)}` })
      break
    }

    case 'help':
      result.push({ type: 'output', text: [
        'Available commands:',
        '',
        '  ls              List files',
        '  cat <file>      Display file contents',
        '  echo <text>     Echo text back',
        '  ping <host>     Ping a host',
        '  whoami          Show current user',
        '  uname           Show system info',
        '  date            Show current date/time',
        '  uptime          Show system uptime',
        '  clear           Clear terminal',
        '  help            Show this help',
      ].join('\n') })
      break

    case 'clear':
      result.push({ type: 'output' as const, text: '__CLEAR__' })
      break

    default: {
      const notFound = input.trim() ? `${cmd}: command not found` : ''
      if (notFound) result.push({ type: 'output', text: notFound })
      break
    }
  }

  return result
}

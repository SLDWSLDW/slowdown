import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  animating: boolean
  animPhase: string | null
  animDir: string | null
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
    return 'dark'
  })
  const [animating, setAnimating] = useState(false)
  const [animPhase, setAnimPhase] = useState<string | null>(null)
  const [animDir, setAnimDir] = useState<string | null>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    if (animating) return
    setAnimating(true)

    const goToDark = theme === 'light'
    setAnimDir(goToDark ? 'to-dark' : 'to-light')

    setAnimPhase('in')
    setTimeout(() => {
      setTheme(goToDark ? 'dark' : 'light')
      requestAnimationFrame(() => {
        setAnimPhase('out')
      })
      setTimeout(() => {
        setAnimPhase(null)
        setAnimDir(null)
        setAnimating(false)
      }, 400)
    }, 400)
  }, [theme, animating])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, animating, animPhase, animDir }}>
      {children}
      <div className={`theme-curtain ${animPhase || ''} ${animDir || ''}`} style={{ display: animPhase ? undefined : 'none' }} />
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within a ThemeContext')
  return context
}

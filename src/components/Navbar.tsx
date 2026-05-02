import { NavLink } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'

const navItems = [
  { path: '/', label: 'Home', icon: '~' },
  { path: '/members', label: 'Members', icon: '#' },
  { path: '/honors', label: 'Honors', icon: '!' },
  { path: '/writeups', label: 'Writeups', icon: '$' },
  { path: '/projects', label: 'Projects', icon: '%' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand">
          <span className="brand-prompt">root@s10wd0wn</span>
          <span className="brand-sep">:</span>
          <span className="brand-path">~</span>
          <span className="brand-sep">$</span>
          <span className="brand-text"></span>
        </NavLink>
        <div className="navbar-links">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <span className="nav-prompt">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}

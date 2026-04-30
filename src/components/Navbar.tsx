import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/', label: 'Home', icon: '~' },
  { path: '/members', label: 'Members', icon: '#' },
  { path: '/honors', label: 'Honors', icon: '!' },
  { path: '/writeups', label: 'Writeups', icon: '$' },
  { path: '/projects', label: 'Projects', icon: '%' },
]

export default function Navbar() {
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
        </div>
      </div>
    </nav>
  )
}

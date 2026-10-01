import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import NotificationDropdown from './NotificationDropdown'

const links = [
  { to: '/', label: 'Home' },
  { to: '/browse', label: 'Browse' },
  { to: '/become-a-seller', label: 'Become a Seller' },
  { to: '/messages', label: 'Messages' },
  { to: '/orders', label: 'Orders' },
  { to: '/profile', label: 'Profile' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-logo">
          Neighbour<span>ly</span>
        </NavLink>

        <nav>
          <ul className="navbar-links">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === '/'}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar-right">
          <button className="icon-btn" aria-label="Search" onClick={() => navigate('/browse')}>
            🔍
          </button>

          <div className="notif-wrap">
            <button
              className="icon-btn"
              aria-label="Notifications"
              onClick={() => setNotifOpen((o) => !o)}
            >
              🔔
              <span className="dot" />
            </button>
            {notifOpen && <NotificationDropdown onClose={() => setNotifOpen(false)} />}
          </div>

          <button className="avatar" onClick={() => navigate('/profile')} aria-label="Your profile">
            🙂
          </button>

          <button
            className="navbar-toggle"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((o) => !o)}
          >
            ☰
          </button>
        </div>
      </div>

      <div className={`container navbar-mobile-panel${mobileOpen ? ' open' : ''}`}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </header>
  )
}

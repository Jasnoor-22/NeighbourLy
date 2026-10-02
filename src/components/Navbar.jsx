import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import NotificationDropdown from './NotificationDropdown'
import Avatar from './Avatar'
import { providerAvatars } from '../data/images'

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
    <header className="navbar-root">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-brand" aria-label="Neighbourly Homepage">
          <span className="brand-icon" aria-hidden="true">🌱</span>
          <span className="brand-text">
            Neighbour<span className="brand-highlight">ly</span>
          </span>
        </NavLink>

        <nav className="navbar-nav-desktop" aria-label="Main Navigation">
          <ul className="navbar-links-list">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `nav-link-item ${isActive ? 'active' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar-actions">
          <button
            type="button"
            className="navbar-icon-btn"
            aria-label="Search services"
            onClick={() => navigate('/browse')}
            title="Browse services"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <div className="notif-wrapper">
            <button
              type="button"
              className="navbar-icon-btn notif-btn"
              aria-label="Notifications"
              onClick={() => setNotifOpen((o) => !o)}
              aria-expanded={notifOpen}
              title="Notifications"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="notif-badge-dot" aria-hidden="true" />
            </button>
            {notifOpen && <NotificationDropdown onClose={() => setNotifOpen(false)} />}
          </div>

          <button
            type="button"
            className="navbar-avatar-btn"
            onClick={() => navigate('/profile')}
            aria-label="Go to your profile"
            title="Your Profile"
          >
            <Avatar
              src={providerAvatars.me}
              name="You"
              size="sm"
            />
          </button>

          <button
            type="button"
            className="navbar-mobile-toggle"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      <div
        className={`navbar-mobile-drawer ${mobileOpen ? 'open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div className="container mobile-links-container">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? 'active' : ''}`
              }
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  )
}

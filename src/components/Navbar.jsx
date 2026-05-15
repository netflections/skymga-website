import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
  { to: '/announcements', label: 'Announcements' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/handicap-etiquette', label: 'Handicap & Etiquette' },
  { to: '/bylaws', label: 'Bylaws' },
  { to: '/vote', label: 'Vote' },
]

const externalLinks = []

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setOpen(false)}>
          <img
            src="/mga_logo.png"
            alt="Men's Golf Association"
            className="navbar-logo-img"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar-links">
          {navLinks.map(({ to, label, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {label}
            </NavLink>
          ))}
          {externalLinks.map(({ href, label }) => (
            <a key={href} href={href} className="nav-link" target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`hamburger${open ? ' open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-menu${open ? ' open' : ''}`}>
        <nav>
          {navLinks.map(({ to, label, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              className={({ isActive }) => `mobile-link${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          {externalLinks.map(({ href, label }) => (
            <a key={href} href={href} className="mobile-link" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      </div>
      {open && <div className="mobile-overlay" onClick={() => setOpen(false)} />}
    </header>
  )
}
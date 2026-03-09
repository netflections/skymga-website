import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
  { to: '/', label: 'Home', exact: true },
  { to: '/schedule', label: 'Schedule & Events' },
  { to: '/rules', label: 'Rules & Handicaps' },
  { to: '/champions', label: 'Past Champions' },
  { to: '/contact', label: 'Contact & Officers' },
]

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
          <div className="logo-icon">
            <GolfIcon />
          </div>
          <div className="logo-text">
            <span className="logo-main">Sky Meadow</span>
            <span className="logo-sub">Men's Golf Association</span>
          </div>
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
        </nav>
      </div>
      {open && <div className="mobile-overlay" onClick={() => setOpen(false)} />}
    </header>
  )
}

function GolfIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="8" r="5.5" stroke="white" strokeWidth="1.8" fill="none"/>
      <line x1="14" y1="13.5" x2="14" y2="26" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M9 24 Q14 22 19 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

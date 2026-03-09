import { Link } from 'react-router-dom'
import './Home.css'

const quickLinks = [
  {
    icon: '📅',
    title: 'Schedule & Events',
    desc: 'View upcoming tournaments, events, and weekly game dates.',
    to: '/schedule',
  },
  {
    icon: '📋',
    title: 'Rules & Handicaps',
    desc: 'MGA local rules, USGA guidelines, and handicap information.',
    to: '/rules',
  },
  {
    icon: '🏆',
    title: 'Past Champions',
    desc: 'A history of MGA tournament winners and club champions.',
    to: '/champions',
  },
  {
    icon: '📬',
    title: 'Contact & Officers',
    desc: 'Meet the MGA officers and get in touch with the association.',
    to: '/contact',
  },
]

const announcements = [
  {
    date: 'March 2025',
    title: 'Season Opener Registration Now Open',
    body: 'Sign up for the 2025 season opener. Tee times available starting April 19th. Register with the pro shop or contact the MGA President.',
    badge: 'New',
  },
  {
    date: 'February 2025',
    title: '2025 MGA Dues Notice',
    body: 'Annual MGA dues are now due. Please remit payment to the Treasurer by April 1st to be eligible for all 2025 events.',
    badge: null,
  },
  {
    date: 'January 2025',
    title: 'New USGA Handicap System Updates',
    body: 'Reminder that WHS handicap updates go into effect this spring. Please review the updated rules on the Rules & Handicaps page.',
    badge: null,
  },
]

export default function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="container hero-content">
          <div className="hero-eyebrow">Sky Meadow Country Club</div>
          <h1>Men's Golf Association</h1>
          <p className="hero-tagline">
            Camaraderie, competition, and a love of the game.<br />
            Welcome to the Sky Meadow MGA.
          </p>
          <div className="hero-actions">
            <Link to="/schedule" className="btn btn-primary">View Schedule</Link>
            <Link to="/contact" className="btn btn-ghost">Contact Officers</Link>
          </div>
        </div>
        <div className="hero-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 60 L0 30 Q360 0 720 30 Q1080 60 1440 30 L1440 60 Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Quick links */}
      <section className="section quick-links-section">
        <div className="container">
          <div className="text-center mb-lg">
            <h2 className="section-title" style={{textAlign:'center'}}>What's on Your Mind?</h2>
            <div className="divider centered" />
          </div>
          <div className="quick-links-grid">
            {quickLinks.map((item) => (
              <Link key={item.to} to={item.to} className="quick-card">
                <span className="quick-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <span className="quick-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="announcements-section section">
        <div className="container">
          <div className="announce-layout">
            <div className="announce-header">
              <h2 className="section-title">Announcements</h2>
              <div className="divider" />
              <p className="section-subtitle">Latest news from the MGA</p>
            </div>
            <div className="announce-list">
              {announcements.map((item, i) => (
                <article key={i} className="announce-item">
                  <div className="announce-meta">
                    <span className="announce-date">{item.date}</span>
                    {item.badge && <span className="badge badge-blue">{item.badge}</span>}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About strip */}
      <section className="about-strip">
        <div className="container about-strip-inner">
          <div className="about-strip-text">
            <h2>About Sky Meadow MGA</h2>
            <div className="divider" />
            <p>The Sky Meadow Men's Golf Association is open to all male members of Sky Meadow Country Club. We organize weekly events, annual tournaments, and social gatherings throughout the season. Whether you're a scratch golfer or a weekend warrior, the MGA is your home on the course.</p>
            <Link to="/contact" className="btn btn-outline" style={{marginTop:'1.25rem'}}>Meet the Officers</Link>
          </div>
          <div className="about-strip-stats">
            {[
              { num: '100+', label: 'Active Members' },
              { num: '20+', label: 'Annual Events' },
              { num: '18', label: 'Holes of Challenge' },
            ].map((s) => (
              <div key={s.label} className="stat-block">
                <span className="stat-num">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

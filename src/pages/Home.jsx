import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { announcements } from '../data/announcements'
import './Announcements.css'
import './Home.css'

export default function Home() {
  const [optinName, setOptinName] = useState('')
  const [optinEmail, setOptinEmail] = useState('')
  const [optinStatus, setOptinStatus] = useState(null) // null | 'loading' | 'success' | 'error'
  const [optinError, setOptinError] = useState('')

  async function handleOptinSubmit(e) {
    e.preventDefault()
    if (!optinName.trim() || !optinEmail.trim()) {
      setOptinError('Please enter your name and email address.')
      setOptinStatus('error')
      return
    }
    setOptinStatus('loading')
    const { error } = await supabase.functions.invoke('mailerlite-subscribe', {
      body: { name: optinName.trim(), email: optinEmail.trim() },
    })
    if (error) {
      setOptinError('Something went wrong. Please try again.')
      setOptinStatus('error')
    } else {
      setOptinStatus('success')
    }
  }

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
        </div>
        <div className="hero-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 60 L0 30 Q360 0 720 30 Q1080 60 1440 30 L1440 60 Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Announcements + Email Opt-In */}
      <section className="announcements-section section">
        <div className="container">
          <div className="announce-layout">

            <div>
              <h2 className="section-title">Announcements</h2>
              <div className="divider" />
              <p className="section-subtitle">Latest news from the MGA</p>
              <div className="announce-list">
                {announcements.map((item) => (
                  <article key={item.slug} className="announce-item">
                    <div className="announce-meta">
                      <span className="announce-date">{item.date}</span>
                      {item.badge && <span className="badge badge-blue">{item.badge}</span>}
                    </div>
                    <h3 className="announce-item-title">{item.title}</h3>
                    <p className="announce-snippet">{item.snippet}</p>
                    <Link to={`/announcements/${item.slug}`} className="announce-read-more">
                      Read more →
                    </Link>
                  </article>
                ))}
              </div>
            </div>

            <aside className="optin-aside">
              <div className="optin-card card">
                <h3>MGA Email Opt-In</h3>
                <p>Stay up to date with MGA news, event announcements, and results. Enter your information below to join the mailing list.</p>
                {optinStatus === 'success' ? (
                  <p className="optin-success">You're subscribed! Thanks for signing up.</p>
                ) : (
                  <form className="optin-form" onSubmit={handleOptinSubmit}>
                    <div className="optin-field">
                      <label htmlFor="optin-name">Full Name</label>
                      <input
                        id="optin-name"
                        type="text"
                        placeholder="Your full name"
                        value={optinName}
                        onChange={e => setOptinName(e.target.value)}
                      />
                    </div>
                    <div className="optin-field">
                      <label htmlFor="optin-email">Email Address</label>
                      <input
                        id="optin-email"
                        type="email"
                        placeholder="your@email.com"
                        value={optinEmail}
                        onChange={e => setOptinEmail(e.target.value)}
                      />
                    </div>
                    {optinStatus === 'error' && (
                      <p className="optin-error">{optinError}</p>
                    )}
                    <button type="submit" className="btn btn-primary optin-btn" disabled={optinStatus === 'loading'}>
                      {optinStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                    </button>
                  </form>
                )}
              </div>
              <div className="whatsapp-card card">
                <h3>Join the MGA WhatsApp Group</h3>
                <p>Don't want more email? Join the WhatsApp group to keep up with MGA news.</p>
                <a href="https://chat.whatsapp.com/Dl40pN030cfHOPjbcrRhEp?mode=gi_t" target="_blank" rel="noopener noreferrer">
                  <img src="/WhatsApp-QR-Code.png" alt="Scan to join the MGA WhatsApp group" className="whatsapp-qr" />
                </a>
                <a href="https://chat.whatsapp.com/Dl40pN030cfHOPjbcrRhEp?mode=gi_t" target="_blank" rel="noopener noreferrer" className="btn btn-primary whatsapp-btn">
                  Join WhatsApp Group
                </a>
              </div>
            </aside>

          </div>
        </div>
      </section>

    </div>
  )
}

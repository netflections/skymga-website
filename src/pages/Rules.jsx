import { useState } from 'react'
import './Rules.css'

const localRules = [
  {
    title: 'Out of Bounds',
    content: 'White stakes define out of bounds throughout the course. The boundary of the course is also defined by white lines. Players must replay from the original position with a one-stroke penalty.',
  },
  {
    title: 'Penalty Areas',
    content: 'Red and yellow stakes define penalty areas. Red stakes indicate lateral penalty areas; yellow stakes indicate regular penalty areas. Standard relief options under USGA Rules apply.',
  },
  {
    title: 'Immovable Obstructions',
    content: 'Cart paths, drainage areas, and all artificially surfaced roads are immovable obstructions. Free relief is available under Rule 16.1. The nearest point of complete relief must be found.',
  },
  {
    title: 'Embedded Ball',
    content: 'A ball embedded in its own pitch mark in the general area (except in sand) may be lifted, cleaned, and dropped without penalty as near as possible to where it lay, no closer to the hole.',
  },
  {
    title: 'Ground Under Repair',
    content: 'Areas marked with blue stakes or paint are ground under repair. Free relief is available. Players must take relief; play is not permitted from GUR.',
  },
  {
    title: 'Aeration Holes',
    content: 'If a ball comes to rest in an aeration hole, the player may lift, clean, and place the ball in the nearest spot not nearer the hole that avoids the situation, without penalty.',
  },
  {
    title: 'Pace of Play',
    content: 'Ready golf is encouraged. The group ahead is the guide for pace. Groups falling more than one hole behind the group ahead may be asked to skip a hole. Maximum score is double par unless a local event rule applies.',
  },
  {
    title: 'Cell Phones & Rangefinders',
    content: 'Distance-measuring devices are permitted for MGA events. Mobile phones may be used for distance-measuring apps. Phones must be on silent during play.',
  },
]

const handicapFAQ = [
  {
    q: 'How is my World Handicap Index calculated?',
    a: 'Your WHS Handicap Index is calculated from the best 8 of your most recent 20 score differentials. A score differential is calculated as: (Adjusted Gross Score – Course Rating) × 113 ÷ Slope Rating.',
  },
  {
    q: 'How often is my handicap updated?',
    a: 'Handicaps are updated daily as new scores are posted. The USGA/WHS system automatically applies low handicap limits and soft caps as needed.',
  },
  {
    q: 'How do I post a score?',
    a: 'Scores should be posted through the GHIN mobile app or at the terminal in the clubhouse. All 18-hole rounds and 9-hole rounds that complete a combined 18-hole score must be posted.',
  },
  {
    q: 'What is Course Handicap vs. Playing Handicap?',
    a: 'Course Handicap converts your Index to strokes on a specific course/tee. Playing Handicap is the number of handicap strokes you get in a specific format (e.g., 90% in match play).',
  },
  {
    q: 'Do I need to post casual rounds?',
    a: 'Yes. All rounds played under the Rules of Golf should be posted, including casual rounds, nine-hole rounds, and most competitive rounds.',
  },
]

export default function Rules() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1>Rules & Handicaps</h1>
          <p>Sky Meadow MGA local rules, USGA guidelines, and handicap information</p>
        </div>
      </div>

      <section className="section">
        <div className="container rules-layout">
          <div>
            {/* Local Rules */}
            <h2 className="section-title">Local Rules</h2>
            <div className="divider" />
            <p className="section-subtitle">The following local rules are in effect for all MGA events at Sky Meadow.</p>

            <div className="rules-grid">
              {localRules.map((rule) => (
                <div key={rule.title} className="rule-card card">
                  <h3>{rule.title}</h3>
                  <p>{rule.content}</p>
                </div>
              ))}
            </div>

            <div className="usga-notice card">
              <div className="usga-icon">📘</div>
              <div>
                <h3>USGA Rules of Golf</h3>
                <p>All MGA events are played under the Rules of Golf as published by the USGA and R&A, supplemented by these local rules. A complete copy of the Rules is available at the pro shop and at <a href="https://www.usga.org/rules" target="_blank" rel="noopener noreferrer">usga.org/rules</a>.</p>
              </div>
            </div>

            {/* Handicap FAQ */}
            <h2 className="section-title" style={{marginTop:'3rem'}}>Handicap Information</h2>
            <div className="divider" />
            <p className="section-subtitle">Sky Meadow MGA uses the World Handicap System (WHS) administered through GHIN.</p>

            <div className="faq-list">
              {handicapFAQ.map((item, i) => (
                <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                  <button
                    className="faq-question"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>{item.q}</span>
                    <span className="faq-chevron">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && (
                    <div className="faq-answer">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="rules-aside">
            <div className="aside-card card">
              <h3>GHIN App</h3>
              <p>Download the GHIN app to post scores, check your handicap, and view your scoring history from anywhere.</p>
              <div style={{marginTop:'1rem', display:'flex', flexDirection:'column', gap:'0.5rem'}}>
                <a href="https://apps.apple.com/us/app/ghin/id491797390" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{justifyContent:'center'}}>App Store</a>
                <a href="https://play.google.com/store/apps/details?id=com.ghin.ghinmobile" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{justifyContent:'center'}}>Google Play</a>
              </div>
            </div>

            <div className="aside-card card">
              <h3>Quick Reference</h3>
              <dl className="format-glossary">
                <dt>Stroke Index</dt>
                <dd>Listed on the scorecard for each hole (1 = hardest).</dd>
                <dt>Equitable Stroke Control</dt>
                <dd>Maximum score per hole for posting purposes (see GHIN guidelines).</dd>
                <dt>Course Rating</dt>
                <dd>Difficulty rating for a scratch golfer from a specific set of tees.</dd>
                <dt>Slope Rating</dt>
                <dd>Difficulty for a bogey golfer relative to scratch (113 = standard).</dd>
              </dl>
            </div>

            <div className="aside-card card">
              <h3>Questions?</h3>
              <p>Contact the MGA Handicap Chair with questions about posting or your handicap index.</p>
              <a href="/contact" className="btn btn-outline" style={{marginTop:'0.75rem', width:'100%', justifyContent:'center'}}>Contact Officers</a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { announcements } from '../data/announcements'
import './Announcements.css'

export default function Announcements() {
  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1>Announcements</h1>
          <p>News and updates from the Sky Meadow MGA</p>
        </div>
      </div>

      <section className="section">
        <div className="container announce-page-layout">
          <div className="announce-list">
            {announcements.map((item) => (
              <article key={item.slug} className="announce-item">
                <div className="announce-meta">
                  <span className="announce-date">{item.date}</span>
                  {item.badge && <span className="badge badge-blue">{item.badge}</span>}
                </div>
                <h2 className="announce-item-title">{item.title}</h2>
                <p className="announce-snippet">{item.snippet}</p>
                <Link to={`/announcements/${item.slug}`} className="announce-read-more">
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

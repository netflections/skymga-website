import { useParams, Link } from 'react-router-dom'
import { announcements } from '../data/announcements'
import './Announcements.css'

export default function AnnouncementDetail() {
  const { slug } = useParams()
  const item = announcements.find(a => a.slug === slug)

  if (!item) {
    return (
      <div>
        <div className="page-hero">
          <div className="container"><h1>Announcement Not Found</h1></div>
        </div>
        <section className="section">
          <div className="container">
            <Link to="/announcements" className="announce-back">← Back to Announcements</Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1>{item.title}</h1>
          <p>{item.date}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <Link to="/announcements" className="announce-back">← Back to Announcements</Link>

          <article className="announce-detail card">
            {item.body.map((block, i) => {
              if (block.type === 'text') {
                return <p key={i}>{block.content}</p>
              }
              if (block.type === 'link') {
                return (
                  <p key={i}>
                    <a href={block.href} target="_blank" rel="noopener noreferrer" className="announce-link">
                      {block.label}
                    </a>
                  </p>
                )
              }
              if (block.type === 'signature') {
                return (
                  <div key={i} className="announce-signature">
                    <p>Best,</p>
                    <p><strong>{block.name}</strong></p>
                    <p>{block.title}</p>
                  </div>
                )
              }
              return null
            })}
          </article>
        </div>
      </section>
    </div>
  )
}

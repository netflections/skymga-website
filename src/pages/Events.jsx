import { Link } from 'react-router-dom'
import './Schedule.css'

const events2026 = [
  { date: 'Sat, May 23',        name: '1-Day Member-Member',      link: '/events/member-member-1day' },
  { date: 'Sat–Sun, Jun 6–7',   name: 'Sr. Club Championship',    link: '/events/sr-club-championship' },
  { date: 'Sat, Jun 27',        name: '1-Day Member-Guest',       link: '/events/member-guest-1day' },
  { date: 'Thu–Sat, Jul 16–18', name: "Gentlemen's Invitational", link: '/events/gentlemens-invitational' },
  { date: 'Fri–Sun, Aug 14–16', name: "Men's Club Championship",  link: '/events/mens-club-championship' },
  { date: 'Sat–Sun, Sep 26–27', name: 'Member-Member',            link: '/events/member-member' },
]

export default function Events() {
  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1>Events</h1>
          <p>2026 Sky Meadow MGA Events</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="section-title">2026 Events</h2>
          <div className="divider" />

          <div className="table-wrap card">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Event</th>
                </tr>
              </thead>
              <tbody>
                {events2026.map((e, i) => (
                  <tr key={i}>
                    <td className="date-cell">{e.date}</td>
                    <td className="event-name">
                      <Link to={e.link} className="event-link">{e.name}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}

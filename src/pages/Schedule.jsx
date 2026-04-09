import { Link } from 'react-router-dom'
import './Schedule.css'

const schedule2026 = [
  { date: 'Tue, Apr 7',         name: 'Opening Night',             notes: 'Banquet Hall @ 7pm',   link: null },
  { date: 'Sat, May 30',        name: '1-Day Member-Member',       notes: '',                     link: '/events/member-member-1day' },
  { date: 'Sat–Sun, Jun 6–7',   name: 'Sr. Club Championship',     notes: '',                     link: '/events/sr-club-championship' },
  { date: 'Sat, Jun 27',        name: '1-Day Member-Guest',        notes: '',                     link: '/events/member-guest-1day' },
  { date: 'Thu–Sat, Jul 16–18', name: "Gentlemen's Invitational",  notes: '',                     link: '/events/gentlemens-invitational' },
  { date: 'Fri–Sun, Aug 14–16', name: "Men's Club Championship",   notes: '',                     link: '/events/mens-club-championship' },
  { date: 'TBD',                name: 'Pairings Party',            notes: '',                     link: null },
  { date: 'Sat–Sun, Sep 26–27', name: 'Member-Member',             notes: '',                     link: '/events/member-member' },
  { date: 'TBD',                name: 'MGA Holiday Party',         notes: '',                     link: null },
]

export default function Schedule() {
  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1>2026 Schedule</h1>
          <p>Sky Meadow MGA 2026 Calendar</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="section-title">2026 Schedule</h2>
          <div className="divider" />

          <div className="table-wrap card">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Event</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {schedule2026.map((e, i) => (
                  <tr key={i}>
                    <td className="date-cell">{e.date}</td>
                    <td className="event-name">
                      {e.link ? <Link to={e.link} className="event-link">{e.name}</Link> : e.name}
                    </td>
                    <td className="notes-cell">{e.notes}</td>
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

import './Schedule.css'

const events2025 = [
  { date: 'Apr 19', name: 'Season Opener — Best Ball', format: 'Best Ball', notes: 'Two-man teams' },
  { date: 'May 3', name: 'Spring Invitational', format: 'Stroke Play', notes: 'Open to MGA members' },
  { date: 'May 17', name: 'Member-Guest Tournament', format: 'Best Ball', notes: 'Invite a guest' },
  { date: 'Jun 7', name: 'Club Championship — Round 1', format: 'Stroke Play', notes: 'Gross & Net divisions' },
  { date: 'Jun 8', name: 'Club Championship — Round 2', format: 'Stroke Play', notes: 'Gross & Net divisions' },
  { date: 'Jun 21', name: 'Longest Day Classic', format: 'Stableford', notes: 'Solstice event' },
  { date: 'Jul 12', name: 'Summer Scramble', format: 'Scramble', notes: '4-man teams' },
  { date: 'Jul 26', name: 'Mid-Summer Classic', format: 'Match Play', notes: 'Bracket draw at event' },
  { date: 'Aug 9', name: 'Member-Member', format: 'Best Ball', notes: 'MGA members only' },
  { date: 'Aug 23', name: 'Dog Days Open', format: 'Stroke Play', notes: 'Net & Gross prizes' },
  { date: 'Sep 6', name: 'Labor Day Classic', format: 'Scramble', notes: '2-man teams' },
  { date: 'Sep 20', name: 'Fall Classic', format: 'Stableford', notes: '' },
  { date: 'Oct 4', name: 'Season Finale', format: 'Best Ball', notes: 'Awards to follow' },
]

const formatBadge = {
  'Best Ball': 'badge-blue',
  'Stroke Play': 'badge-gold',
  'Scramble': 'badge-blue',
  'Stableford': 'badge-gold',
  'Match Play': 'badge-blue',
}

export default function Schedule() {
  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1>Schedule & Events</h1>
          <p>2025 Sky Meadow MGA Tournament & Events Calendar</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="schedule-layout">
            {/* Main schedule */}
            <div className="schedule-main">
              <h2 className="section-title">2025 Tournament Schedule</h2>
              <div className="divider" />
              <p className="section-subtitle">All events begin at 8:00 AM shotgun unless otherwise noted. Registration closes one week prior.</p>

              <div className="table-wrap card">
                <table className="styled-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Event</th>
                      <th>Format</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events2025.map((e, i) => (
                      <tr key={i}>
                        <td className="date-cell">{e.date}</td>
                        <td className="event-name">{e.name}</td>
                        <td>
                          <span className={`badge ${formatBadge[e.format] || 'badge-blue'}`}>
                            {e.format}
                          </span>
                        </td>
                        <td className="notes-cell">{e.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="schedule-aside">
              <div className="aside-card card">
                <h3>Weekly Games</h3>
                <p>MGA weekly games are held every Saturday morning throughout the season. Sign up at the pro shop by Friday evening.</p>
                <ul className="aside-list">
                  <li>🕗 Tee times: 7:30–9:00 AM</li>
                  <li>📍 1st tee</li>
                  <li>💵 Entry: $5 + greens fee</li>
                  <li>📞 Pro shop: sign up required</li>
                </ul>
              </div>

              <div className="aside-card card">
                <h3>Registration</h3>
                <p>To register for MGA events, contact the pro shop or email the MGA Tournament Director.</p>
                <a href="/contact" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
                  Contact Officers
                </a>
              </div>

              <div className="aside-card card">
                <h3>Formats Explained</h3>
                <dl className="format-glossary">
                  <dt>Best Ball</dt>
                  <dd>Each player plays their own ball; team uses the lowest score on each hole.</dd>
                  <dt>Scramble</dt>
                  <dd>All players hit from the best shot location until the ball is holed.</dd>
                  <dt>Stableford</dt>
                  <dd>Points awarded based on score relative to par on each hole.</dd>
                  <dt>Match Play</dt>
                  <dd>Holes won/lost determine the winner, not total strokes.</dd>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}

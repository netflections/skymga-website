import './Event.css'

export default function MemberMember() {
  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1>Member-Member</h1>
          <p>Saturday–Sunday, September 26–27, 2026 &mdash; 8:30 AM Shotgun</p>
        </div>
      </div>

      <section className="section">
        <div className="container">

          <div className="event-highlight card">
            <strong>Pairings Party &amp; Live Auction</strong> — TBD
          </div>

          <div className="event-grid">

            <div className="event-card card">
              <h3>Format</h3>
              <ul className="event-list">
                <li><strong>Saturday</strong></li>
                <li>Front 9: Best Ball</li>
                <li>Back 9: Scramble</li>
                <li style={{ marginTop: '0.5rem' }}><strong>Sunday</strong></li>
                <li>Front 9: Modified Chapman</li>
                <li>Back 9: Best Ball</li>
              </ul>
            </div>

            <div className="event-card card">
              <h3>Handicaps</h3>
              <ul className="event-list">
                <li><strong>Best Ball:</strong> 85%</li>
                <li><strong>Modified Chapman:</strong> 60% of lower + 40% of higher ÷ 2</li>
                <li><strong>Scramble:</strong> 50% of the average</li>
              </ul>
            </div>

            <div className="event-card card">
              <h3>Ties</h3>
              <p>Sudden Death Best Ball starting on Hole 15</p>
            </div>

            <div className="event-card card">
              <h3>Pace of Play</h3>
              <p>Please keep up with the group ahead</p>
            </div>

            <div className="event-card card event-card--full">
              <h3>Special Rules</h3>
              <ul className="event-list event-list--columns">
                <li>Replace all divots, rake bunkers, repair ball marks</li>
                <li>Cart path only on all par 3s</li>
                <li>Carts: 90 degree rule</li>
                <li>Return scorecards to the golf shop</li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

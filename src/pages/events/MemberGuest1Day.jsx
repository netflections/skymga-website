import './Event.css'

export default function MemberGuest1Day() {
  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1>1-Day Member-Guest</h1>
          <p>Saturday, June 27, 2026</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="event-grid">

            <div className="event-card card">
              <h3>Schedule</h3>
              <ul className="event-list event-schedule">
                <li><span className="event-time">7:30 AM</span> Breakfast</li>
                <li><span className="event-time">8:30 AM</span> Shotgun Start</li>
                <li><span className="event-time">1:30 PM</span> Lunch &amp; Awards After the Round</li>
              </ul>
            </div>

            <div className="event-card card">
              <h3>Format — 6/6/6</h3>
              <ul className="event-list">
                <li>Holes 1–6: Alt-Shot</li>
                <li>Holes 7–12: Scramble</li>
                <li>Holes 13–18: Best Ball</li>
                <li>Prizes for Net Winners</li>
              </ul>
            </div>

            <div className="event-card card">
              <h3>Contests</h3>
              <ul className="event-list">
                <li>Closest to the Pin: Holes 2, 6, 11, 17</li>
                <li>Men's Long Drive: Hole 15</li>
                <li>Women's Long Drive: Hole 3</li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

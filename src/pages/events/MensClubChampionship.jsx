import './Event.css'

export default function MensClubChampionship() {
  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1>Men's Club Championship</h1>
          <p>Friday–Sunday, August 14–16, 2026</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="event-grid">

            <div className="event-card card">
              <h3>Divisions</h3>
              <ul className="event-list">
                <li>Gross Division: Friday 8/14 – Sunday 8/16</li>
                <li>Net Division: Saturday 8/15 – Sunday 8/16</li>
              </ul>
            </div>

            <div className="event-card card">
              <h3>Tee Times</h3>
              <ul className="event-list">
                <li>Friday: 1:30 PM</li>
                <li>Saturday &amp; Sunday: 7:30 AM</li>
              </ul>
            </div>

            <div className="event-card card">
              <h3>Tees</h3>
              <ul className="event-list">
                <li>Gross: Black</li>
                <li>Net: White</li>
              </ul>
            </div>

            <div className="event-card card">
              <h3>Format</h3>
              <ul className="event-list">
                <li>Gross + Net Stroke Play</li>
                <li>Gross + Net Skins</li>
              </ul>
            </div>

            <div className="event-card card event-card--full">
              <h3>2024 Champions</h3>
              <ul className="event-list">
                <li><strong>Gross:</strong> Mike Schnyer (76/83/74 — 233, +17)</li>
                <li><strong>Net:</strong> Scott Hanley (70/73 — 143, -1)</li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

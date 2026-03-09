import './Contact.css'

const officers = [
  {
    role: 'President',
    name: 'Tom Donovan',
    email: 'president@skymga.org',
    responsibilities: 'Oversees all MGA activities, chairs monthly meetings, liaison to Club management.',
  },
  {
    role: 'Vice President',
    name: 'Mike Sullivan',
    email: 'vicepresident@skymga.org',
    responsibilities: 'Assists the President; manages event volunteer coordination.',
  },
  {
    role: 'Secretary',
    name: 'Paul Arsenault',
    email: 'secretary@skymga.org',
    responsibilities: 'Meeting minutes, member communications, website updates.',
  },
  {
    role: 'Treasurer',
    name: 'Rich Fontaine',
    email: 'treasurer@skymga.org',
    responsibilities: 'Manages MGA finances, collects dues, handles prize payouts.',
  },
  {
    role: 'Tournament Director',
    name: 'Brian Callahan',
    email: 'tournaments@skymga.org',
    responsibilities: 'Plans and runs all MGA tournaments and weekly events.',
  },
  {
    role: 'Handicap Chair',
    name: 'Dave Sullivan',
    email: 'handicaps@skymga.org',
    responsibilities: 'Oversees GHIN administration, handicap inquiries, posting compliance.',
  },
]

export default function Contact() {
  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1>Contact & Officers</h1>
          <p>Meet the 2025 Sky Meadow MGA Officer Board</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-layout">
            <div>
              <h2 className="section-title">2025 Officer Board</h2>
              <div className="divider" />
              <p className="section-subtitle">Contact any officer directly via email. For general inquiries, reach the Secretary.</p>

              <div className="officers-grid">
                {officers.map((officer) => (
                  <div key={officer.role} className="officer-card card">
                    <div className="officer-avatar">
                      {officer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="officer-info">
                      <div className="officer-role">{officer.role}</div>
                      <div className="officer-name">{officer.name}</div>
                      <p className="officer-responsibilities">{officer.responsibilities}</p>
                      <a href={`mailto:${officer.email}`} className="officer-email">
                        ✉ {officer.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="contact-aside">
              <div className="contact-card card">
                <h3>Sky Meadow Country Club</h3>
                <address className="club-address">
                  <p>Nashua, New Hampshire</p>
                  <p>
                    <a href="https://skymeadow.com" target="_blank" rel="noopener noreferrer">
                      skymeadow.com
                    </a>
                  </p>
                  <p>Pro Shop: contact via club website</p>
                </address>
              </div>

              <div className="contact-card card">
                <h3>MGA Meetings</h3>
                <p>The MGA Board meets monthly during the golf season. Meetings are open to all MGA members.</p>
                <ul className="meeting-list">
                  <li>📅 First Tuesday of each month</li>
                  <li>🕖 6:30 PM</li>
                  <li>📍 Clubhouse — Main Dining Room</li>
                </ul>
              </div>

              <div className="contact-card card">
                <h3>Membership</h3>
                <p>MGA membership is open to all male members of Sky Meadow Country Club. Annual dues are collected each spring.</p>
                <a href={`mailto:treasurer@skymga.org`} className="btn btn-primary" style={{marginTop:'1rem', width:'100%', justifyContent:'center'}}>
                  Contact Treasurer
                </a>
              </div>

              <div className="contact-card card">
                <h3>Website Issues</h3>
                <p>To report errors or request updates to the website, contact the Secretary.</p>
                <a href={`mailto:secretary@skymga.org`} className="btn btn-outline" style={{marginTop:'0.75rem', width:'100%', justifyContent:'center'}}>
                  Email Secretary
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}

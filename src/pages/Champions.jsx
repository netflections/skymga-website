import { useState } from 'react'
import './Champions.css'

const clubChampions = [
  { year: 2024, gross: 'John Harrington', net: 'Mike Sullivan', notes: '' },
  { year: 2023, gross: 'Brian Callahan', net: 'Tom Donovan', notes: '' },
  { year: 2022, gross: 'Steve Martello', net: 'Rich Fontaine', notes: '' },
  { year: 2021, gross: 'John Harrington', net: 'Paul Arsenault', notes: '' },
  { year: 2020, gross: 'Dan Kowalski', net: 'Bill Murphy', notes: 'COVID-modified format' },
  { year: 2019, gross: 'Chris LeBlanc', net: 'Frank DeMarco', notes: '' },
  { year: 2018, gross: 'Brian Callahan', net: 'Rick Moreau', notes: '' },
  { year: 2017, gross: 'John Harrington', net: 'Dave Sullivan', notes: '' },
  { year: 2016, gross: 'Steve Martello', net: 'Tom Donovan', notes: '' },
  { year: 2015, gross: 'Mike Walsh', net: 'Paul Arsenault', notes: '' },
  { year: 2014, gross: 'Chris LeBlanc', net: 'Rich Fontaine', notes: '' },
  { year: 2013, gross: 'Dan Kowalski', net: 'Bill Murphy', notes: '' },
  { year: 2012, gross: 'Brian Callahan', net: 'Jim Hanlon', notes: '' },
  { year: 2011, gross: 'Steve Martello', net: 'Frank DeMarco', notes: '' },
  { year: 2010, gross: 'John Harrington', net: 'Dave Sullivan', notes: '' },
]

const tournamentChampions = {
  'Member-Member': [
    { year: 2024, winner: 'Harrington / Sullivan' },
    { year: 2023, winner: 'Callahan / Moreau' },
    { year: 2022, winner: 'LeBlanc / Donovan' },
    { year: 2021, winner: 'Martello / Murphy' },
    { year: 2020, winner: 'Not held (COVID)' },
    { year: 2019, winner: 'Kowalski / Arsenault' },
  ],
  'Member-Guest': [
    { year: 2024, winner: 'Fontaine / Guest R. Fontaine' },
    { year: 2023, winner: 'Walsh / Guest P. Walsh' },
    { year: 2022, winner: 'Harrington / Guest T. Harrington' },
    { year: 2021, winner: 'DeMarco / Guest A. DeMarco' },
    { year: 2020, winner: 'Not held (COVID)' },
    { year: 2019, winner: 'Sullivan / Guest B. Sullivan' },
  ],
  'Summer Scramble': [
    { year: 2024, winner: 'Team Callahan' },
    { year: 2023, winner: 'Team Martello' },
    { year: 2022, winner: 'Team Donovan' },
    { year: 2021, winner: 'Team LeBlanc' },
    { year: 2020, winner: 'Not held (COVID)' },
    { year: 2019, winner: 'Team Kowalski' },
  ],
}

export default function Champions() {
  const [activeTab, setActiveTab] = useState('Member-Member')

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1>Past Champions</h1>
          <p>A history of excellence on the fairways of Sky Meadow</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Club Champions table */}
          <h2 className="section-title">Club Championship</h2>
          <div className="divider" />
          <p className="section-subtitle">Annual Club Championship — Gross and Net Division Winners</p>

          {/* Hall of fame highlight */}
          <div className="champions-spotlight">
            <div className="spotlight-label">Most Club Championships</div>
            <div className="spotlight-name">John Harrington</div>
            <div className="spotlight-detail">4× Gross Champion · 2010, 2011, 2017, 2021, 2024</div>
          </div>

          <div className="table-wrap card" style={{marginTop:'1.5rem'}}>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Gross Champion</th>
                  <th>Net Champion</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {clubChampions.map((row) => (
                  <tr key={row.year} className={row.year === 2024 ? 'latest-year' : ''}>
                    <td className="year-cell">
                      {row.year === 2024 && <span className="badge badge-gold" style={{marginRight:'0.4rem'}}>Latest</span>}
                      {row.year}
                    </td>
                    <td className="champion-name">{row.gross}</td>
                    <td className="champion-name">{row.net}</td>
                    <td style={{fontSize:'0.85rem',color:'var(--gray-600)'}}>{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tournament Champions */}
          <h2 className="section-title" style={{marginTop:'3rem'}}>Tournament Champions</h2>
          <div className="divider" />

          <div className="tabs">
            {Object.keys(tournamentChampions).map((t) => (
              <button
                key={t}
                className={`tab-btn${activeTab === t ? ' active' : ''}`}
                onClick={() => setActiveTab(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="table-wrap card" style={{marginTop:'1rem'}}>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Champion(s)</th>
                </tr>
              </thead>
              <tbody>
                {tournamentChampions[activeTab].map((row) => (
                  <tr key={row.year}>
                    <td className="year-cell">{row.year}</td>
                    <td className="champion-name">{row.winner}</td>
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

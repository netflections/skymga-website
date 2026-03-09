import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          <div className="footer-brand">
            <h3>Sky Meadow MGA</h3>
            <p>Men's Golf Association at Sky Meadow Country Club, Nashua, NH. Fostering camaraderie and competition among members since our founding.</p>
          </div>

          <div className="footer-nav">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/schedule">Schedule & Events</Link></li>
              <li><Link to="/rules">Rules & Handicaps</Link></li>
              <li><Link to="/champions">Past Champions</Link></li>
              <li><Link to="/contact">Contact & Officers</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Sky Meadow Country Club</h4>
            <address>
              <p>Nashua, NH</p>
              <p><a href="https://skymeadow.com" target="_blank" rel="noopener noreferrer">skymeadow.com</a></p>
            </address>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {year} Sky Meadow Men's Golf Association. All rights reserved.</p>
          <p>Site maintained by the MGA Officers.</p>
        </div>
      </div>
    </footer>
  )
}

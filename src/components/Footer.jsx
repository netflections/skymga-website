import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-bottom">
        <div className="container">
          <p>© {year} Sky Meadow Men's Golf Association. All rights reserved.</p>
          <p>Site maintained by the MGA Officers.</p>
        </div>
      </div>
    </footer>
  )
}

export default function Bylaws() {
  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1>Bylaws</h1>
          <p>Sky Meadow Men's Golf Association</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="section-title">MGA Bylaws</h2>
          <div className="divider" />
          <iframe
            src="/MGA_Bylaws_DRAFT.pdf"
            title="MGA Bylaws"
            width="100%"
            height="900px"
            style={{ border: 'none', display: 'block', marginTop: '1.5rem' }}
          />
          <p style={{ marginTop: '1rem', textAlign: 'center' }}>
            <a href="/MGA_Bylaws_DRAFT.pdf" target="_blank" rel="noopener noreferrer">
              Open PDF in new tab
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}

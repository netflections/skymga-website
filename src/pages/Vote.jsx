import './Vote.css'

const BALLOT_NAME = '2026 MGA Board Election'
const BALLOT_DESCRIPTION = "The 2026 MGA Board will consist of five (5) members: Mike Cattell plus the four (4) members who receive the most votes. The Board's initial responsibilities will be to finalize and ratify the proposed bylaws (an initial draft is posted on www.skymga.org) which includes clearly defined responsibilities for the individual board roles and committees, and which determine which role each Board member will fulfill based upon the aptitude and experience. This will be immediately followed by engaging with any and all other volunteers from the MGA for initiatives for the 2026 season.\n\nEach MGA member may submit one (1) ballot containing up to four (4) votes."
const VOTING_END = '2026-04-03T21:00:00+00:00'

const RESULTS = [
  { name: 'Rob Azevedo', votes: 76 },
  { name: 'Dann Gardner', votes: 73 },
  { name: "Mike O'Keefe", votes: 69 },
  { name: 'Anil Patel', votes: 60 },
  { name: 'Chris Butcher', votes: 23 },
  { name: 'Patrick McNickel', votes: 22 },
  { name: 'Jake Gottlieb', votes: 18 },
  { name: 'Craig Gilroy', votes: 10 },
]

function formatDate(iso) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', timeZoneName: 'short',
  })
}

export default function Vote() {
  const max = RESULTS[0].votes

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1>Member Voting</h1>
          <p>Sky Meadow MGA election results</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="section-title">{BALLOT_NAME}</h2>
          <div className="divider" />
          <p className="ballot-description">{BALLOT_DESCRIPTION}</p>

          <p className="vote-status-msg closed">
            Voting for this ballot closed on {formatDate(VOTING_END)}.
          </p>

          <div className="results-section">
            <h2 className="section-title">Final Results</h2>
            <div className="divider" />
            <table className="styled-table results-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Candidate</th>
                  <th>Votes</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {RESULTS.map((row, i) => (
                  <tr key={row.name}>
                    <td className="result-rank">#{i + 1}</td>
                    <td>{row.name}</td>
                    <td>{row.votes}</td>
                    <td className="result-bar-cell">
                      <div className="result-bar">
                        <div
                          className="result-bar-fill"
                          style={{ width: `${(row.votes / max) * 100}%` }}
                        />
                      </div>
                    </td>
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

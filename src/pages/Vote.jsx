import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import './Vote.css'

function getBallotStatus(ballot) {
  if (!ballot.is_active) return 'inactive'
  const now = new Date()
  if (now < new Date(ballot.voting_start)) return 'upcoming'
  if (now > new Date(ballot.voting_end)) return 'closed'
  return 'open'
}

function formatDate(iso) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', timeZoneName: 'short',
  })
}

function CandidateCard({ candidate, selected, onToggle, disabled }) {
  return (
    <div
      className={`candidate-card card${selected ? ' selected' : ''}${disabled ? ' disabled' : ''}`}
      onClick={() => !disabled && onToggle(candidate.id)}
      role="checkbox"
      aria-checked={selected}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={e => { if (!disabled && (e.key === ' ' || e.key === 'Enter')) onToggle(candidate.id) }}
    >
      <div className="candidate-check">{selected ? '✓' : ''}</div>
      <div className="candidate-info">
        <div className="candidate-name">{candidate.name}</div>
        <div className="candidate-message">{candidate.message}</div>
      </div>
    </div>
  )
}

function BallotResults({ ballotId, finalized }) {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from(finalized ? 'ballot_results_certified' : 'ballot_results')
      .select('*')
      .eq('ballot_id', ballotId)
      .order('vote_count', { ascending: false })
      .then(({ data }) => {
        setResults(data || [])
        setLoading(false)
      })
  }, [ballotId, finalized])

  if (loading) return <p className="vote-status-msg">Loading results...</p>
  if (!results.length) return <p className="vote-status-msg">No results available.</p>

  const max = results[0]?.vote_count || 1

  return (
    <div className="results-section">
      <h2 className="section-title">{finalized ? 'Final Results' : 'Preliminary Results'}</h2>
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
          {results.map((row, i) => (
            <tr key={row.candidate_id}>
              <td className="result-rank">#{i + 1}</td>
              <td>{row.candidate_name}</td>
              <td>{row.vote_count}</td>
              <td className="result-bar-cell">
                <div className="result-bar">
                  <div
                    className="result-bar-fill"
                    style={{ width: `${(row.vote_count / max) * 100}%` }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Vote() {
  const [ballots, setBallots] = useState([])
  const [activeBallotId, setActiveBallotId] = useState(null)
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [voterInfo, setVoterInfo] = useState({ name: '', email: '', memberNumber: '' })
  const [phase, setPhase] = useState('voting') // 'voting' | 'confirming' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [acknowledged, setAcknowledged] = useState(false)
  const [confirmedUnderVote, setConfirmedUnderVote] = useState(false)
  const [dialogError, setDialogError] = useState('')
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('ballots')
      .select('*, candidates(*)')
      .eq('is_active', true)
      .then(({ data }) => {
        if (data && data.length) {
          const sorted = data.map(b => {
            const shuffled = [...b.candidates]
            for (let i = shuffled.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
            }
            return { ...b, candidates: shuffled }
          })
          setBallots(sorted)
          setActiveBallotId(sorted[0].id)
        }
        setDataLoading(false)
      })
  }, [])

  const activeBallot = ballots.find(b => b.id === activeBallotId)
  const ballotStatus = activeBallot ? getBallotStatus(activeBallot) : null
  const votesPerMember = activeBallot?.votes_per_member ?? 0
  const candidates = activeBallot?.candidates ?? []

  function toggleCandidate(id) {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else if (next.size < votesPerMember) {
        next.add(id)
      }
      return next
    })
  }

  function handleVoterInfo(e) {
    setVoterInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmitClick() {
    if (!voterInfo.name.trim() || !voterInfo.email.trim() || !voterInfo.memberNumber.trim()) {
      setErrorMessage('Please fill in your name, email address, and member number.')
      setPhase('error')
      return
    }
    if (selectedIds.size < 1) {
      setErrorMessage('Please select at least one candidate.')
      setPhase('error')
      return
    }
    setPhase('confirming')
  }

  async function handleConfirmSubmit() {
    const underVoting = selectedIds.size < votesPerMember
    if (underVoting && !confirmedUnderVote) {
      setDialogError(`Please confirm that you only want to vote for ${selectedIds.size} candidate${selectedIds.size !== 1 ? 's' : ''}.`)
      return
    }
    if (!acknowledged) {
      setDialogError('Please acknowledge that you are a member of the Sky Meadow Men\'s Golf Association.')
      return
    }
    setDialogError('')
    setLoading(true)
    const selectedNames = candidates
      .filter(c => selectedIds.has(c.id))
      .map(c => c.name)

    const { error } = await supabase.from('votes').insert({
      ballot_id: activeBallotId,
      voter_name: voterInfo.name.trim(),
      voter_email: voterInfo.email.trim().toLowerCase(),
      member_number: voterInfo.memberNumber.trim(),
      selected_candidates: selectedNames,
    })

    setLoading(false)

    if (!error) {
      setPhase('success')
      supabase.functions.invoke('send-vote-confirmation', {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: {
          voterName: voterInfo.name.trim(),
          voterEmail: voterInfo.email.trim().toLowerCase(),
          ballotName: activeBallot.name,
          selectedCandidates: selectedNames,
          submittedAt: new Date().toISOString(),
        },
      })
      return
    }

    setPhase('error')
    if (error.code === '23505') {
      setErrorMessage('This member has already voted on this ballot.')
    } else {
      setErrorMessage('Something went wrong submitting your vote. Please try again.')
    }
  }

  if (dataLoading) {
    return (
      <div>
        <div className="page-hero">
          <div className="container"><h1>Member Voting</h1></div>
        </div>
        <section className="section"><div className="container"><p>Loading...</p></div></section>
      </div>
    )
  }

  if (!activeBallot) {
    return (
      <div>
        <div className="page-hero">
          <div className="container"><h1>Member Voting</h1></div>
        </div>
        <section className="section">
          <div className="container">
            <p className="vote-status-msg">There are no active ballots at this time.</p>
          </div>
        </section>
      </div>
    )
  }

  const selectedCandidates = candidates.filter(c => selectedIds.has(c.id))

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1>Member Voting</h1>
          <p>Cast your vote for Sky Meadow MGA elections</p>
        </div>
      </div>

      <section className="section">
        <div className="container">

          {/* Ballot selector */}
          {ballots.length > 1 && (
            <div className="ballot-selector">
              <label htmlFor="ballot-select">Select Ballot</label>
              <select
                id="ballot-select"
                value={activeBallotId}
                onChange={e => {
                  setActiveBallotId(e.target.value)
                  setSelectedIds(new Set())
                  setPhase('voting')
                  setAcknowledged(false)
                  setConfirmedUnderVote(false)
                }}
              >
                {ballots.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
          )}

          <h2 className="section-title">{activeBallot.name}</h2>
          <div className="divider" />
          {activeBallot.description && (
            <p className="ballot-description">{activeBallot.description}</p>
          )}

          {/* Upcoming */}
          {ballotStatus === 'upcoming' && (
            <p className="vote-status-msg">
              Voting opens on {formatDate(activeBallot.voting_start)}.
            </p>
          )}

          {/* Inactive */}
          {ballotStatus === 'inactive' && (
            <p className="vote-status-msg">This ballot is not currently available.</p>
          )}

          {/* Closed — show results */}
          {ballotStatus === 'closed' && (
            <>
              <p className="vote-status-msg closed">
                Voting for this ballot closed on {formatDate(activeBallot.voting_end)}.
              </p>
              <BallotResults ballotId={activeBallotId} finalized={activeBallot.results_finalized} />
            </>
          )}

          {/* Success screen */}
          {ballotStatus === 'open' && phase === 'success' && (
            <div className="vote-success card">
              <div className="success-icon">✓</div>
              <h3>Your vote has been recorded!</h3>
              <p>Thank you for participating in the {activeBallot.name}.</p>
            </div>
          )}

          {/* Voting form */}
          {ballotStatus === 'open' && phase !== 'success' && (
            <>
              <p className="ballot-window">
                Voting open: {formatDate(activeBallot.voting_start)} – {formatDate(activeBallot.voting_end)}
              </p>

              <div className="selection-counter">
                <p className="selection-instructions">You may select up to {votesPerMember} candidate{votesPerMember !== 1 ? 's' : ''}.</p>
                <span className={selectedIds.size === votesPerMember ? 'counter-full' : ''}>
                  {selectedIds.size} of {votesPerMember} selected
                </span>
              </div>

              <div className="candidate-grid">
                {candidates.map(c => (
                  <CandidateCard
                    key={c.id}
                    candidate={c}
                    selected={selectedIds.has(c.id)}
                    onToggle={toggleCandidate}
                    disabled={!selectedIds.has(c.id) && selectedIds.size >= votesPerMember}
                  />
                ))}
              </div>

              <div className="voter-form card">
                <h3>Your Information</h3>
                <p className="form-note">All fields are required.</p>

                <div className="form-fields">
                  <div className="form-field">
                    <label htmlFor="voter-name">Full Name</label>
                    <input
                      id="voter-name"
                      name="name"
                      type="text"
                      value={voterInfo.name}
                      onChange={handleVoterInfo}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="voter-email">Email Address</label>
                    <input
                      id="voter-email"
                      name="email"
                      type="email"
                      value={voterInfo.email}
                      onChange={handleVoterInfo}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="voter-member">Member Number</label>
                    <input
                      id="voter-member"
                      name="memberNumber"
                      type="text"
                      value={voterInfo.memberNumber}
                      onChange={handleVoterInfo}
                      placeholder="Your member number"
                    />
                  </div>
                </div>
              </div>

              {phase === 'error' && (
                <div className="vote-error">{errorMessage}</div>
              )}

              <div className="submit-bar">
                <button
                  className="btn btn-primary"
                  onClick={handleSubmitClick}
                  disabled={selectedIds.size < 1}
                >
                  Review & Submit My Vote
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Confirmation dialog */}
      {phase === 'confirming' && (
        <div className="dialog-overlay" onClick={() => setPhase('voting')}>
          <div className="dialog-box card" onClick={e => e.stopPropagation()}>
            <h3>Confirm Your Vote</h3>
            <p className="dialog-subtitle">{activeBallot.name}</p>

            <div className="dialog-section">
              <p className="dialog-label">Your selections:</p>
              <ul className="dialog-candidates">
                {selectedCandidates.map(c => (
                  <li key={c.id}>{c.name}</li>
                ))}
              </ul>
            </div>

            <div className="dialog-section">
              <p className="dialog-label">Submitting as:</p>
              <p>{voterInfo.name} &middot; {voterInfo.email} &middot; Member #{voterInfo.memberNumber}</p>
            </div>

            {selectedIds.size < votesPerMember && (
              <label className="dialog-acknowledge">
                <input
                  type="checkbox"
                  checked={confirmedUnderVote}
                  onChange={e => { setConfirmedUnderVote(e.target.checked); setDialogError('') }}
                />
                <span>I only want to vote for {selectedIds.size} candidate{selectedIds.size !== 1 ? 's' : ''}.</span>
              </label>
            )}

            <label className="dialog-acknowledge">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={e => { setAcknowledged(e.target.checked); setDialogError('') }}
              />
              <span>I am a member of the Sky Meadow Men's Golf Association.</span>
            </label>

            {dialogError && (
              <div className="vote-error">{dialogError}</div>
            )}

            <div className="dialog-actions">
              <button className="btn btn-outline" onClick={() => { setPhase('voting'); setAcknowledged(false); setConfirmedUnderVote(false); setDialogError('') }}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleConfirmSubmit}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit My Vote'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import { useState, useEffect } from 'react'
import './HandicapEtiquette.css'

const TABS = [
  { id: 'overview', label: 'Committee Overview' },
  { id: 'etiquette', label: 'Course Etiquette' },
  { id: 'policy', label: 'Handicap Policy' },
  { id: 'contact', label: 'Contact' },
]

const COMMITTEE = [
  { role: 'Committee Chair', name: "Mike O'Keefe" },
  { role: 'Member-at-Large', name: 'Chris Butcher' },
  { role: 'Member-at-Large', name: 'Anil Patel' },
  { role: 'Member-at-Large', name: 'Tim Tiches' },
  { role: 'Member-at-Large', name: 'Joe Turner' },
]

const SUBJECTS = [
  'Handicap Index Question',
  'Score Submission Question',
  'Handicap Adjustment / Review',
  'Appeal — Handicap Decision',
  'Course Etiquette Concern',
  'Rules of Golf Question',
  'Report a Conduct Issue',
  'Other',
]

const COMMITTEE_EMAIL = 'handicap@skymga.org'

export default function HandicapEtiquette() {
  const VALID_IDS = TABS.map(t => t.id)

  function getTabFromHash() {
    const hash = window.location.hash.replace('#', '')
    return VALID_IDS.includes(hash) ? hash : 'overview'
  }

  const [tab, setTab] = useState(getTabFromHash)

  useEffect(() => {
    const onHashChange = () => setTab(getTabFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  function switchTab(id) {
    window.location.hash = id
    setTab(id)
  }

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1>Handicap & Etiquette Committee</h1>
          <p>Protecting fair competition and the spirit of the game at Sky Meadow</p>
        </div>
      </div>

      <div className="he-tabs-wrap">
        <div className="container">
          <nav className="he-tabs" role="tablist">
            {TABS.map(t => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                className={`he-tab${tab === t.id ? ' active' : ''}`}
                onClick={() => switchTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {tab === 'overview' && <Overview onContact={() => switchTab('contact')} />}
          {tab === 'etiquette' && <Etiquette onContact={() => switchTab('contact')} />}
          {tab === 'policy' && <Policy onContact={() => switchTab('contact')} />}
          {tab === 'contact' && <Contact />}
        </div>
      </section>
    </div>
  )
}

function Overview({ onContact }) {
  return (
    <div className="he-content">
      <h2 className="section-title">Purpose & Mission</h2>
      <div className="divider" />
      <p className="he-lead">
        The Handicap & Etiquette Committee exists to protect the integrity of competition at Sky Meadow
        and to ensure that every member — regardless of ability — can play and compete with confidence
        in the fairness of the game.
      </p>
      <p>
        We do this in two ways: by administering the club's handicapping program in strict accordance
        with the USGA World Handicap System™ (WHS™), and by upholding the standards of on-course conduct
        and etiquette that make the game enjoyable for everyone who plays here.
      </p>
      <p>
        A fair handicap and a well-mannered course go hand in hand. When both are working as they should,
        every round — whether a casual weekend loop or a club championship — is an opportunity for
        genuine, equitable competition.
      </p>

      <h3 className="he-h3">Our Objectives</h3>
      <ol className="he-objectives">
        <li>
          <strong>Handicap Integrity.</strong> Ensure that every member's Handicap Index accurately
          reflects their demonstrated ability, in compliance with the <a href="https://www.usga.org/handicapping/roh/rules-of-handicapping.html#cshid=[object%20Object]" target="_blank" rel="noopener noreferrer">USGA Rules of Handicapping</a>, so that
          competition among players of all skill levels is fair and meaningful.
        </li>
        <li>
          <strong>Score Submission Compliance.</strong> Educate members on their responsibility to submit
          all acceptable scores — not just good ones — and to do so in a timely manner.
        </li>
        <li>
          <strong>Etiquette & Course Care.</strong> Define and communicate the standards of behavior,
          pace of play, and course care that preserve the experience for all members and guests.
        </li>
        <li>
          <strong>Education.</strong> Serve as an accessible resource on handicapping rules, WHS
          procedures, and course etiquette. We welcome questions from any member at any time.
        </li>
        <li>
          <strong>Fair Adjudication.</strong> Conduct handicap reviews, apply adjustments where
          warranted, and administer an open and fair appeals process so that every member feels heard
          and treated with respect.
        </li>
      </ol>

      <h3 className="he-h3" style={{ marginTop: '2.5rem' }}>Committee Members</h3>
      <div className="he-table-wrap">
        <table className="styled-table">
          <thead>
            <tr><th>Role</th><th>Name</th></tr>
          </thead>
          <tbody>
            {COMMITTEE.map((m, i) => (
              <tr key={i}>
                <td>{m.role}</td>
                <td>{m.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="he-note">
        To reach the full committee, use the{' '}
        <button className="he-link-btn" onClick={onContact}>contact form</button>.
      </p>
    </div>
  )
}

function Etiquette({ onContact }) {
  return (
    <div className="he-content">
      <h2 className="section-title">Course Etiquette Guidelines</h2>
      <div className="divider" />
      <p className="he-lead">
        Golf is one of the rare sports where players are largely responsible for policing themselves.
        The etiquette traditions of the game are not arbitrary — they protect the safety of other players,
        preserve the condition of the course, and maintain the pace that allows everyone to enjoy their round.
      </p>

      <div className="he-card">
        <h3 className="he-card-title">Care of the Course</h3>
        <div className="he-care-grid">
          <div>
            <h4 className="he-h4">Divots</h4>
            <ul className="he-list">
              <li>On the fairway, replace divots with the original turf and press down firmly, or fill with the sand/seed mixture provided in cart bottles.</li>
              <li>Do not take practice swings on the fairway, tee boxes, or anywhere divots would result.</li>
            </ul>
          </div>
          <div>
            <h4 className="he-h4">Bunkers</h4>
            <ul className="he-list">
              <li>Enter and exit from the low side.</li>
              <li>After playing, <strong>rake the sand smooth</strong>, including your footprints and entry path. Return the rake to its designated location.</li>
            </ul>
          </div>
          <div>
            <h4 className="he-h4">Putting Greens</h4>
            <ul className="he-list">
              <li><strong>Repair all ball marks</strong> on the green, even those that aren't yours. A repaired mark heals in 24 hours; an unrepaired one takes weeks.</li>
              <li>Don't drag your feet, drop the flagstick onto the green, or drive carts onto the green or its surrounds.</li>
              <li>Step aside when a partner is putting — don't stand on their line or in their eyeline.</li>
              <li>Handle the flagstick with care. Hold it when attending, and remove it cleanly when the ball is near the hole.</li>
            </ul>
          </div>
          <div>
            <h4 className="he-h4">General</h4>
            <ul className="he-list">
              <li>Dispose of cigarette and cigar waste in designated receptacles — never on the course.</li>
              <li><strong>Leave no litter.</strong> If you carry it on, carry it off.</li>
              <li>Treat all course infrastructure with respect.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="he-card">
        <h3 className="he-card-title">Pace of Play</h3>
        <p>
          Slow play is the single greatest source of frustration on any golf course. Each group is responsible
          for maintaining its position relative to the group <em>in front</em> of it — not simply the group behind.
        </p>
        <div className="he-targets">
          <div className="he-target">
            <span className="he-target-label">9 holes</span>
            <span className="he-target-value">2:00 or less</span>
          </div>
          <div className="he-target">
            <span className="he-target-label">18 holes</span>
            <span className="he-target-value">4:00 or less</span>
          </div>
        </div>
        <p className="he-subhead">Practical habits that keep pace:</p>
        <ul className="he-list">
          <li>Walk or ride directly to your ball while others are playing.</li>
          <li>Be ready to play when it is your turn — club selection, green-reading, and pre-shot routines should begin before you step up to the ball.</li>
          <li><strong>Ready golf</strong> — playing when ready rather than honoring furthest-from-the-hole order — is encouraged in general play.</li>
          <li>Hit a <strong>provisional</strong> immediately if your ball may be lost or out of bounds. Do not walk to the landing area first.</li>
          <li>Limit your search for a lost ball to <strong>three minutes</strong>, per the Rules of Golf.</li>
          <li>Putt out whenever practical. Marking, cleaning, and replacing repeatedly adds significant time.</li>
          <li>When putting is complete, <strong>move off the green promptly</strong> and record scores at the next tee.</li>
          <li>If your group has fallen a hole behind, pick up the pace or <strong>invite the group behind to play through</strong>.</li>
        </ul>
      </div>

      <div className="he-card">
        <h3 className="he-card-title">Respect for Fellow Players</h3>
        <ul className="he-list">
          <li><strong>Silence during play.</strong> While another player is addressing the ball or in their swing, remain still and quiet — including conversations, phone use, and cart noise.</li>
          <li><strong>Phones</strong> should be silenced before you tee off. If you must take a call, step away and keep it brief.</li>
          <li><strong>Positive sportsmanship.</strong> Club throwing, excessive profanity, or abusive behavior toward others are not consistent with the values of this club and may be subject to review.</li>
          <li>When another player holes a putt, acknowledge it. The small gestures of genuine sportsmanship are what make the game worth playing.</li>
        </ul>
      </div>

      <div className="he-card he-card-accent">
        <h3 className="he-card-title">Guests</h3>
        <p>
          Members are responsible for the conduct of their guests. Please brief your guests on these guidelines
          before the round begins. Guests who do not observe the standards of conduct expected at Sky Meadow
          reflect on the member who invited them.
        </p>
      </div>

      <p className="he-note">
        Questions about etiquette or the Rules of Golf?{' '}
        <button className="he-link-btn" onClick={onContact}>Contact the committee</button>.
      </p>
    </div>
  )
}

function Policy({ onContact }) {
  return (
    <div className="he-content">
      <h2 className="section-title">Handicap Policy</h2>
      <div className="divider" />
      <p className="he-lead">
        Sky Meadow MGA administers its handicap program in accordance with the{' '}
        <strong>USGA World Handicap System™ (WHS™)</strong>, the unified set of rules governing
        handicapping worldwide. Every member who competes in MGA events is required to hold a valid,
        current Handicap Index issued and maintained through Sky Meadow.
      </p>
      <p>
        This page outlines what is expected of members, what authority the Handicap & Etiquette Committee
        holds, and how members may appeal any committee decision.
      </p>

      <h3 className="he-h3">Member Expectations</h3>
      <p>
        The WHS is built on a foundation of integrity. For it to function fairly, <strong>every member must
        do their part</strong>. The following are not suggestions — they are requirements of the system and
        of membership in good standing.
      </p>

      <div className="he-policy-grid">
        <div className="he-policy-item">
          <div className="he-num">1</div>
          <div>
            <h4 className="he-h4">Submit All Acceptable Scores</h4>
            <p>
              Submit every acceptable score from authorized formats — not selectively, and not only when you
              play well. This includes Sky Meadow events and general play, rounds at other courses, and
              9-hole scores, which are combined with an expected score to generate an 18-hole Score Differential.
            </p>
            <p>
              Withholding low scores (to keep an index high) or high scores (to prevent downward movement)
              is a violation of the Rules of Handicapping and undermines the fairness of every competition.
            </p>
          </div>
        </div>

        <div className="he-policy-item">
          <div className="he-num">2</div>
          <div>
            <h4 className="he-h4">Submit Scores on Time</h4>
            <p>
              Scores should be submitted as soon as possible after the round, and before midnight (local time)
              on the day of play. Timely submission ensures your index reflects current ability, your score is
              included in the day's Playing Conditions Calculation (PCC), and fellow competitors can verify
              your score promptly.
            </p>
          </div>
        </div>

        <div className="he-policy-item">
          <div className="he-num">3</div>
          <div>
            <h4 className="he-h4">Play by the Rules of Golf</h4>
            <p>
              Scores submitted for handicap purposes must be made under the Rules of Golf. Scores made in
              deliberate violation of the rules are not acceptable for handicap purposes.
            </p>
          </div>
        </div>

        <div className="he-policy-item">
          <div className="he-num">4</div>
          <div>
            <h4 className="he-h4">Attempt Your Best Score on Every Hole</h4>
            <p>
              The WHS is designed to capture demonstrated ability. Picking up without cause, intentionally
              inflating scores, or manipulating hole scores defeats the purpose of the system.
            </p>
          </div>
        </div>

        <div className="he-policy-item">
          <div className="he-num">5</div>
          <div>
            <h4 className="he-h4">Certify Others' Scores</h4>
            <p>
              When playing with fellow members, you serve as a marker — a witness who can verify the round was
              played in accordance with the rules. Sign scorecards accurately and raise concerns about
              irregularities with the committee promptly.
            </p>
          </div>
        </div>

        <div className="he-policy-item">
          <div className="he-num">6</div>
          <div>
            <h4 className="he-h4">One Handicap Index, Honestly Maintained</h4>
            <p>
              Every member maintains a single Handicap Index from a single scoring record. Members who belong
              to multiple clubs must ensure each club is aware of the other memberships and of their home club
              designation.
            </p>
          </div>
        </div>
      </div>

      <h3 className="he-h3">Committee Authority & Purview</h3>
      <p>
        The Handicap & Etiquette Committee operates under the authority granted to Handicap Committees by the
        <a href="https://www.usga.org/handicapping/roh/rules-of-handicapping.html#cshid=[object%20Object]" target="_blank" rel="noopener noreferrer">USGA Rules of Handicapping</a>.
      </p>

      <div className="he-card">
        <h4 className="he-h4">Handicap Reviews</h4>
        <p>
          The committee conducts formal Handicap Reviews at least annually for all active members, and may
          conduct a review at any time — including at the request of a member or another player. Reviews may
          be triggered by:
        </p>
        <ul className="he-list">
          <li>Scoring patterns consistently above or below a member's expected range</li>
          <li>Significant differences between competition and general play scores</li>
          <li>Repeated failure to submit acceptable scores</li>
          <li>Exceptional scores (a Score Differential 7.0+ strokes better than the Handicap Index at time of play)</li>
          <li>Member request or a request from another member</li>
          <li>Any other information suggesting the Handicap Index does not reflect demonstrated ability</li>
        </ul>
      </div>

      <div className="he-card">
        <h4 className="he-h4">Handicap Index Adjustments</h4>
        <p>
          Following a review, the committee may adjust a member's Handicap Index upward or downward by a
          minimum of 1 stroke. Methods include:
        </p>
        <ul className="he-list">
          <li><strong>Reset</strong> — apply an adjustment to the most recent 20 Score Differentials, allowing the index to continue updating naturally as new scores post.</li>
          <li><strong>Freeze</strong> — hold the index at a selected level for a defined period, against upward movement, downward movement, or both.</li>
        </ul>
        <p>
          No adjustment will be applied until the member has been notified and given the opportunity to
          respond. Adjustments of more than 2 strokes are reserved for exceptional circumstances (significant
          injury or illness, for example) and will be clearly explained to the member.
        </p>
      </div>

      <div className="he-card">
        <h4 className="he-h4">Exceptional Scores</h4>
        <p>
          When a member posts a Score Differential at least 7.0 strokes better than their Handicap Index at
          the time of play, the WHS automatically applies a reduction:
        </p>
        <div className="he-table-wrap">
          <table className="styled-table">
            <thead>
              <tr><th>Strokes Better Than Handicap Index</th><th>Automatic Reduction</th></tr>
            </thead>
            <tbody>
              <tr><td>7.0 – 9.9 strokes</td><td>−1.0</td></tr>
              <tr><td>10.0 or more strokes</td><td>−2.0</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          The committee retains the authority to override an automatic adjustment if the result would not
          fairly reflect demonstrated ability.
        </p>
      </div>

      <div className="he-card">
        <h4 className="he-h4">Posting Missing or Penalty Scores</h4>
        <p>
          If a member fails to submit an acceptable score and the committee determines the reason was not
          justified, the committee will post the score itself — using the actual score if discoverable, or a
          penalty score if not. Justified reasons include sudden injury, illness, or emergency. Not justified
          reasons include forgetfulness, deliberate avoidance of a low or high score, or technical inconvenience.
        </p>
        <ul className="he-list">
          <li><strong>Intentionally avoided a low score:</strong> penalty equals the highest Score Differential in the last 19 scores.</li>
          <li><strong>Intentionally avoided a high score:</strong> penalty equals the lowest Score Differential in the last 19 scores.</li>
          <li><strong>Other unjustified reason, score not discoverable:</strong> penalty equals Course Handicap plus the Course Rating of the tees played.</li>
        </ul>
      </div>

      <div className="he-card">
        <h4 className="he-h4">MGA Events</h4>
        <p>For MGA competitions hosted by Sky Meadow, the committee may:</p>
        <ul className="he-list">
          <li>Set maximum Handicap Index or Playing Handicap limits for entry</li>
          <li>Adjust a member's Playing Handicap for a specific competition when credible evidence suggests the index does not reflect demonstrated ability</li>
          <li>Require submission of a member's most recent 20 scores as part of event eligibility review</li>
          <li>Apply the full course of measures described above before and after competition</li>
        </ul>
        <p>
          Members whose Handicap Index has been adjusted prior to a competition will be notified and given the
          opportunity to respond before the adjustment is applied, whenever the timeline permits.
        </p>
      </div>

      <div className="he-card he-card-warn">
        <h4 className="he-h4">Withdrawing a Handicap Index</h4>
        <p>
          In cases of deliberate or repeated non-compliance, the committee may withdraw a member's Handicap
          Index, rendering the member ineligible to compete in handicap events until reinstated. This step
          will only be taken after the member has been notified and given the opportunity to respond.
        </p>
      </div>

      <h3 className="he-h3">Appeals Process</h3>
      <p>
        The committee is committed to treating every member fairly and consistently. If you believe a
        committee decision was made in error or without sufficient basis, you have the right to appeal.
      </p>

      <ol className="he-steps">
        <li>
          <div className="he-step-head">Step 1 — Informal Discussion</div>
          <p>
            Before initiating a formal appeal, contact the committee directly. Many concerns can be resolved
            quickly through an open conversation. The committee will respond within <strong>5 business days</strong>.
          </p>
        </li>
        <li>
          <div className="he-step-head">Step 2 — Formal Written Appeal</div>
          <p>
            If informal discussion does not resolve the matter, submit a written appeal to the Committee Chair
            within <strong>30 days</strong> of the decision. State the nature of the decision being appealed,
            the specific basis (factual error, procedural irregularity, failure to consider relevant evidence),
            and include any supporting documentation.
          </p>
        </li>
        <li>
          <div className="he-step-head">Step 3 — Committee Review</div>
          <p>
            The committee will acknowledge receipt within <strong>3 business days</strong>, review the appeal
            in full, and render a written decision within <strong>21 days</strong> of receiving the formal appeal.
          </p>
        </li>
      </ol>

      <p className="he-note">
        Questions about the handicap policy or your Handicap Index?{' '}
        <button className="he-link-btn" onClick={onContact}>Contact the committee</button>.
      </p>
    </div>
  )
}

function Contact() {
  const [form, setForm] = useState({
    name: '', memberId: '', email: '', phone: '',
    subject: SUBJECTS[0], message: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('')

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }
      setStatus('sent')
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  const canSubmit =
    form.name.trim() &&
    form.email.trim() &&
    form.message.trim().length >= 20 &&
    status !== 'sending'

  return (
    <div className="he-content he-contact">
      <h2 className="section-title">Contact the Committee</h2>
      <div className="divider" />
      <p className="he-lead">
        Have a question about your Handicap Index, want to report a concern, or need guidance on a rules or
        etiquette matter? Send a note below and a committee member will respond within 5 business days.
        All submissions are treated with discretion.
      </p>

      {status === 'sent' ? (
        <div className="he-card he-card-accent">
          <h3 className="he-card-title">Message sent</h3>
          <p>
            Thanks — your message has been sent to the committee. A member will respond within 5 business days
            at the email address you provided.
          </p>
        </div>
      ) : (
        <form className="he-form" onSubmit={handleSubmit}>
          <div className="he-form-grid">
            <div className="he-field">
              <label htmlFor="he-name">Your Name <span className="he-req">*</span></label>
              <input id="he-name" type="text" required value={form.name} onChange={e => update('name', e.target.value)} />
            </div>
            <div className="he-field">
              <label htmlFor="he-member">Member ID / Membership Number</label>
              <input id="he-member" type="text" value={form.memberId} onChange={e => update('memberId', e.target.value)} />
            </div>
            <div className="he-field">
              <label htmlFor="he-email">Email Address <span className="he-req">*</span></label>
              <input id="he-email" type="email" required value={form.email} onChange={e => update('email', e.target.value)} />
            </div>
            <div className="he-field">
              <label htmlFor="he-phone">Phone Number</label>
              <input id="he-phone" type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} />
            </div>
            <div className="he-field he-field-full">
              <label htmlFor="he-subject">Subject <span className="he-req">*</span></label>
              <select id="he-subject" required value={form.subject} onChange={e => update('subject', e.target.value)}>
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="he-field he-field-full">
              <label htmlFor="he-message">Message <span className="he-req">*</span></label>
              <textarea
                id="he-message"
                required
                minLength={20}
                rows={6}
                placeholder="Please share as much detail as you can (minimum 20 characters)."
                value={form.message}
                onChange={e => update('message', e.target.value)}
              />
            </div>
          </div>
          {status === 'error' && (
            <p className="he-form-error">{errorMsg}</p>
          )}
          <button type="submit" className="btn btn-primary he-submit" disabled={!canSubmit}>
            {status === 'sending' ? 'Sending…' : 'Send to Committee'}
          </button>
          <p className="he-note">
            Your message will be sent directly to the Handicap & Etiquette Committee. We respond within 5
            business days.
          </p>
        </form>
      )}
    </div>
  )
}

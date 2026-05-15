import { Resend } from 'resend'

const FROM_ADDRESS = process.env.CONTACT_FROM || 'Sky Meadow MGA <noreply@skymga.org>'
const TO_ADDRESS = process.env.CONTACT_TO || 'handicap@skymga.org'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, memberId, email, phone, subject, message, isMember } = req.body || {}

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Missing required fields.' })
  }
  if (message.trim().length < 20) {
    return res.status(400).json({ error: 'Message must be at least 20 characters.' })
  }
  if (!isMember) {
    return res.status(400).json({ error: 'Member confirmation is required.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Email service not configured.' })
  }

  const resend = new Resend(apiKey)

  const safe = (s) => String(s).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]))

  const text = [
    `Name: ${name}`,
    memberId && `Member ID: ${memberId}`,
    `Email: ${email}`,
    phone && `Phone: ${phone}`,
    `Subject: ${subject}`,
    '',
    message,
  ].filter(Boolean).join('\n')

  const html = `
    <div style="font-family: -apple-system, Segoe UI, sans-serif; color: #1E3851;">
      <h2 style="color:#1E3851;margin-bottom:0.25rem;">New H&amp;E Committee Inquiry</h2>
      <p style="color:#6c757d;margin-top:0;">Submitted via skymga.org</p>
      <table style="border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:4px 12px 4px 0;color:#6c757d;">Name</td><td>${safe(name)}</td></tr>
        ${memberId ? `<tr><td style="padding:4px 12px 4px 0;color:#6c757d;">Member ID</td><td>${safe(memberId)}</td></tr>` : ''}
        <tr><td style="padding:4px 12px 4px 0;color:#6c757d;">Email</td><td>${safe(email)}</td></tr>
        ${phone ? `<tr><td style="padding:4px 12px 4px 0;color:#6c757d;">Phone</td><td>${safe(phone)}</td></tr>` : ''}
        <tr><td style="padding:4px 12px 4px 0;color:#6c757d;">Subject</td><td>${safe(subject)}</td></tr>
      </table>
      <hr style="border:none;border-top:1px solid #e9ecef;margin:1rem 0;" />
      <pre style="font-family:inherit;white-space:pre-wrap;font-size:14px;line-height:1.5;">${safe(message)}</pre>
    </div>
  `

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      replyTo: email,
      subject: `[H&E Committee] ${subject}`,
      text,
      html,
    })
    if (error) {
      console.error('Resend error', error)
      return res.status(502).json({ error: 'Failed to send email.' })
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact handler error', err)
    return res.status(500).json({ error: 'Unexpected server error.' })
  }
}

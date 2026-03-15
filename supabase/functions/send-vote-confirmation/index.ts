import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const FROM_ADDRESS = 'Sky Meadow MGA <admin@skymga.org>'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    const { voterName, voterEmail, ballotName, selectedCandidates, submittedAt } = await req.json()

    const candidateList = selectedCandidates
      .map((name: string, i: number) => `<li style="padding: 4px 0;">${i + 1}. ${name}</li>`)
      .join('')

    const formattedDate = new Date(submittedAt).toLocaleString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: '2-digit', timeZoneName: 'short',
    })

    const html = `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #343a40;">
        <div style="background: #1E3851; padding: 24px 32px; border-radius: 8px 8px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Vote Confirmation</h1>
          <p style="color: rgba(255,255,255,0.75); margin: 6px 0 0; font-size: 14px;">Sky Meadow Men's Golf Association</p>
        </div>
        <div style="background: #ffffff; padding: 32px; border: 1px solid #e9ecef; border-top: none; border-radius: 0 0 8px 8px;">
          <p>Hi ${voterName},</p>
          <p>Your vote for the <strong>${ballotName}</strong> has been successfully recorded.</p>

          <div style="background: #f0f6fc; border-radius: 6px; padding: 20px 24px; margin: 24px 0;">
            <p style="margin: 0 0 10px; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #6c757d;">Your Selections</p>
            <ol style="margin: 0; padding-left: 20px; line-height: 1.8;">
              ${candidateList}
            </ol>
          </div>

          <p style="font-size: 13px; color: #6c757d;">Submitted on ${formattedDate}</p>
          <p style="font-size: 13px; color: #6c757d;">If you did not submit this vote or believe this was sent in error, please contact <a href="mailto:admin@skymga.org" style="color: #4B8DCC;">admin@skymga.org</a>.</p>
        </div>
      </div>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: voterEmail,
        subject: `Vote Confirmation — ${ballotName}`,
        html,
      }),
    })

    if (!res.ok) {
      const error = await res.text()
      throw new Error(`Resend error: ${error}`)
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  }
})

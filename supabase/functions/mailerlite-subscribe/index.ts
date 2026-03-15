import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

const MAILERLITE_API_KEY = Deno.env.get('MAILERLITE_API_KEY')
const GROUP_ID = '182044262729254012'

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
    const { name, email } = await req.json()

    if (!name || !email) {
      return new Response(JSON.stringify({ error: 'Name and email are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      })
    }

    const [firstName, ...rest] = name.trim().split(' ')
    const lastName = rest.join(' ')

    const res = await fetch(`https://connect.mailerlite.com/api/subscribers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        fields: { name: firstName, last_name: lastName },
        groups: [GROUP_ID],
      }),
    })

    if (!res.ok) {
      const error = await res.text()
      throw new Error(`MailerLite error: ${error}`)
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

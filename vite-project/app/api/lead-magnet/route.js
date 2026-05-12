export async function POST(request) {
  const { name, email, concern } = await request.json()

  if (!name || !email) {
    return Response.json({ error: 'Name and email are required' }, { status: 400 })
  }

  // Connect to ConvertKit:
  // const res = await fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     api_key: process.env.CONVERTKIT_API_KEY,
  //     email,
  //     first_name: name,
  //     fields: { concern },
  //   }),
  // })

  // Connect to Mailchimp:
  // const res = await fetch(`https://us1.api.mailchimp.com/3.0/lists/YOUR_LIST_ID/members`, {
  //   method: 'POST',
  //   headers: {
  //     Authorization: `Basic ${Buffer.from(`anystring:${process.env.MAILCHIMP_API_KEY}`).toString('base64')}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     email_address: email,
  //     status: 'subscribed',
  //     merge_fields: { FNAME: name, CONCERN: concern },
  //   }),
  // })

  console.log('Lead magnet signup:', { name, email, concern })

  return Response.json({ success: true })
}

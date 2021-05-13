const URL = '/api/mailer'

async function mailer(data) {
  return fetch(URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

/**
 * Mails that are necessary
 * 1. Room creation success email
 * 2. Room joining success email -> Welcome + Login Details
 * 3. Ready for payment alert email (for members)
 * 4. Everyone has paid alert email (for creator)
 * 5. Payment confirmation (for everyone)
 * 5. Shipping confirmation
 */

export async function sendRoomCreationSuccessEmail({ name, email, roomUrl }) {
  // TODO: add gift details
  const html = `
  <div>
    <p>${name},</p>
    <p>You have successfully created a room at Giftly!</p>
    <p>Here's your link to the room:</p>
    <p><a href="${roomUrl}">${roomUrl}</a></p>
    <p>Please keep this URL for yourself as it gives you full admin access to the room.</p>
    <p>Thanks,</p>
    <p>Team Giftly</p>
  </div>
  `

  return mailer({
    to: email,
    subject: 'You have successfully created a Giftly room!',
    html,
  })
}

export async function sendMemberWelcomeEmail({ name, email, roomUrl }) {
  // TODO: add gift details
  const html = `
  <div>
    <p>Hey ${name},</p>
    <p>Welcome to Giftly!</p>
    <p>Here's your link to the room:</p>
    <p><a href="${roomUrl}">${roomUrl}</a></p>
    <p>Please keep this URL for yourself as it gives you access to the room under your own name.</p>
    <p>Thanks,</p>
    <p>Team Giftly</p>
  </div>
  `

  return mailer({
    to: email,
    subject: 'Here is your Giftly room link',
    html,
  })
}

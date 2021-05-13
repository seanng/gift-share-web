/** @see https://stackoverflow.com/questions/63783836/next-js-and-nodemailer-sending-an-email-from-contact-form */
const nodemailer = require('nodemailer')

const FROM = 'giftsharetest@gmail.com'
const PW = 'Hjkl6789'

const transport = {
  service: 'gmail',
  auth: {
    // enter auth details here
    user: FROM,
    pass: PW,
  },
}

export default async function mailer(req, res) {
  const { to, subject, html } = req.body
  // do something with the above stuff.
  const transporter = nodemailer.createTransport(transport)

  const mailOptions = {
    from: FROM,
    to, // user email
    subject,
    html,
  }

  try {
    const data = await transporter.sendMail(mailOptions)
    res.send(`success: ${JSON.stringify(data)}`)
  } catch (err) {
    res.send(`error: ${JSON.stringify(err)}`)
  }
}

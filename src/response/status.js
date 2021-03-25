const { json } = require('./json')

const status = (status, message) =>
  message
  ? json({ message }, { status })
  : new Response(null, { status })

module.exports = { status }

const { json } = require('./json')

const error = (
  status = 500,
  message = 'Internal Server Error.',
) => json({ error: message, status }, { status })

module.exports = { error }

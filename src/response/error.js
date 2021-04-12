const { json } = require('./json')

const error = (
  status = 500,
  content = 'Internal Server Error.',
) => json({
  status,
  ...typeof content === 'object'
    ? content
    : { error: content },
}, { status })

module.exports = { error }

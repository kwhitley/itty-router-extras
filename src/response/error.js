const { json } = require('./json')

const error = (
  status = 500,
  content = 'Internal Server Error.',
) => json({
  ...(typeof content === 'object'
    ? content
    : {
        status,
        error: content,
      }),
}, { status })

module.exports = { error }

const { json } = require('./json')

const status = (status, message) =>
  message
  ? json({
      ...typeof message === 'object'
        ? message
        : { message },
    }, { status })
  : new Response(null, { status })

module.exports = { status }

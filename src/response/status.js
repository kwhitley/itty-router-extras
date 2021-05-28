const { json } = require('./json')

const status = (status, message, options = {}) =>
  message
  ? json({
      ...(typeof message === 'object'
        ? message
        : {
            status,
            message,
          }),
    }, { status, ...options })
  : new Response(null, { status, ...options })

module.exports = { status }

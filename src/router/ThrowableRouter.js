const { json } = require('../response')

// WRAPPER FUNCTION FOR THROWABLE HANDLERS
const throwable = (options = {}) => fn => async (request, ...rest) => {
  const {
    error = {},
    cors = true,
  } = options
  const { message, status = 500 } = error

  try {
    let response = await fn(request, ...rest)

    if (cors && response && response instanceof Response) {
      addCorsHeaders(request)(response)
    }

    return response
  } catch (err) {
    let response = json({
      message: message || err.message,
      stack: err.stack,
      status: err.status || status
    }, { status: err.status || status })

    if (cors) {
      addCorsHeaders(request)(response)
    }

    return response
  }
}

const ThrowableRouter = (options = {}) => {
  const { middleware = [], ...other } = options

  return new Proxy(Router(options), {
    get: (obj, prop) =>
      (route, ...handlers) => {
        let options = typeof handlers[handlers.length - 1] === 'object' && handlers.pop() || {}

        return obj[prop](route, withParams, ...middleware, ...handlers.map(throwable(other)))
      }
  })
}

module.exports = { ThrowableRouter }

// RESPONSE HANDLERS

const asType = (format = 'text/plain; charset=utf-8') =>
  (body, options = {}) => {
    if (typeof body === 'object') {
      return new Response(JSON.stringify(body), {
        headers: {
          'Content-Type': format,
        },
        ...options,
      })
    } else {
      return new Response(body, options)
    }
  }

const asJSON = asType('application/json; charset=utf-8')

const errorResponse = (
  message = 'Internal Server Error.',
  status = 500,
) => asJSON({ message }, { status })

const missingResponse = (message = 'Not found.') =>
  errorResponse(message, 404)

const sendStatus = status => new Response(null, { status })

// MIDDLEWARE

// withContent - embeds any request body as request.content
const withContent = async request => {
  let contentType = request.headers.get('content-type')
  request.content = undefined

  try {
    if (contentType) {
      if (contentType.includes('application/json')) {
        request.content = await request.json()
      } else if (contentType.includes('application/text')) {
        request.content = await request.text()
      } else if (contentType.includes('form')) {
        request.content = await request.formData()
      }
    }
  } catch (err) {} // silently fail on error
}

// withCookies - embeds cookies object into the request
const withCookies = request => {
  request.cookies = {}
  try {
    request.cookies = request.headers.get('Cookie')
      .split(/;\s*/)
      .map(pair => pair.split('='))
      .reduce((acc, [key, value]) => {
        return (acc[key] = value) && acc
      }, {})
  } catch (err) {}
}

// withParams - injects route params within request at top level
const withParams = request => {
  Object.assign(request, request.params || {})
}

module.exports = {
  asJSON,
  asType,
  errorResponse,
  missingResponse,
  sendStatus,
  withContent,
}

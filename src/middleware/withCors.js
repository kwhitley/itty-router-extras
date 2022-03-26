const withCors = (options = {}) => request => {
  const corsHeaders = getHeaders(options, request.headers.get('Referer'));

  if (
    request.headers.get('Origin') !== null &&
    request.headers.get('Access-Control-Request-Method') !== null
  ) {
    // Handle CORS pre-flight request.
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    })
  }

  // Handle standard OPTIONS request.
  return new Response(null, {
    headers: {
      'Allow': `${methods}, HEAD, OPTIONS`,
    }
  })
}

const addCorsHeaders = options => request => response => {
  const corsHeaders = getHeaders(options, request.headers.get('Referer'));

  try {
    for (const [ key, value ] of Object.entries(corsHeaders)) {
      response.headers.set(key, value)
    }
  } catch (err) {
    // couldn't modify headers
  }

  return response
}

const getHeaders = (options, referer) => {
  const {
    origin = '*',
    methods = 'GET, POST, PATCH, DELETE',
    headers = 'authorization, referer, origin, content-type',
    credentials = false,
  } = options

  let allowedOrigin = origin;
  if (referer && origin !== '*') {
    const url = new URL(referer)
    const domain = new URL(origin).host.split('.').slice(-2).join('.');
    allowedOrigin = url.origin.match(new RegExp(`((/|\\.)${domain.replace('.', '\\.')}|localhost:\\d+)$`))
                  ? url.origin
                  : origin
  }

  const corsHeaders = {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': methods,
    'Access-Control-Allow-Headers': headers,
  }

  if (credentials) {
    corsHeaders['Access-Control-Allow-Credentials'] = 'true'
  }
  return corsHeaders;
}

module.exports = { withCors, addCorsHeaders }

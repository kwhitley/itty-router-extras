const createResponseType = (format = 'text/plain; charset=utf-8') =>
  (body, options = {}) => {
    const { headers = {}, ...rest } = options

    if (typeof body === 'object') {
      return new Response(JSON.stringify(body), {
        headers: {
          'Content-Type': format,
          ...headers,
        },
        ...rest,
      })
    }

    return new Response(body, options)
  }

  module.exports = { createResponseType }

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

module.exports = { withContent }

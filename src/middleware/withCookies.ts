// withCookies - embeds cookies object into the request
export const withCookies = (request: Request) => {
  request.cookies = {}
  try {
    request.cookies = (request.headers.get('Cookie') || '')
      .split(/;\s*/)
      .map((pair) => {
        const parts = pair.trim().split('=')
        return [parts.shift(), parts.join('=')]
      })
      .reduce((acc, [key, value]) => {
        acc[key] = value
        return acc
      }, {} as Record<string, string>)
  } catch (err) {}
}

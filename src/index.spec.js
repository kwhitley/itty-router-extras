describe('itty-router-extras', () => {
  it('returns all exports', async () => {
    const exports = require('./index')
    const expectedExports = [
      'StatusError',
      'withContent',
      'withCookies',
      'withParams',
      'error',
      'json',
      'missing',
      'status',
      'text',
      'ThrowableRouter',
    ]

    for (const e of expectedExports) {
      if (!exports.hasOwnProperty(e)) {
        console.log('missing export:', e)
      }
      expect(exports.hasOwnProperty(e)).toBe(true)
    }
  })
})

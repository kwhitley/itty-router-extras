const { ThrowableRouter } = require('./ThrowableRouter')

describe('router/ThrowableRouter', () => {
  describe(`ThrowableRouter(options = {})`, () => {
    it('is an itty proxy', async () => {
      const origin = {}
      const router = ThrowableRouter(origin)

      router.get('/foo', () => {})

      expect(typeof origin.r).toBe('object')
      expect(origin.r.length).toBe(1)
    })
  })
})

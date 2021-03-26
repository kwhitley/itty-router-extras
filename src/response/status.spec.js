require('isomorphic-fetch')

const response = require('.')
const { status } = require('./status')
const message = 'Got it!'

describe('response/error', () => {
  describe(`status(code)`, () => {
    it('returns an empty Response with status code', async () => {
      const response1 = status(400)

      expect(response1 instanceof Response).toBe(true)
      expect(response1.status).toBe(400)

      const response2 = status(204, message)

      expect(response2.status).toBe(204)
      expect(await response2.json()).toEqual({ message })
    })
  })
})

import { status } from './status'

const message = 'Got it!'

describe('response/error', () => {
  describe(`status(code)`, () => {
    it('returns an empty Response with status code', async () => {
      const resp = status(400)
      expect(resp instanceof Response).toBe(true)
      expect(resp.status).toBe(400)
    })

    it('returns a simple message if given', async () => {
      const resp = status(200, message)
      expect(resp.status).toBe(200)
      expect(await resp.json()).toEqual({ status: 200, message })
    })

    it('will use second param as object payload if given', async () => {
      const payload = { message: 'Bad Request', stack: [] }
      const resp = status(400, payload)
      expect(resp instanceof Response).toBe(true)
      expect(resp.status).toBe(400)
      expect(await resp.json()).toEqual(payload)
    })
  })
})

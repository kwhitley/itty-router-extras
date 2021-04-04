require('isomorphic-fetch')

const { ThrowableRouter } = require('../router/ThrowableRouter')
const { withContent } = require('./withContent')

describe('middleware/withContent', () => {
  it('returns with text payload', async () => {
    const router = ThrowableRouter()
    const handler = jest.fn(req => req)

    router
      .post('/', withContent, handler)

    const request = new Request('https://example.com/', {
      method: 'post',
      body: JSON.stringify({ foo: 'bar' }),
    })

    await router.handle(request)

    expect(handler).toHaveBeenCalled()
    // expect(handler).toHaveReturnedWith('foo')
  })
})

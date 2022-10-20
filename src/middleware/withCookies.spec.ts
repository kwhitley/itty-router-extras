import { ThrowableRouter } from '../router/ThrowableRouter'
import { withCookies } from './withCookies'

describe('middleware/withCookies', () => {
  it('parses cookies into request.cookies', async () => {
    const router = ThrowableRouter()
    const handler = vi.fn((req) => req.cookies)

    router.get('/:id', withCookies, handler)
    // router.get('/:id', withCookies, handler)

    const request = new Request('https://example.com/12', {
      headers: { cookie: 'empty=; foo=bar=baz' },
    })

    await router.handle(request)

    expect(handler).toHaveBeenCalled()
    expect(handler.calls[0][0].cookies).toEqual({ empty: '', foo: 'bar=baz' })
    // TODO: use below instead when this issue is resolve:
    // https://github.com/vitest-dev/vitest/issues/2154
    // expect(handler).toHaveReturnedWith({ empty: '', foo: 'bar=baz' })
  })
})

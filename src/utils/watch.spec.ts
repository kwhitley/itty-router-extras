import { ThrowableRouter } from '../router/ThrowableRouter'
import { watch } from './watch'

describe('utils/watch', () => {
  it('creates reactive middleware (string prop)', async () => {
    const router = ThrowableRouter()
    const watcher = vi.fn((value, prop, request) => ({ prop, value }))
    const handler = vi.fn((req) => req.foo)

    const watchFoo = watch('foo', watcher)

    const modifyFoo = (request) => {
      request.foo = 'new foo'
    }

    router.all('*', watchFoo, modifyFoo).get('/:id', handler)

    const request = new Request('https://example.com/12')

    await router.handle(request)

    expect(handler).toHaveBeenCalled()
    expect(handler).toHaveReturnedWith('new foo')
    expect(watcher).toHaveReturnedWith({ prop: 'foo', value: 'new foo' })
  })

  it('creates reactive middleware (function predicate)', async () => {
    const router = ThrowableRouter()
    const watcher = vi.fn((value, prop, request) => ({ prop, value }))
    const handler = vi.fn((req) => req.foo)

    const watchFoo = watch((prop) => prop === 'foo', watcher)

    const modifyFoo = (request) => {
      request.foo = 'new foo'
    }

    router.all('*', watchFoo, modifyFoo).get('/:id', handler)

    const request = new Request('https://example.com/12')

    await router.handle(request)

    expect(handler).toHaveBeenCalled()
    expect(handler).toHaveReturnedWith('new foo')
    expect(watcher).toHaveReturnedWith({ prop: 'foo', value: 'new foo' })
  })
})

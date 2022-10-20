import { Route, Router, RouterOptions } from 'itty-router'
import { ThrowableRouterOptions } from 'src/itty-router-extras'
import { ArgumentsType } from 'vitest'
import { error } from '../response'

export const ThrowableRouter = (options: ThrowableRouterOptions = {}) => {
  const { stack = false } = options

  return new Proxy(Router(options), {
    get:
      (obj, prop: string) =>
      (...args: ArgumentsType<Router['handle']> | ArgumentsType<Route>) => {
        if (prop === 'handle') {
          return obj[prop](...args).catch((err: any) =>
            error(err.status || 500, {
              status: err.status || 500,
              error: err.message,
              stack: (stack && err.stack) || undefined,
            }),
          )
        } else return (obj[String(prop)] as Route)(...args)
      },
  })
}

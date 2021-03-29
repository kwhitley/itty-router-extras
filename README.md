# ![Itty Router][logo-image]

[![npm package][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Open Issues][issues-image]][issues-url]
<a href="https://github.com/kwhitley/itty-router-extras" target="\_parent">
  <img alt="" src="https://img.shields.io/github/stars/kwhitley/itty-router-extras.svg?style=social&label=Star" />
</a>
<a href="https://twitter.com/kevinrwhitley" target="\_parent">
  <img alt="" src="https://img.shields.io/twitter/follow/kevinrwhitley.svg?style=social&label=Follow" />
</a>

An assortment of delicious (yet lightweight and tree-shakeable) extras for the calorie-light [itty-router](https://www.npmjs.com/package/itty-router).

## Installation

```
npm install itty-router itty-router-extras
```

# Includes the following:

### class
- **[StatusError](#statuserror)** - throw these to control HTTP status codes that itty responds with.

### middleware (add inline as route handlers)
- **[withContent](#withcontent)** - safely parses and embeds content request bodies (e.g. text/json) as `request.content`
- **[withCookies](#withcookies)** - embeds cookies into request as `request.cookies` (object)
- **[withParams](#withparams)** - embeds route params directly into request as a convenience

### response
- **[error](#error)** - returns JSON-formatted Response with `{ error: message, status }` and the matching status code on the response.
- **[json](#json)** - returns JSON-formatted Response with options passed to the Response (e.g. headers, status, etc)
- **[status](#status)** - returns JSON-formatted Response with `{ message, status }` and the matching status code on the response.
- **[text](#text)** - returns plaintext-formatted Response with options passed to the Response (e.g. headers, status, etc). This is simply a normal Response, but included for code-consistency with `json()`

### routers
- **[ThrowableRouter](#throwablerouter)** - this is a convenience wrapper around [itty-router](https://www.npmjs.com/package/itty-router) that simply adds automatic exception handling, rather than requiring `try/catch` blocks within your middleware/handlers, or manually calling a `.catch(error)` on the `router.handle`.  Itty core is fantastic (biased review), but let's face it - first unhandled exception and BOOM - your Worker explodes.  This prevents that from happening!  Personally, this one is an absolute must for my projects to cut down on boilerplate code AND random CF explosions.

## Example
```js
import {
  json,
  missing,
  error,
  withContent,
  withParams,
  ThrowableRouter,
} from 'itty-router-extras'

const todos = [
  { id: '13', value: 'foo' },
  { id: '14', value: 'bar' },
  { id: '15', value: 'baz' },
]

// create an error-safe itty router
const router = ThrowableRouter({ base: '/todos' })

// optional [safe] shortcut to avoid per-route calls below
// router.all('*', withParams, withContent)

// GET collection index
router.get('/', () => asJSON(todos))

// GET item - only return if found
router.get('/:id', withParams, ({ id }) => {
  const todo = todos.find(t => t.id === id)

  if (todo) {
    return json(todo)
  }
})

// POST to the collection
router.post('/', withContent, ({ content }) =>
  content
  ? json({
      created: 'todo',
      value: content,
    })
  : error(400, 'You probably need some content for that...')
)

// 404 for everything else
router.all('*', () => missing('Are you sure about that?'))

// attach the router "handle" to the event handler
addEventListener('fetch', event =>
  event.respondWith(router.handle(event.request))
)
```

# API

### Classes

##### `StatusError(status: number, message: string): Error` <a id="statuserror"></a>
```js
import { ThrowableRouter, StatusError } from 'itty-router-extras'

router.get('/bad', () => {
  throw new StatusError(400, 'Bad Request')
})

// GET /bad
400 {
  error: 'Bad Request',
  status: 400
}
```

### Middleware

##### `withContent: function` <a id="withcontent"></a>
```js
import { ThrowableRouter, StatusError } from 'itty-router-extras'

const router = ThrowableRouter()

router
  .post('/form', withContent, ({ content }) => {
    // body content (json, text, or form) is parsed and ready to go, if found.
  })
  .post('/otherwise', async request => {
    try {
      const content = await request.json()

      // do something with the content
    } catch (err) {
      throw new StatusError(400, 'Bad Request')
    }
  })
```

##### `withCookies: function` <a id="withcookies"></a>
```js
import { withCookies } from 'itty-router-extras'

router.get('/foo', withCookies, ({ cookies }) => {
  // cookies are parsed from the header into request.cookies
})
```

##### `withParams: function` <a id="withparams"></a>
```js
import { withParams } from 'itty-router-extras'

router
  .get('/:collection/:id?', withParams, ({ collection, id }) => {
    // route params are embedded into the request for convenience
  })
  .get('/otherwise/:collection/:id?', ({ params }) => {
    // this just saves having to extract params from the request.params object
    const { collection, id } = params
  })
```

### Response


##### `error(status: number, message?: string): Response` <a id="error"></a>
```js
import { error, json } from 'itty-router-extras'

router.get('/secrets', request =>
  request.isLoggedIn
  ? json({ my: 'secrets' })
  : error(401, 'Not Authenticated')
)

// GET /secrets -->
401 {
  error: 'Not Authenticated',
  status: 401
}
```

##### `json(content: object, options: object): Response` <a id="json"></a>
```js
const todos = [
  { id: 1, text: 'foo' },
  { id: 2, text: 'bar' },
]

router.get('/todos', () => json(todos))
```

##### `missing(message?: string): Response` <a id="missing"></a>
```js
router.get('/not-found', () => missing('Oops!  We could not find that page.'))

// GET /not-found -->
404 {
  error: 'Oops!  We could not find that page.',
  status: 404
}
```

##### `status(status: number, message?: string): Response` <a id="status"></a>
```js
router
  .post('/success', withContent, ({ content }) => status(204, 'Success!'))
  .post('/silent-success', withContent, ({ content }) => status(204))

// POST /success -->
204 {
  message: 'Success!',
  status: 204
}

// POST /silent-success -->
204
```

##### `text(content: string, options?: object): Response` <a id="text"></a>
```js
router.get('/plaintext', () => text('OK!'))

// GET /plaintext -->
200 OK!
```

### Routers

#### `ThrowableRouter(options?: object): Proxy` <a id="throwablerouter"></a>
```js
import { ThrowableRouter, StatusError } from 'itty-router-extras'

const router = ThrowableRouter()

router
  .get('/accidental', request => request.oops.this.doesnt.exist)
  .get('/intentional', request => {
    throw new StatusError(400, 'Bad Request')
  })

// GET /accidental
500 {
  error: 'Internal Error.',
  status: 500,
}

// GET /intentional
400 {
  error: 'Bad Request',
  status: 400,
}
```

[twitter-image]:https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fitty-router-extras
[logo-image]:https://user-images.githubusercontent.com/865416/112549341-a4377300-8d8b-11eb-8977-574967dede99.png
[gzip-image]:https://img.shields.io/bundlephobia/minzip/itty-router-extras
[gzip-url]:https://bundlephobia.com/result?p=itty-router-extras
[issues-image]:https://img.shields.io/github/issues/kwhitley/itty-router-extras
[issues-url]:https://github.com/kwhitley/itty-router-extras/issues
[npm-image]:https://img.shields.io/npm/v/itty-router-extras.svg
[npm-url]:http://npmjs.org/package/itty-router-extras
[travis-image]:https://travis-ci.org/kwhitley/itty-router-extras.svg?branch=v0.x
[travis-url]:https://travis-ci.org/kwhitley/itty-router-extras
[david-image]:https://david-dm.org/kwhitley/itty-router-extras/status.svg
[david-url]:https://david-dm.org/kwhitley/itty-router-extras
[coveralls-image]:https://coveralls.io/repos/github/kwhitley/itty-router-extras/badge.svg?branch=v0.x
[coveralls-url]:https://coveralls.io/github/kwhitley/itty-router-extras?branch=v0.x

## Contributors
These folks are the real heroes, making open source the powerhouse that it is!  Help out and get your name added to this list! <3

#### Core, Concepts, and Codebase
- [@mvasigh](https://github.com/mvasigh) - for constantly discussing these ridiculously-in-the-weeds topics with me.  And then for writing the TS interfaces (or simply re-writing in TS), right Mehdi??

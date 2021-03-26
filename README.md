# ![Itty Router][logo-image]

[![npm package][npm-image]][npm-url]
[![minified + gzipped size][gzip-image]][gzip-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Open Issues][issues-image]][issues-url]
<a href="https://github.com/kwhitley/itty-router-extras" target="\_parent">
  <img alt="" src="https://img.shields.io/github/stars/kwhitley/itty-router-extras.svg?style=social&label=Star" />
</a>
<a href="https://twitter.com/kevinrwhitley" target="\_parent">
  <img alt="" src="https://img.shields.io/twitter/follow/kevinrwhitley.svg?style=social&label=Follow" />
</a>

An assortment of delicious extras for the calorie-light [itty-router](https://www.npmjs.com/package/itty-router).

## Installation

```
npm install itty-router itty-router-extras
```

## Example
```js
import { Router } from 'itty-router'
import {
  json,
  missing,
  error,
  withContent,
  withParams,
} from 'itty-router-extras'

const todos = [
  { id: '13', value: 'foo' },
  { id: '14', value: 'bar' },
  { id: '15', value: 'baz' },
]

// create a router
const router = Router({ base: '/todos' }) // this is a Proxy, not a class

// optional shortcut to avoid per-route calls
// router.all('*', withParams, withContent)

// GET collection index
router.get('/', () => asJSON(todos))

// GET item - only return if found
router.get('/:id', withParams, ({ id }) => {
  const todo = todos.find(t => t.id === id)
  if (todo) return json(todo)
})

// POST to the collection
router.post('/todos', withContent, ({ content }) => {
  return content
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
  // router.handle expects a Request as the first param, then anything else gets passed along!
  event.respondWith(router.handle(event.request))
)
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

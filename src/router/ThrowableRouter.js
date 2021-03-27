'use strict'

const { Router } = require('itty-router')
const { error } = require('../response')

const ThrowableRouter = (options = {}) =>
  new Proxy(Router(options), {
    get: (obj, prop) => (...args) =>
        prop === 'handle'
        ? obj[prop](...args).catch(err => error(err.status || 500, err.message))
        : obj[prop](...args)
  })

module.exports = { ThrowableRouter }

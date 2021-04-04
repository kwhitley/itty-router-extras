const retrieve = (predicate, fn) => request => {
  request.proxy = new Proxy(request, {
    get: (obj, prop) => predicate(prop, obj)
                        ? fn(prop, request)
                        : obj[prop]
  })
}

module.exports = { retrieve }

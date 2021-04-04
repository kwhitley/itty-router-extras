const watch = (predicate, fn) => request => {
  request.proxy = new Proxy(request, {
    set: (obj, prop, value) => {
      obj[prop] = value

      const passes = typeof predicate === 'function'
      ? predicate(prop, obj)
      : obj.hasOwnProperty(prop)

      if (passes) {
        fn(value, prop, request)
      }

      return true
    }
  })
}

module.exports = { watch }

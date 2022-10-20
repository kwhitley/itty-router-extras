export const watch = (predicate, fn) => (request) => {
  request.proxy = new Proxy(request.proxy || request, {
    set: (obj, prop, value) => {
      obj[prop] = value

      const passes =
        typeof predicate === 'function' ? predicate(prop, obj) : obj.hasOwnProperty(prop)

      if (passes) {
        fn(value, prop, request)
      }

      return true
    },
  })
}

// withParams - injects route params within request at top level
const withParams = request => {
  Object.assign(request, request.params || {})
}

module.exports = { withParams }

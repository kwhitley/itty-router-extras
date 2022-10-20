/**
 * withParams - injects route params within request at top level
 */
export const withParams = (request) => {
  for (const param in request.params || {}) {
    request[param] = request.params[param]
  }
}

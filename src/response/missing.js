const { error } = require('./error')

const missing = (message = 'Not found.') => error(404, message)

module.exports = { missing }

const { error } = require('./error')

const missing = (message = 'Not found.', other = {}) => error(404, message, other)

module.exports = { missing }

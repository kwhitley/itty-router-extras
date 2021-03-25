const { missing } = require('../response/missing')

const missingHandler = (message = 'Not found.') => error(message, 404)

module.exports = { missing }

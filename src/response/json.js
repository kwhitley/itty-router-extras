const { createResponseType } = require('./createResponseType')

const json = createResponseType('application/json; charset=utf-8')

module.exports = { json }

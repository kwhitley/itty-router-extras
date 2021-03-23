const { readFileSync, writeFileSync } = require('fs-extra')

const base = readFileSync('./src/index.js', { encoding: 'utf-8' })
const minifiedBase = base
  .replace(/\bhandlers\b/g, 'hs') // Handler(S)
  .replace(/\bhandler\b/g, 'h') // Handler
  .replace(/([^\.])obj\b/g, '$1t') // Target
  .replace(/([^\.])options\b/g, '$1o') // Options
  .replace(/([^\.])receiver\b/g, '$1c') // Options
  .replace(/([^\.])route\b/g, '$1p') // Path
  .replace(/([^\.])\.routes\b/g, '$1\.r') // routes Queue
  .replace(/args/g, 'a') // Args
  .replace(/([^\.])request\b/g, '$1r') // Request
  .replace(/([^\.])response\b/g, '$1s') // reSponse
  .replace(/([^\.])match\b/g, '$1m') // Match
  .replace(/([^\.])prop\b/g, '$1k') // Key
  .replace(/([^\.])url\b/g, '$1u') // Url
writeFileSync('./dist/index.js', minifiedBase)
console.log('minifying variables --> dist/index.js')

const test = readFileSync('./src/index.spec.js', { encoding: 'utf-8' })
const minifiedTest = test.replace('index.js', 'index.min.js')
writeFileSync('./dist/index.spec.js', minifiedTest)
console.log('creating dist tests --> dist/index.spec.js')
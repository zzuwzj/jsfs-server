const log = console.log
const isDebug = true

module.exports = {
  info: log,
  debug: isDebug ? args => log(...args) : null
}

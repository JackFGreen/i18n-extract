const swc = require('@swc/core')

function parse({ code }) {
  const m = swc.parseSync(code)
  return m
}

function print({ ast }) {
  const m = swc.printSync(ast)
  return m
}

module.exports = {
  parse,
  print,
}

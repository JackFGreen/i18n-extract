const swc = require('@swc/core')

async function parse({ code }) {
  const m = await swc.parse(code,{
    fileName: 'i18n.js',
  })
  return m
}

async function print({ ast }) {
  const m = await swc.print(ast)
  return m
}

module.exports = {
  parse,
  print,
}

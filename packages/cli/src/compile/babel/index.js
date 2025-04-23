const babelCore = require('@babel/core')
const babelParser = require('@babel/parser')
const babelGenerator = require('@babel/generator')
const myPlugin = require('./plugin')

function transform({ code }, options) {
  const m = babelCore.transform(code, {
    generatorOpts: {
      jsescOption: {
        quotes: 'single',
        // 不转译中文到 unicode
        minimal: true,
      },
    },
    plugins: [myPlugin(options)],
  })
  return m
}

function parse({ code }) {
  const m = babelParser.parse(code)
  return m
}

function print({ ast }) {
  const m = babelGenerator.generate(ast)
  return m
}

module.exports = {
  transform,
  parse,
  print,
}

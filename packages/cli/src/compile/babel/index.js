const babelCore = require('@babel/core')
const babelParser = require('@babel/parser')
const babelGenerator = require('@babel/generator')
const babelTraverse = require('@babel/traverse')
const myPlugin = require('./plugin')

function transform({ code }, options) {
  const ast = parse({ code }, options)
  babelTraverse.default(ast, myPlugin().visitor)
  const m = print({ ast }, options)
  return m
}

function parse({ code }, options) {
  const plugins = []

  if (options.ext === '.jsx') {
    plugins.push('jsx')
  }

  if (options.ext === '.ts') {
    plugins.push('typescript')
  }

  const m = babelParser.parse(code, {
    plugins,
  })
  return m
}

function print({ ast }) {
  const m = babelGenerator.generate(ast, {
    jsescOption: {
      quotes: 'single',
      // 不转译中文到 unicode
      minimal: true,
    },
  })

  return m
}

module.exports = {
  transform,
  parse,
  print,
}

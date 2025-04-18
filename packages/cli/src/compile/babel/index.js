const babelCore = require('@babel/core')
const babelParser = require('@babel/parser')
const babelGenerator = require('@babel/generator')

function transform({ code }) {
  const m = babelCore.transform(code)
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

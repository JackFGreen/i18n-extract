const swc = require('@swc/core')
const { MyVisitor } = require('./plugin')

function transform({ code }) {
  const m = swc.transformSync(code, {
    /**
     * plugin will remove comments
     * AST not support
     * https://github.com/swc-project/swc/issues/4165
     */
    // plugin: (m) => {
    //   // return new MyVisitor().visitProgram(m)
    //   return m
    // },
  })
  return m
}

function parse({ code }) {
  const m = swc.parseSync(code)
  return m
}

function print({ ast }) {
  const m = swc.printSync(ast)
  return m
}

module.exports = {
  transform,
  parse,
  print,
}

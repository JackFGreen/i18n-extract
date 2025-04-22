const t = require('@babel/types')
const babelGenerator = require('@babel/generator')

function gen$t(s) {
  return t.callExpression(t.identifier('$t'), [t.stringLiteral(s)])
}

/**
 *
 * TemplateLiteral => TemplateElement.{value.cooked | value.raw}
 * StringLiteral.{value | extra.raw | extra.rawValue}
 *
 * @returns {import('@babel/core').PluginItem}
 */
function myPlugin(options) {
  const { debug } = options

  return {
    visitor: {
      StringLiteral(path) {
        if (debug) {
          console.log(
            'StringLiteral',
            babelGenerator.generate(path.parent, {
              jsescOption: {
                // 不转译中文到 unicode
                minimal: true,
              },
            }).code
          )
        }

        if (t.isCallExpression(path.parent)) {
          if (path.parent.callee.name === '$t') {
            return
          }
        }

        const $t = gen$t(path.node.value)

        path.replaceWith($t)
      },
      TemplateLiteral(path) {
        if (debug) {
          console.log(
            'TemplateLiteral',
            babelGenerator.generate(path.node, {
              jsescOption: {
                // 不转译中文到 unicode
                minimal: true,
              },
            }).code
          )
        }

        const hasStr = path.node.quasis.find(
          (quas) => t.isTemplateElement(quas) && quas.value.raw.trim() !== ''
        )

        if (!hasStr) {
          return
        }

        // quasis.length = expressions.length + 1
        const quasis = []
        const exprs = []

        for (let i = 0; i < path.node.quasis.length; i++) {
          const quas = path.node.quasis[i]
          const expr = path.node.expressions[i]

          // 替换 str 为 $t
          // quasis[i] => ''
          // exprs[i] => $t
          if (t.isTemplateElement(quas) && quas.value.raw.trim() !== '') {
            const $t = gen$t(quas.value.raw)
            quasis.push(t.templateElement({ raw: '' }))
            quasis.push(t.templateElement({ raw: '' }))
            exprs.push($t)
            if (expr) exprs.push(expr)
          } else {
            quasis.push(quas)
            if (expr) exprs.push(expr)
          }
        }

        const literal = t.templateLiteral(quasis, exprs)
        path.replaceWith(literal)
      },
    },
  }
}

module.exports = myPlugin

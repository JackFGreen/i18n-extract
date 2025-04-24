const t = require('@babel/types')
const babelGenerator = require('@babel/generator')

function cleanComments(path) {
  // 检查当前节点是否有 leadingComments
  if (path.node.leadingComments) {
    // 确保每个注释只附加到一个节点
    path.node.leadingComments.forEach((comment) => {
      if (comment.leading) {
        // 如果注释已经被附加到其他节点，移除它
        if (comment.attached) {
          path.node.leadingComments = path.node.leadingComments.filter((c) => !c.attached)
        } else {
          comment.attached = true
        }
      }
    })
  }

  // 检查当前节点是否有 trailingComments
  if (path.node.trailingComments) {
    path.node.trailingComments.forEach((comment) => {
      if (comment.trailing) {
        // 如果注释已经被附加到其他节点，移除它
        if (comment.attached) {
          path.node.trailingComments = path.node.trailingComments.filter((c) => !c.attached)
        } else {
          comment.attached = true
        }
      }
    })
  }
}

function gen$t(s) {
  return t.callExpression(t.identifier('$t'), [t.stringLiteral(s)])
}

function replaceStringLiteral(path) {
  const $t = gen$t(path.node.value)
  path.replaceWith($t)
}

function replaceTemplateLiteral(path) {
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
}

function replaceJSXText(path) {
  const $t = gen$t(path.node.value)
  const expr = t.jsxExpressionContainer($t)
  path.replaceWith(expr)
}

/**
 *
 * TemplateLiteral => TemplateElement.{value.cooked | value.raw}
 * StringLiteral.{value | extra.raw | extra.rawValue}
 *
 * @returns {import('@babel/core').PluginItem}
 */
function myPlugin(options) {
  const { debug } = options || {}

  return {
    name: 'my-plugin',
    visitor: {
      enter(path) {
        cleanComments(path)

        if (
          !t.isStringLiteral(path.node) &&
          !t.isTemplateLiteral(path.node) &&
          !t.isJSXText(path.node)
        ) {
          return
        }

        // already replaced
        if (t.isCallExpression(path.parent) || t.isOptionalCallExpression(path.parent)) {
          if (path.parent.callee.name === '$t') {
            return
          }
        }

        if (debug) {
          console.log(
            path.node.type,
            babelGenerator.generate(path.node, {
              jsescOption: {
                // 不转译中文到 unicode
                minimal: true,
              },
            }).code
          )
        }

        if (t.isStringLiteral(path.node)) {
          replaceStringLiteral(path)
        }

        if (t.isTemplateLiteral(path.node)) {
          replaceTemplateLiteral(path)
        }

        if (t.isJSXText(path.node)) {
          replaceJSXText(path)
        }
      },
    },
  }
}

module.exports = myPlugin

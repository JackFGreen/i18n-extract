const fs = require('fs')
const path = require('path')
const compile = require('../compile')

function parse(filePath, options) {
  console.log('[parse] file to AST:', filePath)
  const code = fs.readFileSync(filePath, 'utf-8')

  const ast = compile.parse(
    { code },
    {
      ...options,
      file: filePath,
      ext: path.extname(filePath),
    }
  )
  const str = JSON.stringify(ast, null, 2)

  const astFilePath = filePath + '.ast.json'

  console.log('[parse] write AST to:', astFilePath)

  fs.writeFileSync(astFilePath, str, 'utf-8')

  console.log('[parse] write AST done!')
}

module.exports = parse

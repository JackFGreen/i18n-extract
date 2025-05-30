const fs = require('fs')
const path = require('path')
const compile = require('../compile')

function print(filePath, options) {
  console.log('[print] AST file to code:', filePath)
  const ast = fs.readFileSync(filePath, 'utf-8')

  const { code } = compile.print(
    { ast: JSON.parse(ast) },
    {
      ...options,
      file: filePath,
      ext: path.extname(filePath),
    }
  )

  const originFilePath = filePath.replace('.ast.json', '')
  const originFileNames = originFilePath.split('.')
  const codeASTFilePath = [
    ...originFileNames.slice(0, -1),
    'ast.json',
    originFileNames.at(-1),
  ].join('.')

  console.log('[print] write code to:', codeASTFilePath)

  fs.writeFileSync(codeASTFilePath, code, 'utf-8')

  console.log('[print] write code done!')
}

module.exports = print

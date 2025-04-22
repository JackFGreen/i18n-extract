const fs = require('fs')
const path = require('path')
const compile = require('../compile')

function transform(filePath, options) {
  const { debug } = options

  console.log('[transform] from file:', filePath)
  const oldCode = fs.readFileSync(filePath, 'utf-8')

  const { code } = compile.transform({ code: oldCode }, options)

  if (debug) {
    console.log('[transform] from code:', code)
  }

  const originFilePath = filePath.replace('.ast.json', '')
  const originFileNames = originFilePath.split('.')
  const codeASTFilePath = [
    ...originFileNames.slice(0, -1),
    'ast.json',
    originFileNames.at(-1),
  ].join('.')

  console.log('[transform] to file:', codeASTFilePath)

  fs.writeFileSync(codeASTFilePath, code, 'utf-8')

  console.log('[transform] done!')
}

module.exports = transform

const fs = require('fs')
const path = require('path')
const compile = require('../compile')

function transform(filePath) {
  console.group('[transform] file to AST:', filePath)
  const code = fs.readFileSync(filePath, 'utf-8')

  const newCode = compile.transform({ code })
  console.log('[transform] newCode:', newCode)

  console.groupEnd()
}

module.exports = transform

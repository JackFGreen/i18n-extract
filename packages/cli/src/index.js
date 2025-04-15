const fs = require('fs')
const path = require('path')
const { Command } = require('commander')
const program = new Command()
const pkg = require('../package.json')
const { name, version } = pkg
const { parse, print } = require('./parse')

program.name(name).version(version)

program
  .command('parse')
  .description('Parse code to AST')
  .argument('<file>', 'file path')
  .action(async (url, options) => {
    const root = process.cwd()
    const filePath = path.join(root, url)

    console.log('[parse] file to AST:', filePath)
    const code = fs.readFileSync(filePath, 'utf-8')

    const ast = await parse({ code })
    const str = JSON.stringify(ast, null, 2)

    const astFilePath = filePath + '.ast.json'

    console.log('[parse] write AST to:', astFilePath)
    fs.writeFileSync(astFilePath, str, 'utf-8')
    console.log('[parse] write AST done!')
  })

program
  .command('print')
  .description('Print AST to code')
  .argument('<file>', 'file path')
  .action(async (url, options) => {
    const root = process.cwd()
    const filePath = path.join(root, url)

    console.log('[print] AST file to code:', filePath)
    const ast = fs.readFileSync(filePath, 'utf-8')

    const { code } = await print({ ast: JSON.parse(ast) })

    const originFilePath = filePath.replace('.ast.json', '')
    const originFileNames = originFilePath.split('.')
    const codeASTFilePath = [...originFileNames.slice(0, -1), 'ast.json', originFileNames.at(-1)].join(
      '.'
    )

    console.log('[print] write code to:', codeASTFilePath)

    fs.writeFileSync(codeASTFilePath, code, 'utf-8')
    console.log('[print] write code done!')
  })

program.parse()

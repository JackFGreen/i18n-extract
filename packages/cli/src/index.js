const fs = require('fs')
const path = require('path')
const { Command } = require('commander')
const program = new Command()
const pkg = require('../package.json')
const { name, version } = pkg
const parse = require('./parse')
const print = require('./print')
const { runInDirectory } = require('./utils')

program.name(name).version(version)

program
  .command('parse')
  .description('Parse code to AST')
  .argument('[file]', 'file path')
  .option('-d, --dir <directory>', 'directory path')
  .action((url, options) => {
    const root = process.cwd()

    console.group('---parse start---')

    if (url) {
      const filePath = path.join(root, url)
      parse(filePath)
    }

    if (options.dir) {
      const dirPath = path.join(root, options.dir)

      runInDirectory(dirPath, (filePath) => {
        if (/\.ast\.json/.test(filePath)) {
          return
        }
        parse(filePath)
      })
    }

    console.log('---parse end---')
    console.groupEnd()
  })

program
  .command('print')
  .description('Print AST to code')
  .argument('[file]', 'file path')
  .option('-d, --dir <directory>', 'directory path')
  .action((url, options) => {
    const root = process.cwd()

    console.group('---print start---')

    if (url) {
      const filePath = path.join(root, url)
      print(filePath)
    }

    if (options.dir) {
      const dirPath = path.join(root, options.dir)

      runInDirectory(dirPath, (filePath) => {
        if (/\.ast\.json$/.test(filePath)) {
          print(filePath)
        }
      })
    }

    console.log('---print end---')
    console.groupEnd()
  })

program.parse()

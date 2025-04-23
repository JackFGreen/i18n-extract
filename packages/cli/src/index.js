const fs = require('fs')
const path = require('path')
const { Command } = require('commander')
const program = new Command()
const pkg = require('../package.json')
const { name, version } = pkg
const { parse, print, transform } = require('./cmd')
const { runInDirectory } = require('./utils')

program.name(name).version(version)

program
  .command('transform')
  .description('Transform code')
  .argument('[file]', 'file path')
  .option('-d, --dir <directory>', 'directory path')
  .option('--debug', 'console debug log')
  .action((url, options) => {
    const root = process.cwd()

    console.log('---transform start---')

    if (url) {
      const filePath = path.join(root, url)
      transform(filePath, {
        debug: options.debug,
      })
    }

    if (options.dir) {
      const dirPath = path.join(root, options.dir)

      runInDirectory(dirPath, (filePath) => {
        if (/\.ast\.json/.test(filePath)) {
          return
        }

        transform(filePath, {
          debug: options.debug,
        })
      })
    }

    console.log('---transform end---')
  })

program
  .command('parse')
  .description('Parse code to AST')
  .argument('[file]', 'file path')
  .option('-d, --dir <directory>', 'directory path')
  .option('--debug', 'console debug log')
  .action((url, options) => {
    const root = process.cwd()

    console.log('---parse start---')

    if (url) {
      const filePath = path.join(root, url)
      parse(filePath, {
        debug: options.debug,
      })
    }

    if (options.dir) {
      const dirPath = path.join(root, options.dir)

      runInDirectory(dirPath, (filePath) => {
        if (/\.ast\.json/.test(filePath)) {
          return
        }
        parse(filePath, {
          debug: options.debug,
        })
      })
    }

    console.log('---parse end---')
  })

program
  .command('print')
  .description('Print AST to code')
  .argument('[file]', 'file path')
  .option('-d, --dir <directory>', 'directory path')
  .option('--debug', 'console debug log')
  .action((url, options) => {
    const root = process.cwd()

    console.log('---print start---')

    if (url) {
      const filePath = path.join(root, url)
      print(filePath, {
        debug: options.debug,
      })
    }

    if (options.dir) {
      const dirPath = path.join(root, options.dir)

      runInDirectory(dirPath, (filePath) => {
        if (/\.ast\.json$/.test(filePath)) {
          print(filePath, {
            debug: options.debug,
          })
        }
      })
    }

    console.log('---print end---')
  })

program.parse()

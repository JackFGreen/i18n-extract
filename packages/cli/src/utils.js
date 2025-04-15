const fs = require('fs')
const path = require('path')

function runInDirectory(pre, cur, cb) {
  const dirPath = path.join(pre, cur)
  const files = fs.readdirSync(dirPath)

  console.group('Directory:', dirPath)

  files.forEach((file) => {
    const filePath = path.join(dirPath, file)
    const stat = fs.statSync(filePath)

    const isDirectory = stat.isDirectory()

    if (isDirectory) {
      runInDirectory(dirPath, file, cb)
    }

    if (stat.isFile()) {
      cb(filePath)
    }
  })

  console.groupEnd()
}

module.exports = {
  runInDirectory,
}

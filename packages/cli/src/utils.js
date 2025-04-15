const fs = require('fs')
const path = require('path')

function runInDirectory(dirPath, cb) {
  const files = fs.readdirSync(dirPath)

  console.group('Directory:', dirPath)

  files.forEach((file) => {
    const filePath = path.join(dirPath, file)
    const stat = fs.statSync(filePath)

    const isDirectory = stat.isDirectory()

    if (isDirectory) {
      runInDirectory(path.join(dirPath, file), cb)
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

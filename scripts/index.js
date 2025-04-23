const { exec } = require('child_process')

const args = process.argv.slice(2)

const cmds = ['transform', 'parse', 'print']
const cmdsDir = cmds.map((o) => `${o}:dir`)

const cmd = args[0]
if (!cmds.includes(cmd) && !cmdsDir.includes(cmd)) {
  console.error('Please use transform, parse or print')
  process.exit(1)
}

const isExt = args[1] === '--ext'
if (!isExt) {
  console.error('Please use --ext to specify the file extension')
  process.exit(1)
}

const exts = args[2].split(',')

for (const ext of exts) {
  const command = `pnpm --filter @i18n-extract/playground-${ext} i18n:${cmd}`

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`)
      return
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`)
      return
    }
    console.log(`stdout: ${stdout}`)
  })
}

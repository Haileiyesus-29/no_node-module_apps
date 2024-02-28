const net = require('node:net')
const readline = require('node:readline/promises')

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
})

const clearLine = dir => {
   return new Promise(resolve => {
      process.stdout.clearLine(dir, () => {
         resolve()
      })
   })
}

const moveCursor = (dx, dy) => {
   return new Promise(resolve => {
      process.stdout.moveCursor(dx, dy, () => {
         resolve()
      })
   })
}

let id = null

const socket = net.createConnection({ port: 9000 })

socket.on('data', async data => {
   const dataString = data.toString('utf-8').trim()
   if (dataString.startsWith('Your id is')) {
      id = dataString.substring(dataString.indexOf(':') + 1)
   }
   console.log()
   await moveCursor(0, -1)
   await clearLine(0)
   console.log(data.toString())
   ask(socket)
})

socket.on('close', async () => {
   console.log('connection closed')
   rl.close()
})

async function ask() {
   const message = await rl.question('Write a message > ')
   await moveCursor(0, -1)
   await clearLine(0)
   socket.write(`${id}:${message}`)
}

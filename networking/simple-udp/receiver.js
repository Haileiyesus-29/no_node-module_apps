const dgram = require('node:dgram')

const receiver = dgram.createSocket('udp6')

receiver.on('error', err => {
   console.error(err)
   receiver.close()
})

const sendMessage = rinfo => {
   receiver.send('hello from server!', rinfo.port, rinfo.address, console.log)
}

receiver.on('message', (msg, rinfo) => {
   console.log(msg.toString())
   sendMessage(rinfo)
})

receiver.on('listening', () => {
   const address = receiver.address()
   console.log(`server listening ${address.address}:${address.port}`)
})

receiver.bind(1122, 'localhost')

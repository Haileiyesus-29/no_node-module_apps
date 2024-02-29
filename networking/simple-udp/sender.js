const dgram = require('node:dgram')

const sender = dgram.createSocket('udp6')

const sendMessage = rinfo => {
   sender.send('hello from sender!', rinfo.port, rinfo.address, console.log)
}

sender.on('message', (message, rinfo) => {
   console.log(message.toString())
   sendMessage(rinfo)
})

sendMessage({ port: 1122, address: '::1' })

const net = require('node:net')

const socket = net.createConnection({ port: 8080, host: '127.0.0.1' }, () => {
   const buff = Buffer.alloc(10)
   socket.write(buff)
})

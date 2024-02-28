const net = require('node:net')
const server = net.createServer()

let clients = []

server.on('connection', socket => {
   const newId = clients.length + 1
   clients.push({ socket, id: newId })
   socket.write(`Your id is : ${newId}`)
   clients
      .filter(client => client.socket !== socket)
      .forEach(client => {
         client.socket.write(`User ${newId} joined the chat`)
      })

   socket.on('data', data => {
      const dataString = data.toString('utf-8').trim()
      const userId = dataString.substring(0, dataString.indexOf(':'))
      const message = dataString.substring(dataString.indexOf(':') + 1)

      clients.forEach(client => {
         client.socket.write(`User ${userId} says: ${message}`)
      })
   })

   socket.on('end', () => {
      clients = clients.filter(client => client.socket !== socket)
      clients.forEach(client => {
         client.socket.write(`User ${newId} left the chat`)
      })
   })
})

server.listen(9000, () => console.log('server started,', server.address()))

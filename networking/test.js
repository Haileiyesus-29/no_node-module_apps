const http = require('node:http')
const { json } = require('stream/consumers')

const server = http.createServer((req, res) => {
   res.writeHead(200, { 'Content-Type': 'application/json' })
   res.end(
      JSON.stringify({ message: 'Hello, World!. This is a node server...' })
   )
})

server.listen(1122, '192.168.237.202', () => {
   console.log('Server is running', server.address())
})

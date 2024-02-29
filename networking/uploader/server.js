const net = require('node:net')
const fs = require('node:fs/promises')

const server = net.createServer()

server.on('connection', async socket => {
   let dest = null
   let writeStream = null
   console.log('client connected')

   socket.on('data', async chunk => {
      if (!dest) {
         socket.pause()
         const indexOfData = chunk.indexOf('||')
         const fileName = chunk.subarray(0, indexOfData)
         dest = await fs.open(`storage/${fileName}`, 'w')
         writeStream = dest.createWriteStream()
         socket.resume()
         writeStream.write(chunk.subarray(indexOfData + 2))
         writeStream.on('drain', () => {
            socket.resume()
         })
      } else {
         if (!writeStream.write(chunk)) {
            socket.pause()
         }
      }
   })

   socket.on('end', () => {
      console.log('connection closed!')
      dest?.close()
      writeStream?.end()

      dest = null
      writeStream = null
   })
})

server.listen(1122, '::1', () =>
   console.log('server listening on ', server.address())
)

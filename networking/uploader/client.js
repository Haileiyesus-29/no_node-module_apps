const net = require('node:net')
const fs = require('node:fs/promises')
const path = require('node:path')

console.log()
const client = net.createConnection({ port: 1122, host: '::1' }, async () => {
   const fileName = process.argv[2]
   if (!fileName) return console.log('file name required.')

   let file = null
   try {
      file = await fs.open(fileName, 'r')
   } catch (error) {
      client.end()
      return console.log(error)
   }

   const readStream = file.createReadStream()
   const fileSize = (await file.stat()).size
   let uploaded = 0
   let scale = 0.01

   client.write(Buffer.from(`${path.basename(fileName)}||`))

   readStream.on('data', chunk => {
      if (client.write(chunk)) {
         uploaded += chunk.length
      } else {
         readStream.pause()
      }

      if (uploaded / fileSize >= scale) {
         process.stdout.moveCursor(0, -1, () => {
            process.stdout.clearLine(0, () => {
               console.log(
                  `Uploading... ${Math.ceil((uploaded * 100) / fileSize)}% `
               )
            })
         })
         if (scale < 1) scale += 0.01
      }
   })

   client.on('drain', () => {
      readStream.resume()
   })

   readStream.on('end', () => {
      file.close()
      client.end()
   })

   client.on('end', () => {
      console.log('upload complete!')
   })
})

client.on('data', data => {
   console.log(data.toString())
})

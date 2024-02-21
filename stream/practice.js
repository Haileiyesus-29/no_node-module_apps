const fs = require('node:fs/promises')
const { Buffer } = require('node:buffer')

;(async () => {
   const src = await fs.open('temp-sm.txt', 'r')
   const dest = await fs.open('dest.txt', 'w')

   const readStream = src.createReadStream()
   const writeStream = dest.createWriteStream()

   readStream.on('data', chunk => {
      console.log(read)
      writeStream.write(chunk)
   })

   writeStream.on('drain', () => console.log('drained'))
})()

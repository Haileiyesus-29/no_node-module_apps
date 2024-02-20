const fs = require('node:fs/promises')
const { Buffer } = require('node:buffer')

const WRITE_NUMBER = 1000000

;(async () => {
   const file = await fs.open('temp-gigantic.txt', 'w')
   const stream = file.createWriteStream({ highWaterMark: 512 * 1024 })

   console.time('stream-time')
   let i = 0
   let drain = 0
   const writeMany = () => {
      while (i < WRITE_NUMBER) {
         const buff = Buffer.from(` ${i} `)
         i++
         if (!stream.write(buff)) break
         if (i === WRITE_NUMBER) {
            stream.close()
            console.log(drain)
            console.timeEnd('stream-time')
         }
      }
   }
   writeMany()

   stream.on('drain', () => {
      drain++
      writeMany()
   })
})()

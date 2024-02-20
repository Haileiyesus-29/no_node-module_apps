const fs = require('node:fs/promises')
const { Buffer } = require('node:buffer')

;(async () => {
   const file = await fs.open('text.txt', 'a')
   console.time('bm')

   const stream = file.createWriteStream()

   for (let i = 0; i < 10000000; i++) {
      const Buff = Buffer.from(` ${i} `, 'utf-8')
      stream.write(Buff)
   }
   console.timeEnd('bm')
})()

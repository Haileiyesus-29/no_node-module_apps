const fs = require('node:fs/promises')
const { Buffer } = require('node:buffer')

;(async () => {
   const file = await fs.open('copy.txt', 'r')
   const size = (await file.stat()).size
   const buff = Buffer.alloc(size)

   const data = (await file.read(buff, 0, buff.byteLength, 0)).buffer.toString(
      'utf-8'
   )
   const transformed = data.split('  ').map(num => Number(num.trim()))
   let i = 0
   transformed.forEach(element => {
      if (element !== i) {
         console.log(`test failed at - el=${element} and i=${i}`)
      }
      i += 2
   })
})()

const fs = require('node:fs/promises')

let temp = ''
;(async () => {
   const readingFile = await fs.open('temp-sm.txt', 'r')
   const writingFile = await fs.open('copy.txt', 'w')

   console.time('read-write')
   const readStream = readingFile.createReadStream({ highWaterMark: 64 * 1024 })
   const writeStream = writingFile.createWriteStream()

   readStream.on('data', chunk => {
      const numbers = chunk.toString('utf-8').split('  ')

      if (Number(numbers[0]) !== Number(numbers[1]) - 1) {
         if (temp) numbers[0] = temp + numbers[0]
      }
      if (
         Number(numbers[numbers.length - 2]) !==
         Number(numbers[numbers.length - 1]) - 1
      ) {
         temp = numbers.pop()
      }

      numbers.forEach(number => {
         if (Number(number) % 2 === 0) {
            writeStream.write(' ' + Number(number) + ' ')
            // console.log(number)
            // // if (!writeStream.write(` ${+number} `)) {
            // //    readStream.pause()
            // // }
         }
      })
   })
   // writeStream.on('drain', () => readStream.resume())
})()

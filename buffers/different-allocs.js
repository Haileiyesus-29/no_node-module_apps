const { Buffer } = require('buffer')

const safeBuffer = Buffer.alloc(10000, 0)
const unsafeBuffer = Buffer.allocUnsafe(10000)

for (let i = 0; i < safeBuffer.length; i++) {
   if (safeBuffer[i] !== 0) {
      console.log(`safe buffer got ${safeBuffer[i]} on ${i}th element`)
   }
}
for (let i = 0; i < unsafeBuffer.length; i++) {
   if (unsafeBuffer[i] !== 0) {
      console.log(
         `unsafe buffer got ${unsafeBuffer[i].toString(2)} on ${i}th element`
      )
   }
}

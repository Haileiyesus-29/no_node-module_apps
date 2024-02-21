const fs = require('node:fs/promises')
const { Buffer } = require('node:buffer')

// fs.open('text.txt', 'r', console.log)

;(async () => {
   const file = await fs.open('text.txt', 'r')
   const stat = await file.stat()
})()

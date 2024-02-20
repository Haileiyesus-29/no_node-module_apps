// const fs = require('fs/promises')

// ;(async () => {
//    try {
//       await fs.copyFile('./text.txt', './copy-promise.txt')
//    } catch (error) {
//       console.error(error)
//    }
// })()

const fs = require('fs')
fs.copyFile('./text.txt', './copy-callback.txt', err => {
   if (err) console.error(err)
})

fs.copyFileSync('./text.txt', './copy-sync.txt')

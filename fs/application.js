const { Buffer } = require('buffer')
const fs = require('node:fs/promises')

;(async () => {
   // load a file to the process
   const commandFile = await fs.open('./command.txt')

   const CREATE_FILE = 'create a file'
   const DELETE_FILE = 'delete the file'
   const RENAME_FILE = 'rename the file'
   const ADD_TO_FILE = 'add this'

   const createFile = async filePath => {
      try {
         const existingFile = await fs.open(filePath, 'r')
         existingFile.close()
         return console.log(`the file ${filePath} already exists.`)
      } catch (error) {
         const newFile = await fs.open(filePath, 'w')
         newFile.close()
         console.log(`the new file ${filePath} has been created!`)
      }
   }
   const deleteFile = async filePath => {
      try {
         await fs.unlink(filePath)
         return console.log(`file ${filePath} deleted.`)
      } catch (error) {
         console.log(`file ${filePath} doesn't exist`)
      }
   }
   const renameFile = async (filePath, newPath) => {
      try {
         await fs.rename(filePath, newPath)
         return console.log(`file ${filePath} renamed as ${newPath}.`)
      } catch (error) {
         console.log(`file ${filePath} doesn't exist`)
      }
   }
   const addToFile = async (filePath, content) => {
      try {
         const file = await fs.open(filePath, 'w')
         file.writeFile(content)
         file.close()
         return console.log(`added ${content} on file ${filePath}.`)
      } catch (error) {
         console.log(`file ${filePath} doesn't exist`)
      }
   }

   commandFile.on('change', async () => {
      const size = (await commandFile.stat()).size
      const buff = Buffer.alloc(size)

      const offset = 0
      const length = buff.byteLength
      const position = 0
      const content = await commandFile.read(buff, offset, length, position)

      const command = content.buffer.toString('utf-8')
      if (command.includes(CREATE_FILE)) {
         const filePath = command.substring(CREATE_FILE.length + 1)
         await createFile(filePath)
      }
      if (command.includes(DELETE_FILE)) {
         const filePath = command.substring(DELETE_FILE.length + 1)
         await deleteFile(filePath)
      }
      if (command.includes(RENAME_FILE)) {
         const to = command.indexOf(' to ')
         const filePath = command.substring(RENAME_FILE.length + 1, to)
         const renamePath = command.substring(to + 4)
         await renameFile(filePath, renamePath)
      }
      if (command.includes(ADD_TO_FILE)) {
         const on = command.indexOf(' on ')
         const content = command.substring(ADD_TO_FILE.length + 1, on)
         const filePath = command.substring(on + 4)
         addToFile(filePath, content)
      }
   })

   const watcher = fs.watch('./command.txt')
   for await (const event of watcher) {
      if (event.eventType === 'change') {
         commandFile.emit('change')
      }
   }
})()

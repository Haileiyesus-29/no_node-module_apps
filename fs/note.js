const { Buffer } = require('node:buffer')

// To assign a buffer with a fixed size but also stored outside of the default nodejs buffer which is 8Kib
// assured the values are all zero
const safeBuff = Buffer.alloc(1024)

// To assign a buffer with fixed sieze and within the nodejs buffer space
// doesn't assure the buffer is filled with all zero
// fast allocation
const unsafeBuffer = Buffer.allocUnsafe(1024)

// makes sure filled with zero
const unsafeSlowBuffer = Buffer.allocUnsafeSlow(1024)

// To allocate from values - with only the size we need, (recommended)
// Internally use Buffer.allocUnsafe()
const buff = Buffer.from('value to be buffered', 'utf-8')

// To decode the buffer to string (if encoded that way)
const string = buff.toString('utf-8')

// to fill some value for the buffer
buff.fill('value')

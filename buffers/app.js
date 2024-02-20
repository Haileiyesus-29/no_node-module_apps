const { Buffer } = require("buffer");

const memoryContainer = Buffer.alloc(4);
memoryContainer[2];
console.log(memoryContainer);

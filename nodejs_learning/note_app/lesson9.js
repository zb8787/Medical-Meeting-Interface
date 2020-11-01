// rquire function is how we load any modules
const fs = require('fs')

// writing data to file
fs.writeFileSync('note.txt','This file is created by nodejs')

// add new data to the file, need to comment out the writeFileSync, which will rewrite the whole file
fs.appendFileSync('note.txt',' This is another message.')
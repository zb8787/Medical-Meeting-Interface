 const validator = require('validator')
const getNotes = require('./notes.js') 
const chalk = require('chalk')

const message = getNotes()
console.log(message)

console.log(validator.isEmail('wang0812@bu.edu'))
console.log(validator.isURL('https://mead.io'))
// the order of commend doesn't matter
// approach one
console.log(chalk.bold.green('Success!'));
// aproach two 
// inverse make the green as background 
const greenMsg = chalk.bold.green.inverse('Success_2!');
console.log(greenMsg)

// process can be used to access all the command line arguments 
// argv: can array containing all the arguments 
console.log(process.argv[2])
// path to nodejs executable 
// path to app.js
// value we provided (0 is the first one)

const command = process.argv[2]

if (command === 'add'){
    console.log("Adding note")
} else if (command === 'remove'){
    console.log('Remove the node')
} 
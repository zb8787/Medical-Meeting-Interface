const validator = require('validator')
const getNotes = require('./notes.js') 
const chalk = require('chalk')
const yargs = require('yargs')

// read argument using process, pre-exist in nodejs
//console.log(process.argv)

// --title="Things to buy"
// yargs: title: Things to buy
yargs.version('1.1.0')
// in terminal: yargs --version

// create add command
//  -- help; the description will show up
// add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        },
        work: {
            describe: 'things to do',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
      // console.log('Adding a new note',argv) 
      console.log('Title: ' + argv.title) 
      console.log('Please do ' + argv.work)
    }
})

// remove command
yargs.command({
    command: 'remove',
    describe: 'remove a existing note',
    handler: function(){
      console.log('Remove a note')  
    }
}) 

// list command
yargs.command({
    command: 'list',
    describe: 'listing a existing note',
    handler: function(){
      console.log('Listing notes')  
    }
})

// read command 
yargs.command({
    command: 'read',
    describe: 'Read a existing note',
    handler: function(){
      console.log('Reading the note')  
    }
})

// how yargs print out arguments 
// need to keep this to print out the command in yargs.command()
// parse the argument for you 
yargs.parse()
//console.log(yargs.argv)

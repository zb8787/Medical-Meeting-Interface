const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

yargs.version('1.1.0')
// in terminal: yargs --version

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
        body: { 
            describe: 'things to do',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
      notes.addNote(argv.title,argv.body)
    }
})

// remove command
yargs.command({
    command: 'remove',
    describe: 'remove a existing note',
    builder: {
      title: {
        describe: 'note title',
        demandOption: true,
        type: 'string'
      }
    },
    handler: function(argv){
      //notes.deleteNote(argv.title)
      notes.removeNote(argv.title)
    }
}) 

// list command
yargs.command({
    command: 'list',
    describe: 'listing a existing note',
    handler: function(){
      console.log('Listing notes') 
      notes.listNotes() 
    }
})

// read command 
yargs.command({
    command: 'read',
    describe: 'Read a existing note',
    builder: {
      title: {
        describe: 'note title',
        demandOption: true,
        type: 'string'
      },
    },
    handler: function(argv){
      console.log('Reading the note') 
      notes.readNote(argv.title) 
    }
})

yargs.parse()

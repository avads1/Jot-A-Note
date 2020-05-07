const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

// Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.addNoteObj(argv.title, argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'rm',
    describe: 'Remove a note',
    handler: function (argv) {
        notes.removeNoteObj(argv.title)
    }
})

// Create list command
yargs.command({
    command: 'ls',
    describe: 'List your notes',
    handler: function () {
        notes.printNotesObj();
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function (argv) {
        console.log(notes.readNoteObj(argv.title))
    }
})

yargs.parse()
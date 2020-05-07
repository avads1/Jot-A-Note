const fs = require('fs')
const chalk = require('chalk')
const getNotes = function () {
    return 'Your notes...'
}
/*
Add note
node app.js add --title="Goals" --body="1)Leetcode 2)Node.js"
node app.js add --title="Todo" --body="Eat, Sleep & Repeat!"
node app.js add --title="Movies" --body="Hidden figures, Catch me if you can, Up, Inside Out, Boss baby"

Update existing note with same title!
node app.js add --title="Movies" --body="Jungle book"

*/
const addNote = (title, body) => {
    const notesJSON = loadNotes()
    const duplicateNotes = notesJSON.filter(function (note) {
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
        notesJSON.push({
            title: title,
            body: body
        })
        saveNotes(notesJSON)
        console.log(chalk.green.bold('New note added!'))
    } else {
        updateNote(notesJSON, title, body)
        saveNotes(notesJSON)
        console.log(chalk.cyan.bold('Updated body of existing note!'));
    }
}


//node app.js ls
const printNotes = () => {
    const notesJSON = loadNotes()
    console.log(chalk.green.bold("----NOTES----"))
    for (var index in notesJSON) {
        if (notesJSON[index] != null)
            console.log(chalk.cyan.bold(notesJSON[index].title + " : \n") + chalk.yellow("\t" + notesJSON[index].body) + "\n");
    }
    console.log(chalk.green("-------------"))
}

//node app.js read --title="Todo"
const readNote = (title) => {
    const notesJSON = loadNotes()
    const currNote = notesJSON.filter((currNote) => currNote.title === title)
    if (currNote.length > 0)
        return chalk.cyan.bold(currNote[0].title + " : \n") + chalk.yellow("\t" + currNote[0].body)
    else
        return chalk.red.bold("Oops! There is no note with the given title...")
    // for (var index in notesJSON) {
    //     if (notesJSON[index] != null && notesJSON[index].title === title) {
    //         return notesJSON[index].title + " : " + notesJSON[index].body + "\n"
    //     }
    // }

}

//node app.js rm --title="Goals"
const removeNote = (title) => {
    const notesJSON = loadNotes()
    const notesList = notesJSON.filter((note) => note.title !== title)
    // for (var index in notesJSON) {
    //     if (notesJSON[index] != null && notesJSON[index].title === title) {
    //         // console.log(delete notesJSON[index].title)
    //         delete notesJSON[index]
    //         break;
    //     }
    // }
    if (notesJSON.length == notesList.length + 1) {
        console.log(chalk.green.bold('Note ' + chalk.yellow.bold('\'' + title + '\'') + 'deleted!'))
        saveNotes(notesList)
    } else {
        console.log(chalk.red.bold('Oops! There note doesnt exist or there are no notes...'))
    }

}
/*===================Utility Functions======================= */
const updateNote = (notesJSON, title, body) => {
    for (var index in notesJSON) {
        if (notesJSON[index] != null && notesJSON[index].title === title) {
            notesJSON[index].body = body
            break;
        }
    }
}

const saveNotes = (notes) => {
    //Pretty print JSON
    const dataJSON = JSON.stringify(notes, null, 2)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotesObj: getNotes,
    addNoteObj: addNote,
    printNotesObj: printNotes,
    readNoteObj: readNote,
    removeNoteObj: removeNote
}
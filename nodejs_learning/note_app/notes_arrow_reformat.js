const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return "Your notes..."
}

const addNote = (title, body) => {
    const notes = loadNotes()
    // this is an array 
    const duplicateNotes = notes.filter((note) =>note.title === title)
    // if nothing is appened to duplicates 
    if (duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log("new note")
    } else{
        console.log("note taken")
    }  
}

// I wrote this 
const deleteNote = function(title){
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note)=> note.title === title)
    if (duplicateNotes.length === 0){
        console.log(chalk.inverse.red("doesn't exist"))
    } else{
        console.log(chalk.inverse.green("action needed"))
        const notesToKeep = notes.filter(function (note){
            return note.title !== title
        })
        console.log(notesToKeep)
        fs.writeFileSync('notes.json',JSON.stringify(notesToKeep))
    }    
}

// the answer 
const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note)=>note.title !== title)
    if (notes.length > notesToKeep.length){
        console.log(chalk.inverse.green("action needed"))
        saveNotes(notesToKeep) 
    }
    else{
        console.log(chalk.inverse.red("doesn't exist"))
    }
}

//
const listNotes = function(){
    const notes = loadNotes()
    console.log(chalk.inverse("listing"))
    notes.forEach((note) =>{
        console.log(note.title)
    })    
}

const saveNotes = (notes)=>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = ()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        // convert buffer to string 
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    deleteNote: deleteNote,
    removeNote: removeNote,
    listNotes: listNotes,
}

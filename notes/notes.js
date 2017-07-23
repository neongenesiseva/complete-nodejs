const fs = require('fs');

var fetchNotes = ()=>{
    //if no notes.json file exits, it will still go through the rest lines. 
    try {
        //READ EXISTING DATA
        var notesString = fs.readFileSync('./playground/notes.json');
        return JSON.parse(notesString);
    } catch (error) {
        return　[]
    }
}

var saveNote = (notes)=>{
     fs.writeFileSync('./playground/notes.json',JSON.stringify(notes));
     console.log('success');
}

var addNote = (title,body)=>{
    var notes = fetchNotes();
    var note = {
        title,
        body
    }

    //find if the input match a existing data
    var duplicateNotes = notes.filter((note)=>{
        return note.title === title;
    })

    if (duplicateNotes.length === 0){
        //WRITE UPDATED DATA
        notes.push(note);
        saveNote(notes);
        return note
    }
    
};

var getAll = ()=>{
    return fetchNotes();
}

var removeNote = (title)=>{
    var notes = fetchNotes();
    var updatedNotes = notes.filter((note)=>note.title !== title);
    notes.length === updatedNotes.length ? console.log('input error, no notes found') : saveNote(updatedNotes);
    //'var updateNotes' will passed to outside because var does not have block scope, it could pass out
    /*
    var a =1
    if (a>0){
        var b = ++a;
    }
    console.log(b); -> 2
    */
}

var getNode=(title)=>{
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note)=>note.title === title);
    return filteredNotes[0];
}

module.exports = {addNote,getAll,removeNote,getNode};


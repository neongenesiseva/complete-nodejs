// var obj = {
//     name:'Chris'
// };

// var stringObj = JSON.stringify(obj);
// console.log(typeof stringObj);
// console.log(stringObj);

// var personString = '{"name":"Chris","age":25}';
// var person = JSON.parse(personString);

// console.log(typeof person);
// console.log(person);

const fs = require('fs');

var originalNote = {
    title:'some title',
    body:'some body'
};
var originalNoteString = JSON.stringify(originalNote);//originialNoteString
fs.writeFileSync('notes.json',originalNoteString);

var notesString = fs.readFileSync('notes.json');
var note= JSON.parse(notesString);

console.log(typeof note);
console.log(note.title);
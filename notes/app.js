const fs = require('fs');
const _=require('lodash');
const yargs = require('yargs');
const notes = require('./notes');

const commandOptions = {
     title:{
            describe:'title a note',
            demand:true,//means required
            alias:'t'
        },
     body:{
            describe:'body of note',
            demand:true,
            alias:'b'
        }
};
const argv = yargs
    .command('add','add a new note',{title:commandOptions.title,body:commandOptions.body})
    .command('list','list all notes')
    .command('read','add a new note',{title:commandOptions.title})
    .command('remove','remove a note',{title:commandOptions.title})
    .help()
    .argv;
//this could be easier if we
//const argv = require('yargs').argv;
var command = argv._[0];
//save with var command = process.argv[2];

if (command === 'add'){
    var note=notes.addNote(argv.title,argv.body);
    if (note){
        console.log('note created ----'+note.title);
    } else {
        console.log('note title taken')
    }
} else if(command==='list'){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach(function(note) {
        console.log(`note title:${note.title},note body:${note.body}`)
    }, this);
} else if(command === 'remove'){
    notes.removeNote(argv.title);
} else if (command === 'read'){
    var note = notes.getNode(argv.title);
    console.log(note);
    note === undefined?console.log('no such note'):console.log(`note title:${note.title},note body:${note.body}`)
} else {
    console.log('command error')
}
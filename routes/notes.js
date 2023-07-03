const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile, clearJSONFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const noteDB = require('../db/db.json');
const idFilter = req => note => note.note_id === req.params.id;


notes.get('/', (req, res) => {
  console.info(`${req.method} request received for all notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.get('/:id', (req, res) => {
  console.info(`${req.method} request received for note ${req.params.id}`);
  let found = false;
  const filteredNotes = [];

  noteDB.forEach(note => {
    if (note.note_id == req.params.id) {
      found = true;
      filteredNotes.push(note);
      res.json(filteredNotes)
    }
});
});

notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuid()
    };
 
    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

notes.delete('/:id', (req, res) => {
  const found = noteDB.some(idFilter(req));
  const newNoteDB = noteDB.filter(note => !idFilter(req)(note))

  if (found) {
    clearJSONFile('./db/db.json')
    writeToFile('./db/db.json', newNoteDB)
    res.json({
      msg: 'Note deleted',
      noteDB: newNoteDB
    });
  } else {
    res.status(400).json({ msg: `No note with the id of ${req.params.id}` });
  }
});


// notes.delete('/:id', (req, res) => {
//   console.info(`${req.method} request received to delete note ${req.params.id}`);
//   const paramId = req.params.id;
//   const found = noteDB.some(element => element.note_id === paramId);
//   let indexToFind = -1;
//   console.log(found);

//   noteDB.forEach((element, index) => {
//     if (element.note_id === paramId) {
//       indexToFind = index;
//     }
//   });

//   if (found) {
//     noteDB.splice(indexToFind, 1);
//     } else {
//     res.json('Note not found');
//   }
// });


module.exports = notes;


// --------------------------------------- *//

// notes.delete('/:id', (req, res) => {
//   console.info(`${req.method} request recieved to delete note ${req.params.id}`);
//   const paramId = req.params.id;
//   noteDB.forEach(element => {
//     if (element.note_id === paramId) {
//       noteDB.splice(noteDB.indexOf(element), 1);
//       res.json(`Note deleted successfully 🚀`);
//     } 
//   });
// })
 

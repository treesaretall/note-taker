const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile, clearJSONFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const noteDB = require('../db/db.json');
const idFilter = req => note => note.note_id == req.params.id;


notes.get('/', (req, res) => {
  console.info(`${req.method} request received for all notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.get('/:id', (req, res) => {
  console.info(`${req.method} request received for note ${req.params.id}`);
  const filteredNotes = [];

  noteDB.forEach(note => {
    if (note.note_id == req.params.id) {
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
  console.log(newNoteDB);
  console.info(`${req.method} request received to delete note ${req.params.id}`);

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

module.exports = notes;

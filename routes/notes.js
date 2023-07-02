const notes = require('express').Router();

const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
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

notes.delete('/', (req, res) => {
  console.info(`${req.method} request recieved to delete a note`);

  const id = parseInt(req.params.id);
  array = JSON.parse(readFromFile('./db/db.json'));
  array.forEach(element => {
    if (element.note_id === id) {
      array.splice(array.indexOf(element), 1);
    }
  });
  res.sendFile('./db/db.json');


})
 
module.exports = notes;
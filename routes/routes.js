const express = require('express');
const path = require('path');
const notesRouter = require('./notes');
const app = express();

app.use('/db', notesRouter);
// app.use('/public/notes.html', (req, res) => {
//     const filePath = path.join(__dirname, '../public/notes.html');
//     res.sendFile(filePath);
// })

module.exports = app;

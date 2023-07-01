const express = require('express');

const notesRouter = require('./notes');

const app = express();

app.use('/db', notesRouter);

module.exports = app;

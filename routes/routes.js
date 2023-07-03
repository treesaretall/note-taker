const express = require('express');
const path = require('path');
const notesRouter = require('./notes');
const app = express();

app.use('/notes', notesRouter);

module.exports = app;

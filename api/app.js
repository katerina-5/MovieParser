require('dotenv').config();
const express = require('express');
const app = express();
// const http = require('http');

// require('middleware')(app);
require('api/routes')(app);
require('api/config/mongodb.js');

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({ error: err.message });
});

module.exports = app;

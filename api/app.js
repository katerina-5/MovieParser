require('dotenv').config();
const express = require('express');
const app = express();

require('api/middleware')(app);
require('api/config/mongodb.js');
require('api/routes')(app);

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

app.listen(process.env.PORT, function () {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
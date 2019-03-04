const parser = require('../../parser/app-parser.js');

module.exports = {
  getBase
};

function getBase(req, res, next) {
  // res.send('Hello, world!\nThis is a home page.');
  res.sendFile(__dirname + '/index.html');
}
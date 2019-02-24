const home = require('./home');
const movies = require('./movies');
const urls = require('./urlQueue');

module.exports = function (app) {
  app.use('/', home);
  app.use('/movies', movies);
  app.use('/urls', urls);
};

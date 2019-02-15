const home = require('./home');
const movies = require('./movies');

module.exports = function(app) {
  app.use('/', home);
  app.use('/movies', movies);
};

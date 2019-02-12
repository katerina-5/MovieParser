const Movies = require('../models/movies');

module.exports = {
  home,
  get_movie_list,
  get_movie_detail,
  create_movie,
  update_movie,
  delete_movie
};

function home(req, res, next) {
  res.send('Movies Page');
}

// Display list of all movies.
function get_movie_list(req, res, next) {
  console.log('List of movies');

  Movies.find({})
    .then(movies => {
      // console.log(movies);
      res.send(movies);
    })
    .catch(error => next(error));
}

// Display detail page for a specific movie.
function get_movie_detail(req, res, next) {
  console.log('Movie detail');

  // console.log(req.params.id);
  // console.log(req.body);

  Movies.findById(req.params.id)
    .then(movie => {
      res.send(movie);
    })
    .catch(error => next(error));
}

// movie create on POST.
function create_movie(req, res, next) {
  console.log('Movie create');

  // console.log(req.body);

  Movies.create(req.body)
    .then(movie => {
      res.send(movie);
    })
    .catch(error => next(error));
}

// movie delete on DELETE.
function delete_movie(req, res, next) {
  console.log('Movie delete');

  // console.log(req.params.id);

  Movies.findByIdAndDelete(req.params.id)
    .then(movie => {
      console.log(movie);
      res.send(`movie ${movie} deleted!`);
    })
    .catch(error => next(error));
}

// movie update on PUT.
function update_movie(req, res, next) {
  console.log('Movie update');

  // console.log(req.params.id);
  // console.log(req.body);

  Movies.findByIdAndUpdate(req.params.id, req.body)
    .then(movie => {
      res.send(movie);
    })
    .catch(error => next(error));
}

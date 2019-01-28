const Movies = require('../models/movies');

module.exports = {
  index,
  movie_list,
  movie_detail,
  movie_create_get,
  movie_create_post,
  movie_delete_get,
  movie_delete_post,
  movie_update_get,
  movie_update_post
};

function index(req, res, next) {
  res.send('NOT IMPLEMENTED: Site Home Page');
}

// Display list of all movies.
function movie_list(req, res, next) {
  //res.send('NOT IMPLEMENTED: movie list');

  Movies.find({})
    .then(movies => {
      res.send(movies);
    })
    .catch(error => next(error));
}

// Display detail page for a specific movie.
function movie_detail(req, res, next) {
  //res.send('NOT IMPLEMENTED: movie detail: ' + req.params.id);

  Movies.find(req.body)
    .then(movie => {
      res.send(movie);
    })
    .catch(error => next(error));
}

// Display movie create form on GET.
function movie_create_get(req, res, next) {
  //res.send('NOT IMPLEMENTED: movie create GET');

  console.log(req.body);
  Movies.create(req.body)
    .then(movie => {
      res.send(movie);
    })
    .catch(error => next(error));
}

// Handle movie create on POST.
function movie_create_post(req, res, next) {
  // res.send('NOT IMPLEMENTED: movie create POST');

  Movies.create(req.body)
    .then(movie => {
      res.send(movie);
    })
    .catch(error => next(error));
}

// Display movie delete form on GET.
function movie_delete_get(req, res, next) {
  //res.send('NOT IMPLEMENTED: movie delete GET');

  Movies.findById(req.params.id)
    .then(movie => {
      movies
        .remove(movie)
        .then(movie => {
          res.send(`movie ${movie} deleted!`);
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
}

// Handle movie delete on POST.
function movie_delete_post(req, res, next) {
  // res.send('NOT IMPLEMENTED: movie delete POST');

  Movies.find(req.body)
    .then(movie => {
      movies
        .remove(movie)
        .then(movie => {
          res.send(`movie ${movie} deleted!`);
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
}

// Display movie update form on GET.
function movie_update_get(req, res, next) {
  //res.send('NOT IMPLEMENTED: movie update GET');

  Movies.update(req.body)
    .then(movie => {
      res.send(movie);
    })
    .catch(error => next(error));
}

// Handle movie update on POST.
function movie_update_post(req, res, next) {
  // res.send('NOT IMPLEMENTED: movie update POST');

  Movies.update(req.body)
    .then(movie => {
      res.send(movie);
    })
    .catch(error => next(error));
}

const Movies = require('../models/movies');
const Actors = require('../models/actors');

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

  // res.send(req.body);

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
  console.log(req.params);
  // console.log(req.body);

  // res.send(req.body);

  Movies.findById(req.params)
    .then(movie => {
      res.send(movie);
    })
    .catch(error => next(error));
}

// movie create on POST.
function create_movie(req, res, next) {
  // res.send('Movie create');
  console.log('Movie create');
  // console.log(req.body);

  // res.send(req.body);

  req.body.actors.forEach(actor => {
    if (actor.actorType === "Person") {
      Actors.create(actor)
        .catch(error => next(error));
    } else {
      console.log("undefined error");
    }
  });

  // Actors.create(req.body.actors)
  //   .catch(error => next(error));

  Movies.create(req.body)
    .then(movie => {
      res.send(movie);
    })
    .catch(error => next(error));
}

// movie delete on DELETE.
function delete_movie(req, res, next) {
  console.log('Movie delete');
  console.log(req.params.id);

  // res.send(req.params.id);

  Movies.findByIdAndDelete(req.params.id)
    .then(movie => {
      console.log(movie);
      res.send(`movie ${movie} deleted!`);
    })
    .catch(error => next(error));

  // Movies.findById(req.params.id)
  //   .then(movie => {
  //     movies
  //       .remove(movie)
  //       .then(movie => {
  //         res.send(`movie ${movie} deleted!`);
  //       })
  //       .catch(error => next(error));
  //   })
  //   .catch(error => next(error));

  // Movies.find(req.body)
  //   .then(movie => {
  //     movies
  //       .remove(movie)
  //       .then(movie => {
  //         res.send(`movie ${movie} deleted!`);
  //       })
  //       .catch(error => next(error));
  //   })
  //   .catch(error => next(error));
}

// movie update on PUT.
function update_movie(req, res, next) {
  console.log('Movie update');

  console.log(req.params.id);
  console.log(req.query);

  Movies.findByIdAndUpdate(req.params.id, req.body)
    .then(movie => {
      res.send(movie);
    })
    .catch(error => next(error));

  // Movies.update(req.body)
  //   .then(movie => {
  //     res.send(movie);
  //   })
  //   .catch(error => next(error));
}

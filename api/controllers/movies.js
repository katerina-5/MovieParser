const Movies = require('../models/movies');

module.exports = {
  get_movie_list,
  get_movie_detail,
  create_movie,
  update_movie,
  delete_movie
};

// Display list of all movies.
async function get_movie_list(req, res, next) {
  console.log('List of movies');

  const movies = await Movies.find({})
  res.send(movies);

  // Movies.find({})
  //   .then(movies => {
  //     res.send(movies);
  //   })
  //   .catch(error => next(error));
}

// Display detail page for a specific movie.
function get_movie_detail(req, res, next) {
  console.log('Movie detail');

  Movies.findById(req.params.id)
    .then(movie => {
      res.send(movie);
    })
    .catch(error => next(error));
}

// movie create on POST.
async function create_movie(req, res, next) {
  console.log('Movie create');

  const movie = await Movies.findOne({ url: req.body.url });
  console.log(movie);

  if (movie == null) {
    // create
    console.log("need to create");
    Movies.create(req.body)
      .then(movie => {
        console.log(movie.url, " successfully create");
        res.send(movie);
      })
      .catch(error => next(error));
  } else {
    // update
    console.log("need to update");
    Movies.findByIdAndUpdate(req.body._id, req.body)
      .then(movie => {
        console.log(movie.url, " successfully update");
        res.send(movie);
      })
      .catch(error => next(error));
  }

  // Movies.create(req.body)
  //   .then(movie => {
  //     res.send(movie);
  //   })
  //   .catch(error => next(error));
}

// movie delete on DELETE.
function delete_movie(req, res, next) {
  console.log('Movie delete');

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

  Movies.findByIdAndUpdate(req.params.id, req.body)
    .then(movie => {
      res.send(movie);
    })
    .catch(error => next(error));
}

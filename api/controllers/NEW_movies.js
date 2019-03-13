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

    const movies = await Movies.find({});
    res.send(movies);
}

// Display detail page for a specific movie.
async function get_movie_detail(req, res, next) {
    console.log('Movie detail');

    const movie = await Movies.findById(req.params.id);
    res.send(movie);
}

// movie create on POST.
async function create_movie(req, res, next) {
    console.log('Movie create');

    const movie = await Movies.create(req.body);
    res.send(movie);
}

// movie delete on DELETE.
async function delete_movie(req, res, next) {
    console.log('Movie delete');

    const movie = await Movies.findByIdAndDelete(req.params.id);
    res.send(`movie ${movie} deleted!`);
}

// movie update on PUT.
async function update_movie(req, res, next) {
    console.log('Movie update');

    const movie = await Movies.findByIdAndUpdate(req.params.id, req.body);
    res.send(movie);
}

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genresSchema = new Schema({
    genreTitle: String
});

const Genres = mongoose.model('Genres', genresSchema);

module.exports = Genres;

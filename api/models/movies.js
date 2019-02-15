const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
  movieType: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  genres: Array,
  contentRating: String,
  actors: Array,
  directors: Array,
  creators: Array,
  description: String,
  datePublished: String,
  keywords: String,
  duration: String
});

const Movies = mongoose.model('Movies', moviesSchema);

module.exports = Movies;

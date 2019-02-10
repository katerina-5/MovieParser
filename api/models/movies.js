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
  // genre: [
  //   {
  //     type: String,
  //     required: true
  //   }
  // ],
  contentRating: String,
  actors: Array,
  // actor: [
  //   {
  //     type: String,
  //     url: String,
  //     name: String
  //   }
  // ],
  // director: [
  //   {
  //     type: String,
  //     url: String,
  //     name: String
  //   }
  // ],
  // creator: [
  //   {
  //     type: String,
  //     url: String,
  //     name: String
  //   }
  // ],
  description: String,
  datePublished: String,
  keywords: String,
  duration: String
});

const Movies = mongoose.model('Movies', moviesSchema);

module.exports = Movies;

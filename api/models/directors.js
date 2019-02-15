const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const directorsSchema = new Schema({
    directorType: String,
    url: String,
    name: String
});

const Directors = mongoose.model('Directors', directorsSchema);

module.exports = Directors;

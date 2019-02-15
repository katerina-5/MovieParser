const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creatorsSchema = new Schema({
    creatorType: String,
    url: String,
    name: String
});

const Creators = mongoose.model('Creators', creatorsSchema);

module.exports = Creators;

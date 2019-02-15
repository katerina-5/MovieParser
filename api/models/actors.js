const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actorsSchema = new Schema({
    actorType: String,
    url: String,
    name: String
});

const Actors = mongoose.model('Actors', actorsSchema);

module.exports = Actors;

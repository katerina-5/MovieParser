const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personsSchema = new Schema({
    url: String,
    name: String
});

const Persons = mongoose.model('Persons', personsSchema);

module.exports = Persons;

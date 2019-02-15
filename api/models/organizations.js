const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizationsSchema = new Schema({
    url: String
});

const Organizations = mongoose.model('Organizations', organizationsSchema);

module.exports = Organizations;

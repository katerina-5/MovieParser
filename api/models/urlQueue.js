const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlQueueSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "NOT_ATTEMPTED"
    }
});

const UrlQueue = mongoose.model('urlQueueSchema', urlQueueSchema);

module.exports = UrlQueue;

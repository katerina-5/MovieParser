const mongoose = require('mongoose');
const UrlQueue = require('../models/urlQueue');

module.exports = {
    get_url_list,
    get_url_detail,
    create_url,
    update_url,
    delete_url
};

// Display list of all urls.
function get_url_list(req, res, next) {
    console.log('List of urls');

    UrlQueue.find({})
        .then(urls => {
            res.send(urls);
        })
        .catch(error => next(error));
}

// Display detail page for a specific url.
function get_url_detail(req, res, next) {
    console.log('Url detail');

    UrlQueue.findById(req.params.id)
        .then(url => {
            res.send(url);
        })
        .catch(error => next(error));
}

// url create on POST.
function create_url(req, res, next) {
    console.log('Url create');

    UrlQueue.create(req.body)
        .then(url => {
            res.send(url);
        })
        .catch(error => next(error));
}

// url delete on DELETE.
function delete_url(req, res, next) {
    console.log('Url delete');

    UrlQueue.findByIdAndDelete(req.params.id)
        .then(url => {
            console.log(url);
            res.send(`url ${url} deleted!`);
        })
        .catch(error => next(error));
}

// url update on PUT.
function update_url(req, res, next) {
    console.log('Url update');
    // console.log("id: ", req.params.id);
    // console.log("body: ", req.body);
    // console.log("status: ", req.body.status);

    // console.log(mongoose.Types.ObjectId.isValid(req.params.id));
    // console.log(mongoose.Types.ObjectId(req.params.id));

    let id = req.body._id;
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        id = req.params.id;
    } else {
        id = req.body._id;
    }

    UrlQueue.findByIdAndUpdate(id, { status: req.body.status })
        .then(url => {
            res.send(url);
        })
        .catch(error => next(error));
}

// status of url update on PUT.
function update_url_status(req, res, next) {
    console.log('Status of url update');

    UrlQueue.findByIdAndUpdate(req.params.id, { status: req.body.status })
        .then(url => {
            res.send(url);
        })
        .catch(error => next(error));
}

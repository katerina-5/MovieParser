const express = require('express');
const router = express.Router();

const UrlQueue = require('../models/urlQueue');

// Require controller modules.
const url_controller = require('../controllers/urlQueue');

/// URL ROUTES ///

// POST request for creating Url.
router.post('/', url_controller.create_url);

// PUT request to update Url.
router.put('/:id', url_controller.update_url);

// DELETE request to delete Url.
router.delete('/:id', url_controller.delete_url);

// GET request for list of all Url items.
router.get('/', url_controller.get_url_list);

router.get('/status', function (req, res, next) {
    console.log("Search by status");

    UrlQueue.findOne({}, { status: "NOT_ATTEMPTED", url: "" })
        .then(url => {
            console.log(url);
            res.send(url);
        })
        .catch(error => next(error));

    // UrlQueue.find({ status: "NOT_ATTEMPTED" })
    //     .then(url => {
    //         console.log(url);
    //         res.send(url);
    //     })
    //     .catch(error => next(error));
});

// GET request for one Url.
router.get('/:id', url_controller.get_url_detail);

// router.get('/another/:status', function (req, res, next) {
//     console.log("Search by status");
//     console.log(req.params.status);
//     let search_status = req.params.status.replace(":", "");

//     UrlQueue.findOne({ status: search_status })
//         .then(url => {
//             console.log(url);
//             res.send(url);
//         })
//         .catch(error => next(error));
// });


module.exports = router;

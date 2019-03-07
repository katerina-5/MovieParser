const express = require('express');
const router = express.Router();
const Movies = require('../models/movies');

// Require controller modules.
const movie_controller = require('../controllers/movies');

/// MOVIES ROUTES ///

// POST request for creating Movie.
router.post('/', movie_controller.create_movie);

// PUT request to update Movie.
router.put('/:id', movie_controller.update_movie);

// DELETE request to delete Movie.
router.delete('/:id', movie_controller.delete_movie);

// GET request for list of all Movie items.
router.get('/', movie_controller.get_movie_list);

router.get('/title:url', function (req, res, next) {
    console.log("Search movie by url");
    console.log(req.params.url);

    Movies.find(req.params.url)
        .then(url => {
            res.send(url);
        })
        .catch(error => next(error));
})

// GET request for one Movie.
router.get('/:id', movie_controller.get_movie_detail);

module.exports = router;

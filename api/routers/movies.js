var express = require('express');
var router = express.Router();

// Require controller modules.
var movie_controller = require('../controllers/movies');

/// MOVIES ROUTES ///

// GET catalog home page.
router.get('/', movie_controller.index);

// GET request for creating a movie. NOTE This must come before routes that display Movie (uses id).
router.get('/create', movie_controller.movie_create_get);

// POST request for creating Movie.
router.post('/create', movie_controller.movie_create_post);

// GET request to delete Movie.
router.get('/:id/delete', movie_controller.movie_delete_get);

// POST request to delete Movie.
router.post('/:id/delete', movie_controller.movie_delete_post);

// GET request to update Movie.
router.get('/:id/update', movie_controller.movie_update_get);

// POST request to update Movie.
router.post('/:id/update', movie_controller.movie_update_post);

// GET request for one Movie.
router.get('/:id', movie_controller.movie_detail);

// GET request for list of all Movie items.
router.get('/all', movie_controller.movie_list);

module.exports = router;

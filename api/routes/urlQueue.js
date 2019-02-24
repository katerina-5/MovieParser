const express = require('express');
const router = express.Router();

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

// GET request for one Url.
router.get('/:id', url_controller.get_url_detail);

module.exports = router;

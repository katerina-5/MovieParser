// BODY-PARSER

const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
}

// METHOD-OVERRIDE

const methodOverride = require('method-override');

//override with POST having ?_method=DELETE
module.exports = function (app) {
    app.use(methodOverride('_method'));
}

//

const multer = require('multer');

const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/products/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single("image");

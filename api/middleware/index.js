const bodyParser = require('body-parser');
const methodOverride = require('method-override');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    //override with POST having ?_method=DELETE
    // app.use(methodOverride('_method'));
}

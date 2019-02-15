const Actors = require('../models/actors');

module.exports = {
    actors_create
};

function actors_create(req, res, next) {
    Actors.create(req.body.actors)
        .catch(error => next(error));

    // req.body.actors.forEach(actor => {
    //     if (actor.actorType === "Person") {
    //         Actors.findById(actor.id)
    //             .then(console.log(actor + "\nis exist"))
    //             .catch(actor => {
    //                 console.log("create new actor");
    //                 Actors.create(actor);
    //             });
    //     } else {
    //         console.log("undefined error");
    //     }
    // });
}

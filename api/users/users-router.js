const router = require("express").Router();

const Users = require("./users-model.js");
const mw = require("../middlewares/middleware.js");

router.get("/", mw.restricted, (req, res) => {
    Users.find()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((error) => {
            res.send(error);
        });
});

module.exports = router;
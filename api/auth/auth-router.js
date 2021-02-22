const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../users/users-model.js");

// | POST   | /api/register | Creates a `user` using the information sent inside the `body` of the request. **Hash the password** before saving the user to the database.

router.post("/register", async (req, res) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 10);
        const newUser = await User.add({
            username: req.body.username,
            password: hash
        });
        res.status(201).json(newUser);
    } catch(error) {
        res.status(500).json(`Server error: ${error}`);
    }
});


// | POST   | /api/login    | Use the credentials sent inside the `body` to authenticate the user. On successful login, create a new session for the user and send back a 'Logged in' message and a cookie that contains the user id. If login fails, respond with the correct status code and the message: 'You shall not pass!' |
// | GET    | /api/users    | If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in repond with the correct status code and the message: 'You shall not pass!'.
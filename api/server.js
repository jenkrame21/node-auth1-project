const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// express-session

// connect-session-knex

const usersRouter = require("./users/users-router.js");
const authRouter = require("./auth/auth-router.js");

const server = express();

// session config

// server uses session with config
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", usersRouter);
server.use("api/auth", authRouter);
// authRouter

server.get("/", (req, res) => {
    res.json({
        api: "Working!"
    });
});

module.exports = server;

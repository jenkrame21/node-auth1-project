const db = require("../../database/connection.js");

module.exports = {
    find,
    findBy
};

function find() {
    return db("users")
        .select("id", "username")
        .orderBy("id");
}

function findBy(filter) {
    return db("users")
        .where(filter)
        .orderBy("id");
}
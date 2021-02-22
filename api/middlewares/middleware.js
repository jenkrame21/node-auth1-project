const checkPayload = (req, res, next) => {
    const {username, password} = req.body;
    if(!username || !password) {
        res.status(401).json("Username/Password missing");
    } else {
        next();
    }
};

const checkUserInDb = async (req, res, next) => {
    try {
        const rows = await User.findBy({
            username: req.body.username
        });
        if(!rows.length) {
            next();
        } else {
            res.status(401).json("Username already exists");
        }
    } catch(error) {
        res.status(500).json(`Server error: ${error}`);
    }
};

const checkUserExists = (req, res, next) => {
    try {
        const rows = await User.findBy({
            username: req.body.username
        });
        if (rows.length) {
            req.userData = rows[0];
            next();
        } else {
            res.status(401).json("Login Error: Check Credentials");
        }
    } catch(error) {
        res.status(500).json(`Server error: ${error}`);
    }
};

module.exports = {
    checkPayload,
    checkUserInDb,
    checkUserExists
}
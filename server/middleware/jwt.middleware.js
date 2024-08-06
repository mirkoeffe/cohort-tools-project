const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
    try {
        if (!req.headers.authorization) throw new Error(`Invalid authorization header`);
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.payload = payload;
        next();
    } catch (error) {
        console.log(error, "err")
        next(error);
    }
}

module.exports = isAuthenticated;
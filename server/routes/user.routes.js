const router = require('express').Router();
const isAuthenticated = require("../middleware/jwt.middleware")

const User = require('../models/user.model')

router.get('/users/:id', isAuthenticated, (req, res, next) => {
    console.log(`req.payload`, req.payload);

    res.status(200).json(req.payload);
})

module.exports = router;
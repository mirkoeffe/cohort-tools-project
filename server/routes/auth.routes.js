const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const isAuthenticated = require("../middleware/jwt.middleware")

const saltRounds = 10;

// POST /signup

router.post('/signup', async (req, res, next) => {
    const { email, password, name } = req.body;

    if (email === '' || password === '' || name === '') {
        res.status(400).json({ message: 'All fields are required' });
        next(error);
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Provide a valid email address.' });
        return;
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
        res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
        return;
    }

    try {
        const foundUser = await User.findOne({ email })

        if (foundUser) {
            res.status(400).json({ message: 'Email already exists' });
            return;
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const createdUser = await User.create({ email, password: hashedPassword, name });
        const { _id, email: userEmail, name: userName } = createdUser;

        const user = { _id, email: userEmail, name: userName };

        res.status(201).json({ user });
    } catch (error) {
        next(error);
    }
})

// POST /login

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    if (email === '' || password === '') {
        res.status(400).json({ message: 'All fields are required' });
        next(error);
        return;
    }

    try {
        const foundUser = await User.findOne({ email })
        if (!foundUser) {
            res.status(401).json({ message: 'Invalid email or password' });
            next(error)
            return;
        }

        const passwordMatched = bcrypt.compareSync(password, foundUser.password);
        if (passwordMatched) {
            const { _id, email, name } = foundUser;

            const payload = { _id, email, name };

            const authToken = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    algorithm: 'HS256',
                    expiresIn: '1h'
                }
            );
            res.status(200).json({ authToken: authToken });
        } else {
            res.status(401).json({ message: "Password incorrect" })
        }
    } catch (error) {
        next(error)
    }
})



// GET /verify

router.get("/verify", isAuthenticated, (req, res, next) => {
    res.status(200).json({ message: "You are authenticated" });
})

module.exports = router;
const db = require("../models");
const User = db.user;
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const logger = require('../config/logger');


exports.registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User is already registered' });
        }

        const newUser = await User.create({
            email,
            password
        });

        const token = jwt.sign({ userId: newUser.id }, jwtSecret, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully.', user: newUser, token });
    } catch (error) {
        logger.error('Server error on User registered.', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isValidPassword = user.password === password;

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        logger.error('Server error on Login.', error);
        res.status(500).json({ error: 'Server error' });
    }
};


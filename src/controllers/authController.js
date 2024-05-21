const { validationResult } = require('express-validator');
const authService = require('../services/authService');
require('dotenv').config();

exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => ({ field: error.path, msg: error.msg }));
        return res.status(400).json({ errors: errorMessages });
    }

    const { firstname, lastname, email, mobile, password } = req.body;

    try {
        const result = await authService.registerUser({ firstname, lastname, email, mobile, password });
        return res.status(201).json({ data: result.user, message: result.message });
    } catch (error) {
        console.error(error);
        if (error.message === 'Email address already in use') {
            return res.status(422).json({ message: error.message });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => ({ field: error.path, msg: error.msg }));
        return res.status(400).json({ errors: errorMessages });
    }

    try {
        const { user, token } = await authService.loginUser(req.body);
        res.status(200).json({ data: { user, token }, message: 'Login successful' });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

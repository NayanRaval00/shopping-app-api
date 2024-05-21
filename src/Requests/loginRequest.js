const { body } = require('express-validator');
const validator = require('validator');

const loginRequest = [
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('email').custom((value) => {
        if (!validator.isEmail(value)) {
            throw new Error('Must be a valid email');
        }
        return true;
    })
];

module.exports = loginRequest;

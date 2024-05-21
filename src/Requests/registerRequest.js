const { body } = require('express-validator');
const validator = require('validator');

const registerRequest = [
    body('firstname').notEmpty().withMessage('First name is required'),
    body('lastname').notEmpty().withMessage('Last name is required'),
    body('email').custom((value) => {
        if (!validator.isEmail(value)) {
            throw new Error('Must be a valid email');
        }
        return true;
    }),
    body('mobile').custom((value) => {
        if (!validator.isNumeric(value)) {
            throw new Error('Mobile must be a number');
        }
        return true;
    }),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('confirm_password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    })
];

module.exports = registerRequest;

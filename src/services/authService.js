const bcrypt = require('bcryptjs'); // For password hashing
const User = require('../../models/User'); // Adjust the path to your User model
const jwt = require('jsonwebtoken');

exports.registerUser = async ({ firstname, lastname, email, mobile, password }) => {
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
        throw new Error('Email address already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ firstname, lastname, email, mobile, password: hashedPassword });

    return { user, message: 'Success!' };
};

exports.loginUser = async ({ email, password }) => {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_TOKEN, { expiresIn: '1h' });
    return { user, token };
};
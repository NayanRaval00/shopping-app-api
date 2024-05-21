const express = require('express')
const authRouter = express.Router();
const registerRequest = require('../Requests/registerRequest');
const loginRequest = require('../Requests/loginRequest');
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');

authRouter.post('/register', registerRequest, authController.registerUser);
authRouter.post('/login', loginRequest, authController.loginUser);


authRouter.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
});

module.exports = authRouter;


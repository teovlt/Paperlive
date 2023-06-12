const authenticationController = require('../controllers/authenticationController');
const { authenticateRefreshToken } = require('../middlewares/authenticationMiddleware');
const Router = require('express').Router();

Router.post('/register', authenticationController.signUp);
Router.post('/login', authenticationController.signIn);
Router.get('/logout', authenticationController.signOut);
Router.get('/refresh-token', authenticateRefreshToken, authenticationController.refreshToken);

module.exports = Router;

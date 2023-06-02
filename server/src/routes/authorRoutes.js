const authorController = require('../controllers/authorController');
const Router = require('express').Router();
const { authenticateAccessToken } = require('../middlewares/authenticationMiddleware');

Router.get('/', authenticateAccessToken, authorController.getAuthors);

module.exports = Router;

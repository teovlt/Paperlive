const keywordController = require('../controllers/keywordController');
const { authenticateAccessToken } = require('../middlewares/authenticationMiddleware');
const Router = require('express').Router();

Router.get('/', authenticateAccessToken, keywordController.getKeywords);
Router.post('/', authenticateAccessToken, keywordController.createKeyword);

module.exports = Router;

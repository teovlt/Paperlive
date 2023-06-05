const authorController = require('../controllers/authorController');
const Router = require('express').Router();
const { authenticateAccessToken } = require('../middlewares/authenticationMiddleware');
const { authenticateAccessToken } = require('../middlewares/authenticationMiddleware');

Router.get('/', authenticateAccessToken, authorController.getAuthors);
Router.post('/', authenticateAccessToken, authorController.createAuthor);
Router.put('/:authorId', authenticateAccessToken, authorController.updateAuthor);

module.exports = Router;

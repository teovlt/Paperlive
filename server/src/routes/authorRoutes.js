const authorController = require('../controllers/authorController');
const Router = require('express').Router();

Router.get('/', authorController.getAuthors);

module.exports = Router;

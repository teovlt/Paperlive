const scientificFieldController = require('../controllers/scientificFieldController');
const { authenticateAccessToken } = require('../middlewares/authenticationMiddleware');
const Router = require('express').Router();

Router.get('/', authenticateAccessToken, scientificFieldController.getScientificFields);
Router.post('/', authenticateAccessToken, scientificFieldController.createScientificField);
Router.put(
  '/:scientificFieldId',
  authenticateAccessToken,
  scientificFieldController.updateScientificField
);

module.exports = Router;

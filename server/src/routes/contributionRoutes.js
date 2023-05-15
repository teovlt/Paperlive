const Router = require('express').Router();
const contributionController = require('../controllers/contributionController');
const { authenticateAccessToken } = require('../middlewares/authenticationMiddleware');

Router.get('/', authenticateAccessToken, contributionController.listContributions);
Router.get(
  '/read/:contributionId',
  authenticateAccessToken,
  contributionController.readContribution
);
Router.post('/new', authenticateAccessToken, contributionController.createContribution);
Router.put(
  '/update/:contributionId',
  authenticateAccessToken,
  contributionController.updateContribution
);
Router.delete(
  '/delete/:contributionId',
  authenticateAccessToken,
  contributionController.deleteContribution
);

module.exports = Router;

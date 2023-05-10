const Router = require('express').Router();
const contributionController = require('../controllers/contributionController');
const uploadController = require('../controllers/uploadController');
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

// Generate ID
Router.get('/generate-id', authenticateAccessToken, contributionController.generateId);

Router.get('/abstract/:contributionId', contributionController.getAbstract);

Router.post(
  '/abstract/:contributionId',
  authenticateAccessToken,
  uploadController.uploadContributionAbstract
);

Router.delete('/abstract/:filename', contributionController.deleteAbstract);

module.exports = Router;

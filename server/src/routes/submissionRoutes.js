const Router = require('express').Router();
const submissionController = require('../controllers/submissionController');
const { authenticateAccessToken } = require('../middlewares/authenticationMiddleware');

Router.get('/', authenticateAccessToken, submissionController.listSubmissionsBelongToTeam);
Router.get(
  '/:contributionId',
  authenticateAccessToken,
  submissionController.listSubmissionsBelongToContribution
);
Router.post('/new', authenticateAccessToken, submissionController.createSubmission);
Router.delete('/:submissionId', authenticateAccessToken, submissionController.deleteSubmission);

module.exports = Router;

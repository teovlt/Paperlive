const Router = require('express').Router();
const submissionController = require('../controllers/submissionController');
const { authenticateAccessToken } = require('../middlewares/authenticationMiddleware');

Router.get('/', authenticateAccessToken, submissionController.listSubmissionsBelongToTeam);
Router.get(
  '/:contributionId/submissions',
  authenticateAccessToken,
  submissionController.listSubmissionsBelongToContribution
);
Router.get('/:submissionId', authenticateAccessToken, submissionController.readSubmission);
Router.post('/new', authenticateAccessToken, submissionController.createSubmission);
Router.put('/:submissionId', authenticateAccessToken, submissionController.updateSubmission);
Router.delete('/delete/:submissionId', authenticateAccessToken, submissionController.deleteSubmission);

module.exports = Router;

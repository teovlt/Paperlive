const Router = require('express').Router();
const fileController = require('../controllers/fileController');
const { authenticateAccessToken } = require('../middlewares/authenticationMiddleware');

Router.get('/:filename', authenticateAccessToken, fileController.downloadFile);

Router.post('/team/picture', authenticateAccessToken, fileController.uploadTeamPicture);

Router.post(
  '/contribution/abstract',
  authenticateAccessToken,
  fileController.uploadContributionAbstract
);

Router.post(
  '/submission/abstract',
  authenticateAccessToken,
  fileController.uploadSubmissionAbstract
);

Router.post(
  '/submission/zipfolder',
  authenticateAccessToken,
  fileController.uploadSubmissionZipfolder
);

Router.post(
  '/submission/compiledpdf',
  authenticateAccessToken,
  fileController.uploadSubmissionCompiledPDF
);

Router.post('/submission/diffpdf', authenticateAccessToken, fileController.uploadSubmissionDiffPDF);

Router.post(
  '/submission/commentpdf',
  authenticateAccessToken,
  fileController.uploadSubmissionCommentPDF
);

module.exports = Router;

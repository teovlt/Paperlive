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

// POST /api/files/submission/zipfolder

// POST /api/files/submission/compiledpdf

// POST /api/files/submission/diffpdf

module.exports = Router;

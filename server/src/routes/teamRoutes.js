const Router = require('express').Router();
const teamController = require('../controllers/teamController');
const uploadController = require('../controllers/uploadController');
const { authenticateAccessToken } = require('../middlewares/authenticationMiddleware');

Router.get('/', authenticateAccessToken, teamController.listTeams);
Router.get('/me', authenticateAccessToken, teamController.me);
Router.get('/:teamId', authenticateAccessToken, teamController.readTeam);
Router.put('/update', authenticateAccessToken, teamController.updateTeam);
Router.delete('/delete', authenticateAccessToken, teamController.deleteTeam);

Router.get('/picture/:filename', teamController.getPicture);
Router.post('/picture', authenticateAccessToken, uploadController.uploadProfilePicture);

module.exports = Router;

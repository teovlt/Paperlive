const teamController = require('../controllers/teamController');
const { authenticateAccessToken } = require('../middlewares/authenticationMiddleware');
const Router = require('express').Router();

Router.get('/', teamController.listTeams);
Router.get('/:teamId', teamController.readTeam);
Router.put('/:teamId', authenticateAccessToken, teamController.updateTeam);
Router.delete('/:teamId', authenticateAccessToken, teamController.deleteTeam);

module.exports = Router;

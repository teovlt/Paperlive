const teamController = require('../../controllers/teamController');
const { verifyToken } = require('../middlewares/authenticationMiddleware');
const Router = require('express').Router();

Router.get('/', teamController.listTeams);
Router.get('/:teamId', teamController.readTeam);
Router.put('/:teamId', verifyToken, teamController.updateTeam);
Router.delete('/:teamId', verifyToken, teamController.deleteTeam);

module.exports = Router;

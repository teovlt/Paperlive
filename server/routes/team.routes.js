const teamController = require('../controllers/team.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const Router = require('express').Router();

Router.get('/', teamController.listTeams);
Router.get('/:teamId', verifyToken, teamController.readTeam);
Router.patch('/:teamId', verifyToken, teamController.updateTeam);
Router.delete('/:teamId', verifyToken, teamController.deleteTeam);

module.exports = Router;

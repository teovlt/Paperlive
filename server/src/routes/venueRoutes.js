const venueController = require('../controllers/venueController');
const Router = require('express').Router();
const { authenticateAccessToken } = require('../middlewares/authenticationMiddleware');

Router.get('/', authenticateAccessToken, venueController.getVenues);
Router.post('/', authenticateAccessToken, venueController.createVenue);
Router.put('/:authorId', authenticateAccessToken, venueController.updateVenue);

module.exports = Router;

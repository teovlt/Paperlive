// Import required modules
const Express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Create the new Express app
const app = Express();

// Import the routes
const teamRoutes = require('./routes/teamRoutes');
const authRoutes = require('./routes/authenticationRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Set up middleware to parse JSON, URL-encoded bodies and cookies
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set the CORS header
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: 'GET, POST, PUT, PATCH, DELETE',
  preflightContinue: true,
};

app.use(cors(corsOptions));

/**
 * Healthcheck
 * @route GET /api/ping
 * @desc Check if the server is running
 * @access Public
 * @returns {object} Returns a JSON object with a message property indicating the server is running
 */
app.get('/api/ping', (req, res) => {
  return res.status(200).json({ message: 'The server is running!' });
});

/**
 * Handle requests to /api/teams
 * @route /api/teams
 * @desc Route to handle team related requests
 * @access Public
 */
app.use('/api/teams', teamRoutes);

/**
 * Handle the requests to /api/auth
 * @route /api/auth
 * @desc Route to handle authentication related requests
 * @access Public
 */
app.use('/api/auth', authRoutes);

/**
 * Handle the requests to /api/upload
 * @route /api/upload
 * @desc Route to handle upload related requests
 * @access Public
 */
app.use('/api/upload', uploadRoutes);

/**
 * Handle errors
 * @route ALL *
 * @desc Handle all other routes and return a 404 error
 * @access Public
 * @returns {object} Returns a JSON object with an error property indicating the route was not found
 */
app.use('/', (req, res) => {
  return res.status(404).json({ message: `The requested route ${req.originalUrl} was not found` });
});

module.exports = app;

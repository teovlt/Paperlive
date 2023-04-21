// Import required modules
const Express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// Create the new Express app
const app = Express();

// Set the port to listen on
const port = process.env.PORT || 3001;

// Import the routes
const teamRoutes = require('./routes/team.routes');
const authRoutes = require('./routes/auth.routes');

// Set up middleware to parse JSON, URL-encoded bodies and cookies
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to MongoDB using Mongoose
mongoose
  .connect('mongodb://db:27017/paperlive', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    startServer(); // Start the server after successful connection
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB');
    console.log(error);
  });

// Define a function to start the server
function startServer() {
  // Set the CORS header
  app.use('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-ALlow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    // Handle preflight requests for all routes
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }

    next();
  });

  // Set up a route to check if the server is running
  app.get('/ping', (req, res) => {
    return res.status(200).json('The server is running!');
  });

  // Use the team routes
  app.use('/api/teams', teamRoutes);

  // Use the authentication routes
  app.use('/api/auth', authRoutes);

  // Handle 404 errors
  app.use('/', (req, res) => {
    return res.status(404).json({ error: 'not found' });
  });

  // Create an HTTP server and listen on the specified port
  http.createServer(app).listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

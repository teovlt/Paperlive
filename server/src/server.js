// Import required modules
const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');

// Set the port to listen on
const port = process.env.PORT;

// Connect to MongoDB using Mongoose
mongoose
  .connect('mongodb://database:27017/paperlive', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB');
    console.log(error);
  });

// Create an HTTP server and listen on the specified port
const server = http.createServer(app).listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = server;

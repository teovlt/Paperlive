const server = require('./src/server');
const fs = require('fs');

const uploadsPath = './uploads';
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

// Start the server
server;

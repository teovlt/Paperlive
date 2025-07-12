const server = require('./src/server');

import fs from 'fs';

const uploadsPath = './uploads';
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

// Start the server
server;

const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const author = new mongoose.model('Author', authorSchema);
module.exports = author;

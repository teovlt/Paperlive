const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: String,
  grade: String,
  country: String,
});

const author = new mongoose.model('Author', authorSchema);
module.exports = author;

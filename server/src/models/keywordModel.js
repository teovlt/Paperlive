const mongoose = require('mongoose');

const keywordSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
});

const keyword = new mongoose.model('Keyword', keywordSchema);
module.exports = keyword;

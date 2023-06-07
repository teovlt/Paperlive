const mongoose = require('mongoose');

const ScientificFieldSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
});

const ScientificField = new mongoose.model('ScientificField', ScientificFieldSchema);
module.exports = ScientificField;

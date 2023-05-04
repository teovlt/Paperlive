const mongoose = require('mongoose');

const contributionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  relatedContribution: String,
  abstract: {
    type: String,
    required: true,
  },
  teamRole: {
    type: String,
    required: true,
  },
});

const contribution = new mongoose.model('Contribution', contributionSchema);
module.exports = contribution;

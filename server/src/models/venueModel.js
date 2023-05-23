const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rank: {
    type: String,
    required: true,
  },
});

const venue = new mongoose.model('Venue', venueSchema);
module.exports = venue;

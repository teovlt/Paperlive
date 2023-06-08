const mongoose = require('mongoose');

const types = ['journal', 'conference'];

const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    validate: {
      validator: function (v) {
        return types.includes(v);
      },
      message: (props) => `${props.value} is not a valid type!`,
    },
  },
  rank: {
    type: String,
    required: true,
  },
});

const venue = new mongoose.model('Venue', venueSchema);
module.exports = venue;

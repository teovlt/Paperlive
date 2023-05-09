const mongoose = require('mongoose');

const states = ['in progress', 'approved', 'dropped'];

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
  state: {
    type: String,
    default: states[0],
    validate: {
      validator: function (v) {
        return states.includes(v);
      },
      message: (props) => `${props.value} is not a valid state!`,
    },
  },
});

const contribution = new mongoose.model('Contribution', contributionSchema);
module.exports = contribution;

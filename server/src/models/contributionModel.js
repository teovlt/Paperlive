const mongoose = require('mongoose');

const states = ['inProgress', 'approved', 'dropped'];
const roles = ['leader', 'coLeader', 'guest'];

const contributionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  relatedContributions: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contribution',
      },
    ],
  },
  abstract: {
    type: String,
    required: true,
  },
  teamRole: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return roles.includes(v);
      },
      message: (props) => `${props.value} is not a valid role!`,
    },
  },
  submissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Submission',
    },
  ],
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

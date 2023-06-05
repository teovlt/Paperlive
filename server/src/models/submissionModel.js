const mongoose = require('mongoose');

const states = ['draft', 'submitted', 'approved', 'rejected'];
const types = ['poster', 'shortPaper', 'contribution'];

const submissionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  submissionDate: {
    type: String,
  },
  abstract: {
    type: String,
  },
  zipFolder: {
    type: String,
  },
  compiledPDF: {
    type: String,
  },
  diffPDF: {
    type: String,
  },
  authors: [
    {
      name: {},
      grade: {},
      country: {},
      isMainAuthor: {
        type: Boolean,
        default: false,
      },
      workTime: {
        type: Number,
        required: true,
      },
      hourlyCost: {
        type: Number,
        required: true,
      },
    },
  ],
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue',
  },
  type: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return types.includes(v);
      },
      message: (props) => `${props.value} is not a valid type!`,
    },
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

const submission = new mongoose.model('Submission', submissionSchema);
module.exports = submission;

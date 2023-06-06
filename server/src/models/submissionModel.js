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
  commentPDF: {
    type: String,
  },
  authors: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      name: {
        type: String,
      },
      grade: {
        type: String,
      },
      country: {
        type: String,
      },
      isMainAuthor: {
        type: Boolean,
      },
      workTime: {
        type: Number,
      },
      hourlyCost: {
        type: Number,
      },
    },
  ],
  venue: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
    },
    rank: {
      type: String,
    },
  },
  type: {
    type: String,
    validate: {
      validator: function (v) {
        if (!v) return true;
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

const mongoose = require('mongoose');

const states = ['draft', 'submitted', 'approved', 'rejected'];
const types = ['poster', 'shortPaper', 'longPaper'];

const submissionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  submissionDate: {
    type: String,
  },
  abstract: {
    type: {
      name: String,
      size: Number,
    },
  },
  zipFolder: {
    type: {
      name: String,
      size: Number,
    },
  },
  compiledPDF: {
    type: {
      name: String,
      size: Number,
    },
  },
  diffPDF: {
    type: {
      name: String,
      size: Number,
    },
  },
  commentPDF: {
    type: {
      name: String,
      size: Number,
    },
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
    type: {
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
  link: {
    type: String,
    required: false,
  },
});

const submission = new mongoose.model('Submission', submissionSchema);
module.exports = submission;

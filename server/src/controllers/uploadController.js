const multer = require('multer');

const Team = require('../models/teamModel');
const Contribution = require('../models/contributionModel');

const teamPictureStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/team/picture/');
  },
  filename: function (req, file, cb) {
    cb(null, 'team-picture-' + req.teamId + '.png');
  },
});

const contributionAbstractStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/contribution/');
  },
  filename: function (req, file, cb) {
    cb(null, req.params.contributionId + '.pdf');
  },
});

module.exports.uploadProfilePicture = (req, res) => {
  const upload = multer({ storage: teamPictureStorage });
  upload.single('file')(req, res, async (err) => {
    if (err) return res.status(400).json({ message: 'Error uploading file', error: err });

    const result = await Team.updateOne(
      { _id: req.teamId },
      { $set: { picture: req.file?.filename } }
    );

    // If the update was successful, return a 200 OK response with a success message
    if (result.matchedCount > 0) {
      return res
        .status(200)
        .json({ message: 'File uploaded successfully', filename: req.file.filename });
    }
  });
};

module.exports.uploadContributionAbstract = (req, res) => {
  const upload = multer({ storage: contributionAbstractStorage });
  upload.single('file')(req, res, async (err) => {
    if (err) return res.status(400).json({ message: 'Error uploading file', error: err });
  });
};

// module.exports.uploadSubmissionZipFolder = (req, res) => {}
// module.exports.uploadSubmissionCompiledPDF = (req, res) => {}
// module.exports.uploadSubmissionDiffPDF = (req, res) => {}

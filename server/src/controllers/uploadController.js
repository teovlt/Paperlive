const multer = require('multer');
const fs = require('fs');
const path = require('path');

const Team = require('../models/teamModel');
const Contribution = require('../models/contributionModel');

const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profile/');
  },
  filename: function (req, file, cb) {
    cb(null, req.teamId + '.gif');
  },
});

const contributionStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/contribution/');
  },
  filename: function (req, file, cb) {
    cb(null, req.params.contributionId + '.pdf');
  },
});

module.exports.getProfile = (req, res) => {
  const filePath = path.join(__dirname, '../../uploads/profile/', req.params.fileName);
  fs.exists(filePath, (exists) => {
    if (exists) res.sendFile(filePath);
    else return res.status(404).json({ error: 'File not found' });
  });
};

module.exports.uploadProfile = (req, res) => {
  const upload = multer({ storage: profileStorage });
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

module.exports.uploadContribution = (req, res) => {
  const upload = multer({ storage: contributionStorage });
  upload.single('file')(req, res, async (err) => {
    if (err) return res.status(400).json({ message: 'Error uploading file', error: err });

    const result = await Contribution.updateOne(
      { _id: req.params.contributionId },
      { $set: { abstract: req.file?.filename } }
    );

    // If the update was successful, return a 200 OK response with a success message
    if (result.matchedCount > 0) {
      return res
        .status(200)
        .json({ message: 'File uploaded successfully', filename: req.file?.filename });
    }
    return res.status(404).json({ error: 'Contribution not found' });
  });
};

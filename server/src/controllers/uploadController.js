const multer = require('multer');
const fs = require('fs');
const path = require('path');

const Team = require('../models/teamModel');

const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profile/');
  },
  filename: function (req, file, cb) {
    cb(null, req.teamId + '.gif');
  },
});

module.exports.getProfile = (req, res) => {
  const filePath = path.join(__dirname, '../../uploads/profile/', req.params.fileName);
  fs.exists(filePath, (exists) => {
    if (exists) res.sendFile(filePath);
    else res.status(404).json({ error: 'File not found' });
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
    return res
      .status(200)
      .json({ message: 'File uploaded successfully', filename: req.file.filename });
  });
};

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const {
  teamPictureStorage,
  contributionAbstractStorage,
  submissionAbstractStorage,
  submissionZipfolderStorage,
  submissionCompiledPDFStorage,
  submissionDiffPDFStorage,
  submissionCommentPDFStorage,
} = require('../utils/multerStorage');
const Team = require('../models/teamModel');

const findFileInSubdirectories = (filename, directory) => {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filepath = path.join(directory + '/' + file);
    const stat = fs.statSync(filepath);

    if (stat.isDirectory()) {
      const foundFile = findFileInSubdirectories(filename, filepath);
      if (foundFile) return foundFile;
    } else if (file === filename) {
      return filepath;
    }
  }
};

/**
 * Download a file.
 * @route GET /api/files/:filename
 * @desc Download a file from the server.
 * @access Private
 */
module.exports.downloadFile = async (req, res) => {
  const { filename } = req.params;
  const filepath = findFileInSubdirectories(filename, `${__dirname}/../../uploads`);

  if (fs.existsSync(filepath)) res.sendFile(filepath);
  else return res.status(404).json({ error: 'File not found' });
};

/**
 * Upload a team picture.
 * @route POST /api/files/team/picture
 * @desc Upload a team picture file.
 * @access Private
 */
module.exports.uploadTeamPicture = async (req, res) => {
  const upload = multer({ storage: teamPictureStorage });
  upload.single('file')(req, res, async (err) => {
    if (err) return res.status(400).json({ message: 'Error uploading file', error: err });

    const result = await Team.updateOne(
      { _id: req.teamId },
      { $set: { picture: req.file?.filename } }
    );

    if (result.matchedCount > 0) {
      return res
        .status(200)
        .json({ message: 'File uploaded successfully', filename: req.file.filename });
    }
  });
};

/**
 * Upload a contribution abstract.
 * @route POST /api/files/contribution/abstract
 * @desc Upload a contribution abstract file.
 * @access Private
 */
module.exports.uploadContributionAbstract = (req, res) => {
  const upload = multer({ storage: contributionAbstractStorage });
  upload.single('file')(req, res, async (err) => {
    if (err) return res.status(400).json({ message: 'Error uploading file', error: err });
  });
};

/**
 * Upload a submission abstract.
 * @route POST /api/files/submission/abstract
 * @desc Upload a submission abstract file.
 * @access Private
 */
module.exports.uploadSubmissionAbstract = (req, res) => {
  const upload = multer({ storage: submissionAbstractStorage });
  upload.single('file')(req, res, async (err) => {
    if (err) return res.status(400).json({ message: 'Error uploading file', error: err });
  });
};

/**
 * Upload a submission zipfolder.
 * @route POST /api/files/submission/zipfolder
 * @desc Upload a submission zipfolder file.
 * @access Private
 */
module.exports.uploadSubmissionZipfolder = (req, res) => {
  const upload = multer({ storage: submissionZipfolderStorage });
  upload.single('file')(req, res, async (err) => {
    if (err) return res.status(400).json({ message: 'Error uploading file', error: err });
  });
};
/**
 * Upload a submission zipfolder.
 * @route POST /api/files/submission/compiledpdf
 * @desc Upload a submission compiledpdf file.
 * @access Private
 */
module.exports.uploadSubmissionCompiledPDF = (req, res) => {
  const upload = multer({ storage: submissionCompiledPDFStorage });
  upload.single('file')(req, res, async (err) => {
    if (err) return res.status(400).json({ message: 'Error uploading file', error: err });
  });
};

/**
 * Upload a submission diffpdf.
 * @route POST /api/files/submission/diffpdf
 * @desc Upload a submission diffpdf file.
 * @access Private
 */
module.exports.uploadSubmissionDiffPDF = (req, res) => {
  const upload = multer({ storage: submissionDiffPDFStorage });
  upload.single('file')(req, res, async (err) => {
    if (err) return res.status(400).json({ message: 'Error uploading file', error: err });
  });
};

/**
 * Upload a submission commentpdf.
 * @route POST /api/files/submission/commentpdf
 * @desc Upload a submission commentpdf file.
 * @access Private
 */
module.exports.uploadSubmissionCommentPDF = (req, res) => {
  const upload = multer({ storage: submissionCommentPDFStorage });
  upload.single('file')(req, res, async (err) => {
    if (err) return res.status(400).json({ message: 'Error uploading file', error: err });
  });
};

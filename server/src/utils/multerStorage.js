const multer = require('multer');

module.exports.teamPictureStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/team/picture/');
  },
  filename: function (req, file, cb) {
    cb(null, 'team-picture-' + req.teamId + '.png');
  },
});

module.exports.submissionAbstractStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/submission/abstract/');
  },
  filename: function (req, file, cb) {
    cb(null, 'temp-submission-abstract-' + req.teamId + '.pdf');
  },
});

module.exports.submissionZipfolderStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/submission/zipfolder/');
  },
  filename: function (req, file, cb) {
    cb(null, 'temp-submission-zipfolder-' + req.teamId + '.zip');
  },
});

module.exports.submissionCompiledPDFStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/submission/compiledpdf/');
  },
  filename: function (req, file, cb) {
    cb(null, 'temp-submission-compiledpdf-' + req.teamId + '.pdf');
  },
});

module.exports.submissionDiffPDFStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/submission/diffpdf/');
  },
  filename: function (req, file, cb) {
    cb(null, 'temp-submission-diffpdf-' + req.teamId + '.pdf');
  },
});

module.exports.submissionCommentPDFStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/submission/commentpdf/');
  },
  filename: function (req, file, cb) {
    cb(null, 'temp-submission-commentpdf-' + req.teamId + '.pdf');
  },
});

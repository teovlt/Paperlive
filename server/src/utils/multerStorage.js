const multer = require('multer');
const fs = require('fs');

module.exports.teamPictureStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderPath = 'uploads/team/picture';
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    cb(null, 'team-picture-' + req.teamId + '.png');
  },
});

module.exports.submissionZipfolderStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderPath = 'uploads/submission/zipfolder';
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    cb(null, 'temp-submission-zipfolder-' + req.teamId + '.zip');
  },
});

module.exports.submissionCompiledPDFStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderPath = 'uploads/submission/compiledpdf';
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    cb(null, 'temp-submission-compiledpdf-' + req.teamId + '.pdf');
  },
});

module.exports.submissionDiffPDFStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderPath = 'uploads/submission/diffpdf';
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    cb(null, 'temp-submission-diffpdf-' + req.teamId + '.pdf');
  },
});

module.exports.submissionCommentPDFStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderPath = 'uploads/submission/commentpdf';
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    cb(null, 'temp-submission-commentpdf-' + req.teamId + '.pdf');
  },
});

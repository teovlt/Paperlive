const multer = require('multer');

module.exports.teamPictureStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/team/picture/');
  },
  filename: function (req, file, cb) {
    cb(null, 'team-picture-' + req.teamId + '.png');
  },
});

module.exports.contributionAbstractStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/contribution/abstract/');
  },
  filename: function (req, file, cb) {
    cb(null, 'temp-contribution-abstract-' + req.teamId + '.pdf');
  },
});

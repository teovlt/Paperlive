const ScientificField = require('../models/scientificFieldModel');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getScientificFields = async (req, res) => {
  const scientificFields = await ScientificField.find();
  return res.json(scientificFields);
};

module.exports.createScientificField = async (req, res) => {
  const scientificField = await ScientificField.create(req.body);
  return res.json(scientificField);
};

module.exports.updateScientificField = async (req, res) => {
  const { scientificFieldId } = req.params;
  if (!ObjectId.isValid(scientificFieldId))
    return res.status(500).json({ error: `Invalid ID: ${scientificFieldId}` });

  const scientificField = await ScientificField.findOneAndUpdate(
    { _id: scientificFieldId },
    { $set: req.body },
    { new: true }
  );

  if (!scientificField) return res.status(404).json({ error: 'ScientificField not found' });
  return res.json(scientificField);
};

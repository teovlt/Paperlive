const Keyword = require('../models/keywordModel');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getKeywords = async (req, res) => {
  const keywords = await Keyword.find();
  return res.status(200).json(keywords);
};

module.exports.createKeyword = async (req, res) => {
  const keyword = new Keyword({
    ...req.body,
  });
  await keyword.save();
  return res.status(201).json(keyword);
};

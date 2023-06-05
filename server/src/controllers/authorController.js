const Author = require('../models/authorModel');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAuthors = async (req, res) => {
  const authors = await Author.find();
  return res.status(200).json(authors);
};

module.exports.createAuthor = async (req, res) => {
  const author = new Author({
    ...req.body,
  });
  await author.save();
  return res.status(200).json(author);
};

module.exports.updateAuthor = async (req, res) => {
  const { authorId } = req.params;
  if (!ObjectId.isValid(authorId))
    return res.status(500).json({ error: `Invalid ID: ${authorId}` });

  const author = await Author.findOneAndUpdate(
    { _id: authorId },
    { $set: { ...req.body } },
    { new: true }
  );
  if (!author) return res.status(404).json({ error: 'Author not found' });
  return res.status(200).json(author);
};

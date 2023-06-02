const Author = require('../models/authorModel');

/**
 * Get one author
 * @route GET /api/authors/
 * @desc Get one author
 * @access Private
 */
module.exports.getAuthors = async (req, res) => {
  const authors = await Author.find();
  return res.status(200).json(authors);
};

module.exports.createOrUpdateAuthor = async (author) => {
  const { _id, ...authorData } = author;
  if (_id) {
    const updatedAuthor = await Author.findOne({ _id: author._id });
    await updatedAuthor.updateOne({ $set: { ...authorData } });
    return updatedAuthor;
  } else {
    return await Author.create({ ...authorData });
  }
};

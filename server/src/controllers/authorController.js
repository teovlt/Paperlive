const Author = require('../models/authorModel');

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

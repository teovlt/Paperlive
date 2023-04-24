const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxLength: 300,
    default: '',
  },
  visibility: {
    type: Boolean,
    default: false,
  },
  picture: {
    type: String,
    default: 'default.png',
  },
  location: {
    type: String,
  },
  website: {
    type: String,
  },
});

teamSchema.methods.comparePassword = async function (password) {
  try {
    // Compare the provided password with the one stored in the database
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (error) {
    // Error handling
    throw new Error(`Error during password comparison: ${error.message}`);
  }
};

teamSchema.static(
  'login',
  async function (name, password) {
    try {
      // Search for the team in the database
      const team = await this.findOne({ name: name });

      // If the team is not found, throw an error
      if (!team) throw new Error('Team not found');

      // Check the password
      const isPasswordCorrect = await team.comparePassword(password);

      // If the password is incorrect, throw an error
      if (!isPasswordCorrect) throw new Error('Wrong password');

      // Return the team if everything is correct
      return team;
    } catch (error) {
      // Error handling
      throw new Error(`Error during login: ${error.message}`);
    }
  },
  { versionKey: false }
);

teamSchema.pre('save', async function (next) {
  try {
    // Generate a salt and hash the provided password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    // Error handling
    return next(new Error(`Error during password hash: ${error.message}`));
  }
});

const team = new mongoose.model('team', teamSchema);
module.exports = team;

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
    default: '',
  },
  location: {
    type: String,
    default: '',
  },
  website: {
    type: String,
    default: '',
  },
  contributions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contribution',
    },
  ],
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
      const team = await this.findOne({ name: name.toLowerCase() });

      // If the team is not found, throw an error
      if (!team) throw new Error();

      // Check the password
      const isPasswordCorrect = await team.comparePassword(password);

      // If the password is incorrect, throw an error
      if (!isPasswordCorrect) throw new Error();

      // Return the team if everything is correct
      return team;
    } catch (error) {
      // Error handling
      throw new Error(`Invalid credentials`);
    }
  },
  { versionKey: false }
);

teamSchema.pre('save', async function (next) {
  try {
    // Set the team name to lowercase
    this.name = this.name.toLowerCase();
    // Generate a salt and hash the provided password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    // Error handling
    return next(new Error(`Error during saving: ${error.message}`));
  }
});

teamSchema.methods.changePassword = async function (oldPassword, newPassword) {
  try {
    // Compare the provided old password with the stored password
    const isPasswordCorrect = await bcrypt.compare(oldPassword, this.password);

    if (!isPasswordCorrect) {
      throw new Error('Invalid password');
    }

    // Update the password in the team instance
    this.password = newPassword;

    // Save the team instance with the updated password
    await this.save();
  } catch (error) {
    // Error handling
    throw new Error(`Error changing password: ${error.message}`);
  }
};

teamSchema.methods.validCredentials = async function (name = '', password = '') {
  try {
    const isPasswordCorrect = await bcrypt.compare(password, this.password);

    return name === this.name && isPasswordCorrect;
  } catch (error) {
    // Error handling
    throw new Error(`Error verfifying credentials: ${error.message}`);
  }
};

const team = new mongoose.model('team', teamSchema);
module.exports = team;

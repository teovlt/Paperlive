const Team = require('../models/teamModel');
const jwt = require('jsonwebtoken');

const maxAge = 24 * 60 * 60 * 1000;

/**
 * Create a JSON Web Token (JWT) using the given payload and a secret key
 * @param {Object} payload - The data to be inclued in the JWT
 * @returns {string} - The generated JWT.
 */
const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: `${maxAge}ms` });
};

/**
 * Handle signin up a new team
 * @route POST /api/auth/register
 * @group Teams
 * @access Public
 */
module.exports.signUp = async (req, res) => {
  try {
    const { name, password } = req.body; // Extract the name and the password from the request
    const team = await new Team({ name, password }).save(); //
    const token = createToken({ id: team._id }); // Generate a JSON Web Token (JWT) using the team ID
    // Set a cookie containing the JWT, with a maxAge (specified above) and set the httpOnly and sameSite for added security
    res.cookie('jwt', token, { maxAge: maxAge, httpOnly: true, sameSite: 'Lax' });
    return res.status(200).json({ message: 'Signed up successfully' }); // Send a success response with a message
  } catch (error) {
    // Error handling
    if (error.code === 11000) {
      error.message = 'team validation failed: name: already taken';
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Handle signing in a team member.
 * @route /api/auth/login
 * @access Public
 */
module.exports.signIn = async (req, res) => {
  try {
    const { name, password } = req.body; // Extract the name and password from the request
    const team = await Team.login(name, password); // Call the Team.login method to authenticate the team
    const token = createToken({ id: team._id }); // Generate a JSON Web Token (JWT) using the team ID
    // Set a cookie containing the JWT, with a maxAge (specified above) and set the httpOnly and sameSite for added security
    res.cookie('jwt', token, { maxAge: maxAge, httpOnly: true, sameSite: 'Lax' });
    return res.status(200).json({ message: 'Signed in successfully' }); // Send a success response with a message
  } catch (error) {
    // Error handling
    return res.status(200).json({ error: error.message });
  }
};


/**
 * Handle signOut a team
 * @route /api/auth/logout
 * @access /Public 
 */
module.exports.signOut = async (req, res) => {
  try {
    // Clear the JWT cookie
    res.clearCookie('jwt');

    // Send a success response
    res.status(200).json({ message: 'Signed out successfully' });
  } catch (error) {
    // Error handling
    return res.status(500).json({error : error.message});
  }
};

module.exports.createToken = createToken;

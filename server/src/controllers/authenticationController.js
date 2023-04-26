const Team = require('../models/teamModel');
const jwt = require('jsonwebtoken');

/**
 * Create a JSON Web Token (JWT) using the given ID and a secret key
 * @param {string} teamId - The data to be inclued in the JWT
 * @returns {string} - The generated JWT.
 */
const generateAccessToken = (teamId) => {
  return jwt.sign({ id: teamId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: `5m` });
};

/**
 * Create a JSON Web Token (JWT) using the given ID and a secret key
 * @param {string} teamId - The data to be inclued in the JWT
 * @returns {string} - The generated JWT.
 */
const generateRefreshToken = (teamId) => {
  return jwt.sign({ id: teamId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
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
    const accessToken = generateAccessToken(team._id);
    const refreshToken = generateRefreshToken(team._id);

    res.cookie('__refresh__token', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(200).json({ accessToken });
  } catch (error) {
    // Error handling
    if (error.code === 11000) {
      error.message = `Unable to create team. This name is already taken.`;
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
    const accessToken = generateAccessToken(team._id);
    const refreshToken = generateRefreshToken(team._id);

    res.cookie('__refresh__token', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(200).json({ accessToken });
  } catch (error) {
    // Error handling
    return res.status(400).json({ error: error.message });
  }
};

/**
 * Handle signOut a team
 * @route /api/auth/logout
 * @access Public
 */
module.exports.signOut = async (req, res) => {
  try {
    // Clear the JWT cookie
    res.clearCookie('__refresh__token');

    // Send a success response
    res.status(200).json({ message: 'Signed out successfully' });
  } catch (error) {
    // Error handling
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Refreshes the access token
 * @route POST /api/auth/refresh-token
 * @desc Refreshes the access token by generating a new one and setting a new httpOnly cookie with the refresh token
 * @access Private
 */
module.exports.refreshToken = async (req, res) => {
  try {
    const accessToken = generateAccessToken(req.teamId);
    res.cookie('__refresh__token', req.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(200).json({ accessToken });
  } catch (error) {
    // Error handling
    return res.status(500).json({ error: error.message });
  }
};

module.exports.generateAccessToken = generateAccessToken;

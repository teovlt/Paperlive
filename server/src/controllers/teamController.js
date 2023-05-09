const Team = require('../models/teamModel');
const ObjectId = require('mongoose').Types.ObjectId;
const path = require('path');
const fs = require('fs');

/**
 * Get a list of all teams.
 * @route GET /api/teams
 * @group Teams
 * @access Private
 */
module.exports.listTeams = async (req, res) => {
  try {
    // Find all the teams
    const teams = await Team.find().select('name description picture visibility');

    // Return a 200 OK response with the list of teams
    return res.status(200).json(teams);
  } catch (error) {
    // Error handling
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Get a team by ID.
 * @route GET /api/teams/:teamId
 * @group Teams
 * @access Private
 */
module.exports.readTeam = async (req, res) => {
  try {
    const { teamId } = req.params; // Extract the team ID from the request parameters
    // Check if the ID is a valid MongoDB ObjectId
    if (!ObjectId.isValid(teamId)) return res.status(500).json({ error: `Invalid ID: ${teamId}` });

    // Find a team with the given ID and exclude the password field from the result
    const team = await Team.findOne({ _id: teamId }).select('-password');
    // If the team is not found, return a 404 Not Found response with an error message
    if (!team) return res.status(404).json({ error: 'Team not found' });

    // If the team is found, return a 200 OK response with the team object
    return res.status(200).json(team);
  } catch (error) {
    // Error handling
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Retreives details of the authenticated team based on the `teamId` passed in the request
 * @route GET /api/teams/me
 * @group Teams
 * @access Private
 */
module.exports.me = async (req, res) => {
  try {
    const team = await Team.findOne({ _id: req.teamId }).select('-password');
    if (!team) return res.status(404).json({ error: 'Team not found' });

    return res.status(200).json(team);
  } catch (error) {
    // Error handling
    return res.status(500).json({ error: error.message });
  }
};

/**
 *
 */
module.exports.getPicture = async (req, res) => {
  const filePath = path.join(__dirname, '../../uploads/team/picture/', req.params.filename);
  if (fs.existsSync(filePath)) res.sendFile(filePath);
  else return res.status(404).json({ error: 'File not found' });
};

/**
 * Update a team by ID
 * @route PUT /api/teams/update
 * @group Teams
 * @access Private
 */
module.exports.updateTeam = async (req, res) => {
  try {
    // Extract the request body fields
    const { description, visibility, location, website } = req.body;

    // Find the team with the given ID and update it in the database
    const result = await Team.updateOne(
      { _id: req.teamId },
      { $set: { description, visibility, location, website } }
    );

    // If the update was successful, return a 200 OK response with a success message
    if (result.matchedCount > 0) {
      return res.status(200).json({ message: 'Successfully updated' });
    }

    // If no documents were modified, return a 404 Not Found response with an error message
    return res.status(404).json({ error: 'Team not found' });
  } catch (error) {
    // Error handling
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Delete a team by ID
 * @route DELETE /api/teams/delete
 * @group Teams
 * @access Private
 */
module.exports.deleteTeam = async (req, res) => {
  try {
    // Find the team with the givent ID and delete it in the database
    const result = await Team.deleteOne({ _id: req.teamId });

    // If the deletion was successful, return a 200 OK response with a success message
    if (result.deletedCount > 0) {
      return res.status(200).json({ message: 'Successfully deleted' });
    }

    // If no documents were deleted, return a 404 Not Found response with an error message
    return res.status(404).json({ error: 'Team not found' });
  } catch (error) {
    // Error handling
    return res.status(500).json({ error: error.message });
  }
};

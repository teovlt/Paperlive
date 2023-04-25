const Team = require('../models/teamModel');
const ObjectId = require('mongoose').Types.ObjectId;

/**
 * Get a list of all teams.
 * @route GET /api/teams
 * @group Teams
 * @access Public
 */
module.exports.listTeams = async (req, res) => {
  try {
    // Find all the teams and exclude the password field from the result
    const teams = await Team.find().select('-password');

    // Return a 200 OK response with the list of teams
    return res.status(200).json(teams);
  } catch (error) {
    // Error handling
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Get a team by ID.
 * @route GET /api/teams/:teamId
 * @group Teams
 * @access Public
 */
module.exports.readTeam = async (req, res) => {
  try {
    const { teamId } = req.params; // Extract the team ID from the request parameters
    // Check if the ID is a valid MongoDB ObjectId
    if (!ObjectId.isValid(teamId))
      return res.status(500).json({ message: `Invalid ID: ${teamId}` });

    // Find a team with the given ID and exclude the password field from the result
    const team = await Team.findOne({ _id: teamId }).select('-password');
    // If the team is not found, return a 404 Not Found response with an error message
    if (!team) return res.status(404).json({ message: 'Team not found' });

    // If the team is found, return a 200 OK response with the team object
    return res.status(200).json(team);
  } catch (error) {
    // Error handling
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Update a team by ID.
 * @route PUT /api/teams/:teamId
 * @group Teams - Operation about teams
 * @access Private
 */
module.exports.updateTeam = async (req, res) => {
  try {
    // Extract the request body fields
    const { name, description, picture, visibility, location, website } = req.body;

    // Get the team ID from the request parameters
    const { teamId } = req.params;
    // Check if the ID is a valid MongoDB ObjectId
    if (!ObjectId.isValid(teamId))
      return res.status(500).json({ message: `Invalid ID: ${teamId}` });

    // Find the team with the given ID and update it in the database
    const result = await Team.updateOne(
      { _id: teamId },
      { $set: { name, description, picture, visibility, location, website } }
    );

    // If the update was successful, return a 200 OK response with a success message
    if (result.matchedCount > 0) {
      return res.status(200).json({ message: 'Successfully updated' });
    }

    // If no documents were modified, return a 404 Not Found response with an error message
    return res.status(404).json({ message: 'Team not found' });
  } catch (error) {
    // Error handling
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Delete a team by ID.
 * @route DELETE /api/teams/:teamId
 * @group Teams
 * @access Private
 */
module.exports.deleteTeam = async (req, res) => {
  try {
    // Get the team ID from the request parameters
    const { teamId } = req.params;
    // Check if the ID is a valid MongoDB ObjectId
    if (!ObjectId.isValid(teamId))
      return res.status(500).json({ message: `Invalid ID: ${teamId}` });

    // Find the team with the givent ID and delete it in the database
    const result = await Team.deleteOne({ _id: teamId });

    // If the deletion was successful, return a 200 OK response with a success message
    if (result.deletedCount > 0) {
      return res.status(200).json({ message: 'Successfully deleted' });
    }

    // If no documents were deleted, return a 404 Not Found response with an error message
    return res.status(404).json({ message: 'Team not found' });
  } catch (error) {
    // Error handling
    return res.status(500).json({ message: error.message });
  }
};
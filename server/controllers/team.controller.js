const Team = require('../models/team.model');
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
    const docs = await Team.find().select('-password');

    // Return a 200 OK response with the list of teams
    return res.status(200).json(docs);
  } catch (error) {
    // Error handling
    return res.status(500).json(error);
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
    if (!ObjectId.isValid(teamId)) return res.status(500).json({ error: `Invalid ID: ${teamId}` });

    // Find a team with the given ID and exclude the password field from the result
    const team = await Team.findOne({ _id: teamId }).select('-password');
    // If the team is not found, return a 404 Not Found response with an error message
    if (!team) return res.status(404).json({ error: 'Team not found' });

    // If the team is found, return a 200 OK response with the team object
    return res.status(200).json(team);
  } catch (error) {
    // Error handling
    return res.status(500).json(error);
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
    // TODO: Validate the request body fields

    // Get the team ID from the request parameters
    const { teamId } = req.params;
    // Check if the ID is a valid MongoDB ObjectId
    if (!ObjectId.isValid(teamId)) return res.status(500).json({ error: `Invalid ID: ${teamId}` });

    // Find the team with the given ID
    const team = await Team.findOne({ _id: teamId });
    // If the team is not found, return a 404 Not Found response with an error message
    if (!team) return res.status(404).json({ error: 'Team not found' });

    // Check if the authenticated user owns the team
    if (!team._id.equals(req.session.id)) return res.status(403).json({ error: 'Forbidden' });

    // Update the team fields with the request body fields
    team.name = name;
    team.description = description;
    team.picture = picture;
    team.visibility = visibility;
    team.location = location;
    team.website = website;

    // Save the updated team to the database
    await team.save();

    // Return a 200 OK response with the updated team object
    return res.status(200).json(team);
  } catch (error) {
    // Error handling
    return res.status(500).json(error);
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
    if (!ObjectId.isValid(teamId)) return res.status(500).json({ error: `Invalid ID: ${teamId}` });

    // Find the team with the given ID
    const team = await Team.findOne({ _id: teamId });
    // If the team is not found, return a 404 Not Found response with an error message
    if (!team) return res.status(404).json({ error: 'Team not found' });

    // Check if the authenticated user owns the team
    if (!team._id.equals(req.session.id)) return res.status(403).json({ error: 'Forbidden' });

    // Delete the team from the database
    team.deleteOne();
    // Return a 204 No Content response
    return res.status(200).json({ message: 'Successfully deleted' });
  } catch (error) {
    // Error handling
    return res.status(500).json(error.message);
  }
};

const Team = require('../models/teamModel');
const Contribution = require('../models/contributionModel');
const Submission = require('../models/submissionModel');

const ObjectId = require('mongoose').Types.ObjectId;
const path = require('path');
const fs = require('fs');

const dir = `${__dirname}/../../uploads`;
const { removeFilesContainingTerms } = require('../utils/utils');

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
    const team = await Team.findOne({ _id: req.teamId })
      .select('-password')
      .populate('contributions');
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
 * Change a team password
 * @route PUT /api/teams/change-password
 * @group Teams
 * @access Private
 */
module.exports.changePassword = async (req, res) => {
  try {
    // extract the request body fields
    const { oldPassword, newPassword } = req.body;

    // Find the team with the given ID
    const team = await Team.findOne({ _id: req.teamId });

    // If team not found, return a 404 Not Found response with an error message
    if (!team) return res.status(404).json({ error: 'Team not found' });

    await team.changePassword(oldPassword, newPassword);
    return res.status(200).json({ message: 'Successfully updated' });
  } catch (error) {
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
    const { name, password } = req.body;

    // Find the team with the givent ID
    const team = await Team.findOne({ _id: req.teamId });

    if (!team) return res.status(404).json({ error: 'Team not found' });

    // Verify credentials
    const validCredentials = await team.validCredentials(name, password);

    if (validCredentials) {
      // Delete every contributions related to the given team
      team.contributions?.forEach(async (contribution) => {
        // Delete every submissions related to the given contribution
        contribution.submissions?.forEach(async (submission) => {
          // Delete every files related to the given submission
          removeFilesContainingTerms(submission._id);
          await Submission.deleteOne({ _id: submission._id.toString() });
        });

        // Delete every files related to the given contribution
        removeFilesContainingTerms(contribution._id);
        await Contribution.deleteOne({ _id: contribution._id.toString() });
      });

      // Delete every files related to the given team
      removeFilesContainingTerms(team._id);
      await Team.deleteOne({ _id: team._id.toString() });

      return res.status(200).json({ message: 'Successfully deleted' });
    } else {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    // Error handling
    return res.status(500).json({ error: error.message });
  }
};

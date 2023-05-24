const Team = require('../models/teamModel');
const Contribution = require('../models/contributionModel');
const Submission = require('../models/submissionModel');
const Author = require('../models/authorModel');
const Venue = require('../models/venueModel');

const ObjectId = require('mongoose').Types.ObjectId;

/**
 * Get a list of all submissions belong to team
 * @route GET /api/submissions
 * @group Submissions
 * @access Private
 */
module.exports.listSubmissionsBelongToTeam = async (req, res) => {
  try {
    const team = await Team.findOne({ _id: req.teamId });
    if (!team) return res.status(404).json({ error: 'Team not found' });

    let submissions = [];

    await Promise.all(
      team.contributions.map(async (c) => {
        const contribution = await Contribution.findOne({ _id: c._id }).populate('submissions');
        await Promise.all(
          contribution.submissions.map(async (c) => {
            const submission = await Submission.findOne({ _id: c._id }).populate(
              'authors.author venue'
            );
            submissions.push(submission);
          })
        );
      })
    );

    return res.status(200).json(submissions);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Get a list of all submissions belong to a contribution
 * @route GET /api/submissions/:contributionId
 * @group Submissions
 * @access Private
 */
module.exports.listSubmissionsBelongToContribution = async (req, res) => {
  try {
    const { contributionId } = req.params;
    if (!ObjectId.isValid(contributionId))
      return res.status(500).json({ error: `Invalid ID: ${contributionId}` });

    const team = await Team.findOne({ _id: req.teamId, contributions: { $in: [contributionId] } });
    if (!team) return res.status(404).json({ error: 'Contribution not found' });

    const contribution = await Contribution.findOne({ _id: contributionId });

    let submissions = [];

    await Promise.all(
      contribution.submissions.map(async (c) => {
        const submission = await Submission.findOne({ _id: c._id }).populate(
          'authors.author venue'
        );
        submissions.push(submission);
      })
    );

    return res.status(200).json(submissions);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Get a submission by ID
 * @route GET /api/submissions/:submissionId
 * @group Submissions
 * @access Private
 */

/**
 * Create a new submission and add it to the given contribution
 * @route POST /api/submissions/new
 * @group Submissions
 * @access Private
 * @params {contributionId, title, type, state?, submissionDate?, abstract?, zipFolder?, compiledPDF?, diffPDF?, authors[]?, venue?}
 */
module.exports.createSubmission = async (req, res) => {
  try {
    const _id = new ObjectId();
    const { contributionId, authors, venue: v, ...submissionData } = req.body;
    let venue = v;

    const team = await Team.findOne({
      _id: req.teamId,
      contributions: { $in: [contributionId] },
    });
    if (!team) return res.status(404).json({ error: 'Contribution not found' });

    // TODO: rename files

    await Promise.all(
      authors.map(async (c, index) => {
        if (c.author._id) {
          const newAuthor = await Author.findOne({ _id: c.author._id });
          await newAuthor.updateOne({
            $set: {
              name: c.author.name,
              grade: c.author.grade,
              country: c.author.country,
            },
          });
          authors[index]['author'] = newAuthor._id;
        } else {
          authors[index]['author'] = await new Author({ ...c.author }).save()._id;
        }
      })
    );

    if (venue) {
      if (venue._id) {
        const newVenue = await Venue.findOne({ _id: venue._id });
        await newVenue.updateOne({
          $set: {
            name: venue.name,
            rank: venue.rank,
          },
        });
        venue = newVenue._id;
      } else {
        venue = await new Venue({ ...venue }).save()._id;
        console.log(venue);
      }
    }

    const submission = new Submission({
      _id,
      venue,
      authors,
      ...submissionData,
    });
    await submission.save();

    const result = await Contribution.updateOne(
      { _id: contributionId },
      { $push: { submissions: submission._id } }
    );

    if (result.matchedCount > 0) {
      return res.status(201).json({ message: 'Successfully created' });
    }

    return res.status(404).json({ error: 'Contribution not found' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Update a submission by ID
 * @route PUT /api/submissions/:submissionId
 * @group Submissions
 * @access Private
 * @params {title?, type?, state?, submissionDate?, abstract?, zipFolder?, compiledPDF?, diffPDF?, authors[]?, venue?}
 */

/**
 * Delete a submission by ID
 * @route DELETE /api/submissions/:submissionId
 * @group Submissions
 * @access Private
 */

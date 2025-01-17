const Team = require('../models/teamModel');
const Contribution = require('../models/contributionModel');
const Submission = require('../models/submissionModel');
const Author = require('../models/authorModel');
const Venue = require('../models/venueModel');
const submission = require('../models/submissionModel');

const fs = require('fs');
const { removeFilesContainingTerms } = require('../utils/utils');
const { createOrUpdateAuthor } = require('./authorController');
const { createOrUpdateVenue } = require('./venueController');
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
      team.contributions?.map(async (c) => {
        const contribution = await Contribution.findOne({ _id: c._id });
        contribution &&
          (await Promise.all(
            contribution.submissions?.map(async (c) => {
              const submission = await Submission.findOne({ _id: c._id }).populate('venue');
              submissions.push(submission);
            })
          ));
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
module.exports.readSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    if (!ObjectId.isValid(submissionId))
      return res.status(500).json({ error: `Invalid ID: ${submissionId}` });

    const team = await Team.findOne({ _id: req.teamId }).populate('contributions');
    if (!team) return;

    const contribution = team.contributions?.find((contribution) =>
      contribution.submissions?.some((submission) => submission._id.toString() === submissionId)
    );

    if (!contribution) return res.status(404).json({ error: 'Submission not found' });

    const submission = await Submission.findOne({ _id: submissionId }).populate('venue');

    return res.status(200).json(submission);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

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
    const { contributionId, ...submissionData } = req.body;

    const team = await Team.findOne({ _id: req.teamId, contributions: { $in: [contributionId] } });
    if (!team) return res.status(404).json({ error: 'Team not found' });

    if (
      fs.existsSync(
        `${__dirname}/../../uploads/submission/zipfolder/temp-submission-zipfolder-${req.teamId}.zip`
      )
    ) {
      fs.renameSync(
        `${__dirname}/../../uploads/submission/zipfolder/temp-submission-zipfolder-${req.teamId}.zip`,
        `${__dirname}/../../uploads/submission/zipfolder/submission-zipfolder-${_id}.zip`
      );
    }

    if (
      fs.existsSync(
        `${__dirname}/../../uploads/submission/compiledpdf/temp-submission-compiledpdf-${req.teamId}.pdf`
      )
    ) {
      fs.renameSync(
        `${__dirname}/../../uploads/submission/compiledpdf/temp-submission-compiledpdf-${req.teamId}.pdf`,
        `${__dirname}/../../uploads/submission/compiledpdf/submission-compiledpdf-${_id}.pdf`
      );
    }

    if (
      fs.existsSync(
        `${__dirname}/../../uploads/submission/diffpdf/temp-submission-diffpdf-${req.teamId}.pdf`
      )
    ) {
      fs.renameSync(
        `${__dirname}/../../uploads/submission/diffpdf/temp-submission-diffpdf-${req.teamId}.pdf`,
        `${__dirname}/../../uploads/submission/diffpdf/submission-diffpdf-${_id}.pdf`
      );
    }

    if (
      fs.existsSync(
        `${__dirname}/../../uploads/submission/commentpdf/temp-submission-commentpdf-${req.teamId}.pdf`
      )
    ) {
      fs.renameSync(
        `${__dirname}/../../uploads/submission/commentpdf/temp-submission-commentpdf-${req.teamId}.pdf`,
        `${__dirname}/../../uploads/submission/commentpdf/submission-commentpdf-${_id}.pdf`
      );
    }

    const submission = new Submission({
      _id,
      ...submissionData,
    });
    await submission.save();

    const contribution = await Contribution.findOne({ _id: contributionId });
    const existing = contribution.state;

    const result = await contribution.updateOne({
      $push: { submissions: submission._id },
      $set: {
        state:
          submissionData.type === 'longPaper' && submissionData.state === 'approved'
            ? 'approved'
            : existing,
      },
    });

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
module.exports.updateSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { ...submissionData } = req.body;

    const team = await Team.findOne({ _id: req.teamId }).populate('contributions');

    const contribution = team.contributions?.find((contribution) =>
      contribution.submissions?.some((submission) => submission._id.toString() === submissionId)
    );
    if (!contribution) return res.status(404).json({ error: 'Contribution not found' });

    if (
      fs.existsSync(
        `${__dirname}/../../uploads/submission/zipfolder/temp-submission-zipfolder-${req.teamId}.zip`
      )
    ) {
      fs.renameSync(
        `${__dirname}/../../uploads/submission/zipfolder/temp-submission-zipfolder-${req.teamId}.zip`,
        `${__dirname}/../../uploads/submission/zipfolder/submission-zipfolder-${submissionId}.zip`
      );
    }

    if (
      fs.existsSync(
        `${__dirname}/../../uploads/submission/compiledpdf/temp-submission-compiledpdf-${req.teamId}.pdf`
      )
    ) {
      fs.renameSync(
        `${__dirname}/../../uploads/submission/compiledpdf/temp-submission-compiledpdf-${req.teamId}.pdf`,
        `${__dirname}/../../uploads/submission/compiledpdf/submission-compiledpdf-${submissionId}.pdf`
      );
    }

    if (
      fs.existsSync(
        `${__dirname}/../../uploads/submission/diffpdf/temp-submission-diffpdf-${req.teamId}.pdf`
      )
    ) {
      fs.renameSync(
        `${__dirname}/../../uploads/submission/diffpdf/temp-submission-diffpdf-${req.teamId}.pdf`,
        `${__dirname}/../../uploads/submission/diffpdf/submission-diffpdf-${submissionId}.pdf`
      );
    }

    if (
      fs.existsSync(
        `${__dirname}/../../uploads/submission/commentpdf/temp-submission-commentpdf-${req.teamId}.pdf`
      )
    ) {
      fs.renameSync(
        `${__dirname}/../../uploads/submission/commentpdf/temp-submission-commentpdf-${req.teamId}.pdf`,
        `${__dirname}/../../uploads/submission/commentpdf/submission-commentpdf-${submissionId}.pdf`
      );
    }

    const submission = await Submission.findOne({ _id: submissionId });

    const result_1 = await submission.updateOne({ $set: { ...submissionData } });

    const existing = contribution.state;

    const result_2 = await contribution.updateOne({
      $set: {
        state:
          submissionData.type === 'longPaper' && submissionData.state === 'approved'
            ? 'approved'
            : existing,
      },
    });

    if (result_1.matchedCount > 0 && result_2.matchedCount > 0) {
      return res.status(201).json({ message: 'Successfully updated' });
    }

    return res.status(404).json({ error: 'Submission not found' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Delete a submission by ID
 * @route DELETE /api/submissions/delete/:submissionId
 * @group Submissions
 * @access Private
 */
module.exports.deleteSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    if (!ObjectId.isValid(submissionId))
      return res.status(500).json({ error: `Invalid ID: ${submissionId}` });

    const team = await Team.findOne({ _id: req.teamId }).populate('contributions');
    if (!team) return res.status(404).json({ error: 'Team not found' });

    const contribution = team.contributions?.find((contribution) =>
      contribution.submissions?.some((submission) => submission._id.toString() === submissionId)
    );

    if (contribution) {
      await contribution.updateOne({ $pull: { submissions: submissionId } });
      removeFilesContainingTerms(submissionId);
      const result = await Submission.deleteOne({ _id: submissionId });
      if (result.deletedCount > 0) return res.status(200).json({ message: 'Successfully deleted' });

      return res.status(400).json({ error: 'Deletion failed' });
    } else return res.status(404).json({ error: 'Submission not found' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

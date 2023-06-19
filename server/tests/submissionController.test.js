const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

const Team = require('../src/models/teamModel');
const Contribution = require('../src/models/contributionModel');
const Submission = require('../src/models/submissionModel');
const ScientificField = require('../src/models/scientificFieldModel');

const { generateAccessToken } = require('../src/controllers/authenticationController');

beforeAll(async () => {
  await mongoose.connect('mongodb://database:27017/paperlive_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

describe('GET /api/submissions/', () => {
  let team;
  let contribution;
  let submission;
  let scientificField;

  beforeEach(async () => {
    scientificField = await ScientificField.create({
      label: 'test',
    });
    team = await Team.create({
      name: 'TestTeam',
      password: 'password123',
    });

    contribution = await Contribution.create({
      title: 'ContributionTest',
      startDate: '2023-01-01',
      teamRole: 'leader',
      abstract: { name: 'contribution-abstract-id.pdf', size: 10 },
      scientificField: scientificField,
    });

    submission = await Submission.create({
      title: 'SubmissionTest',
      type: 'shortPaper',
    });

    await team.updateOne({
      $push: { contributions: contribution._id },
    });

    await contribution.updateOne({
      $push: { submissions: submission._id },
    });
  });

  afterEach(async () => {
    await Team.deleteOne({ _id: team._id });
    await Contribution.deleteOne({ _id: contribution._id });
    await Submission.deleteOne({ _id: submission._id });
    await ScientificField.deleteOne({ _id: scientificField._id });
  });

  it('should return a 200 OK response with a list of the submissions', async () => {
    const res = await request(app)
      .get('/api/submissions')
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(200);
  });

  it('should return a 404 Not Found response with an error message', async () => {
    const unknownId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .get('/api/submissions')
      .set('Authorization', `Bearer ${generateAccessToken(unknownId)}`);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Team not found' });
  });

  it('should handle errors properly', async () => {
    const error = new Error(`Test error`);
    jest.spyOn(Team, 'findOne').mockImplementationOnce(() => {
      throw error;
    });

    const res = await request(app)
      .get('/api/submissions')
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: error.message });
  });
});

describe('GET /api/submissions/:submissionId', () => {
  let team;
  let contribution;
  let submission;
  let scientificField;

  beforeEach(async () => {
    scientificField = await ScientificField.create({
      label: 'test',
    });
    team = await Team.create({
      name: 'TestTeam',
      password: 'password123',
    });

    contribution = await Contribution.create({
      title: 'ContributionTest',
      startDate: '2023-01-01',
      teamRole: 'leader',
      abstract: { name: 'contribution-abstract-id.pdf', size: 10 },
      scientificField: scientificField,
    });

    submission = await Submission.create({
      title: 'SubmissionTest',
      type: 'shortPaper',
    });

    await team.updateOne({
      $push: { contributions: contribution._id },
    });

    await contribution.updateOne({
      $push: { submissions: submission._id },
    });
  });

  afterEach(async () => {
    await Team.deleteOne({ _id: team._id });
    await Contribution.deleteOne({ _id: contribution._id });
    await Submission.deleteOne({ _id: submission._id });
    await ScientificField.deleteOne({ _id: scientificField._id });
  });

  it('should return a 200 OK response with a submission', async () => {
    const res = await request(app)
      .get(`/api/submissions/${submission._id}`)
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(200);
  });

  it('should return a 404 Not Found response with an error message', async () => {
    const unknownId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .get(`/api/submissions/${unknownId}`)
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Submission not found' });
  });

  it('should return a 500 Internal Error response with an error message', async () => {
    const invalidId = 'invalidId';
    const res = await request(app)
      .get(`/api/submissions/${invalidId}`)
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: `Invalid ID: ${invalidId}` });
  });

  it('should handle errors properly', async () => {
    const error = new Error(`Test error`);
    jest.spyOn(Team, 'findOne').mockImplementationOnce(() => {
      throw error;
    });

    const res = await request(app)
      .get(`/api/submissions/${contribution._id}`)
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: error.message });
  });
});

describe('DELETE /api/submissions/delete/:submissionId', () => {
  let team;
  let contribution;
  let submission;
  let scientificField;

  beforeEach(async () => {
    scientificField = await ScientificField.create({
      label: 'test',
    });
    team = await Team.create({
      name: 'TestTeam',
      password: 'password123',
    });

    contribution = await Contribution.create({
      title: 'ContributionTest',
      startDate: '2023-01-01',
      teamRole: 'leader',
      abstract: { name: 'contribution-abstract-id.pdf', size: 10 },
      scientificField: scientificField,
    });

    submission = await Submission.create({
      title: 'SubmissionTest',
      type: 'shortPaper',
    });

    await team.updateOne({
      $push: { contributions: contribution._id },
    });

    await contribution.updateOne({
      $push: { submissions: submission._id },
    });
  });

  afterEach(async () => {
    await Team.deleteOne({ _id: team._id });
    await Contribution.deleteOne({ _id: contribution._id });
    await Submission.deleteOne({ _id: submission._id });
    await ScientificField.deleteOne({ _id: scientificField._id });
  });

  it('should return a 200 OK response with a submission', async () => {
    const res = await request(app)
      .delete(`/api/submissions/delete/${submission._id}`)
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Successfully deleted' });
  });

  it('should return a 404 response if the team is not found', async () => {
    const unknownId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .delete(`/api/submissions/delete/${submission._id}`)
      .set('Authorization', `Bearer ${generateAccessToken(unknownId)}`);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Team not found' });
  });

  it('should return a 500 response if the submissionId is invalid', async () => {
    const invalidId = 'invalidId';

    const res = await request(app)
      .delete(`/api/submissions/delete/${invalidId}`)
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: `Invalid ID: ${invalidId}` });
  });

  it('should handle errors properly', async () => {
    const error = new Error(`Test error`);
    jest.spyOn(Submission, 'deleteOne').mockImplementationOnce(() => {
      throw error;
    });

    const res = await request(app)
      .delete(`/api/submissions/delete/${submission._id}`)
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: error.message });
  });
});

describe('POST /api/submissions/new', () => {
  let team;
  let contribution;
  let scientificField;

  beforeEach(async () => {
    scientificField = await ScientificField.create({
      label: 'test',
    });
    team = await Team.create({
      name: 'TestTeam',
      password: 'password123',
    });

    contribution = await Contribution.create({
      title: 'ContributionTest',
      startDate: '2023-01-01',
      teamRole: 'leader',
      abstract: { name: 'contribution-abstract-id.pdf', size: 10 },
      scientificField: scientificField,
    });

    await team.updateOne({
      $push: { contributions: contribution._id },
    });
  });

  afterEach(async () => {
    await Team.deleteOne({ _id: team._id });
    await Contribution.deleteOne({ _id: contribution._id });
    await ScientificField.deleteOne({ _id: scientificField._id });
  });

  it('should return a 200 OK response and create a submission', async () => {
    const res = await request(app)
      .post(`/api/submissions/new/`)
      .send({ title: 'SubmissionTest', type: 'shortPaper', contributionId: contribution._id })
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ message: 'Successfully created' });
  });

  it('should return a 404 error if the team is not found', async () => {
    const unknownId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .post(`/api/submissions/new/`)
      .send({ title: 'SubmissionTest', type: 'shortPaper', contributionId: contribution._id })
      .set('Authorization', `Bearer ${generateAccessToken(unknownId)}`);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Team not found' });
  });

  it('should handle errors properly', async () => {
    const error = new Error(`Test error`);
    jest.spyOn(Contribution, 'updateOne').mockImplementationOnce(() => {
      throw error;
    });

    const res = await request(app)
      .post(`/api/submissions/new/`)
      .send({ title: 'SubmissionTest', type: 'shortPaper', contributionId: contribution._id })
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: error.message });
  });
});

describe('PUT /api/submissions/update/:submissionId', () => {
  let team;
  let contribution;
  let submission;
  let scientificField;

  beforeEach(async () => {
    scientificField = await ScientificField.create({
      label: 'test',
    });
    team = await Team.create({
      name: 'TestTeam',
      password: 'password123',
    });

    contribution = await Contribution.create({
      title: 'ContributionTest',
      startDate: '2023-01-01',
      teamRole: 'leader',
      abstract: { name: 'contribution-abstract-id.pdf', size: 10 },
      scientificField: scientificField,
    });

    submission = await Submission.create({
      title: 'SubmissionTest',
      type: 'shortPaper',
    });

    await team.updateOne({
      $push: { contributions: contribution._id },
    });

    await contribution.updateOne({
      $push: { submissions: submission._id },
    });
  });

  afterEach(async () => {
    await Team.deleteOne({ _id: team._id });
    await Contribution.deleteOne({ _id: contribution._id });
    await Submission.deleteOne({ _id: submission._id });
    await ScientificField.deleteOne({ _id: scientificField._id });
  });

  it('should return a 200 status and update the submission', async () => {
    const res = await request(app)
      .put(`/api/submissions/${submission._id}`)
      .send({ title: 'SubmissionTestUpdated' })
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ message: 'Successfully updated' });
  });

  it('should return a 404 error if the team isnt found', async () => {
    const unknownId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .put(`/api/submissions/${unknownId}`)
      .send({ title: 'SubmissionTestUpdated' })
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Contribution not found' });
  });

  it('should handle errors properly', async () => {
    jest.spyOn(Submission, 'updateOne').mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    const res = await request(app)
      .put(`/api/submissions/${submission._id}`)
      .send({ title: 'SubmissionTestUpdated' })
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(500);
    expect(res.body.error).toBeDefined();
  });
});

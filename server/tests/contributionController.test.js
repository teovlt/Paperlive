const request = require('supertest');

const mongoose = require('mongoose');

const app = require('../src/app');

const Team = require('../src/models/teamModel');

const Contribution = require('../src/models/contributionModel');

const { generateAccessToken } = require('../src/controllers/authenticationController');

beforeAll(async () => {
  await mongoose.connect('mongodb://db:27017/paperlive_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('GET /api/contributions', () => {
  let team;

  beforeEach(async () => {
    // Create a team for testing*
    team = await Team.create({ name: 'Test Team', password: 'password' });
  });

  afterEach(async () => {
    // Delete the test team from the database*
    await Team.deleteOne({ _id: team._id });
  });

  it('should return a 200 OK response with a list of the contributions', async () => {
    const res = await request(app)
      .get('/api/contributions')
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(200);
  });

  it('should return a 404 Not Found error if the team does not exist', async () => {
    const unknownId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .get('/api/contributions')
      .set('Authorization', `Bearer ${generateAccessToken(unknownId)}`);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Team not found' });
  });

  it('should handle errors properly', async () => {
    jest.spyOn(Contribution, 'find').mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    const res = await request(app)
      .get('/api/contributions')
      .set('Authorization', `Bearer ${generateAccessToken('123')}`);

    expect(res.status).toBe(500);
    expect(res.body.error).toBeDefined();
  });
});

describe('GET /api/contributions/:contributionId', () => {
  let team;
  let contribution;

  beforeEach(async () => {
    // Create a team for testing*

    contribution = await Contribution.create({
      title: 'Test Contribution',
      startDate: '2023-05-16',
      relatedContribution: '',
      abstract: 'abstract.pdf',
      teamRole: 'leader',
    });
    team = await Team.create({
      name: 'Test Team',
      password: 'password',
    });
  });

  afterEach(async () => {
    // Delete the test team from the database*
    await Team.deleteOne({ _id: team._id });
    await Contribution.deleteOne({ _id: contribution._id });
  });

  it('should read a contribution and return 200 status', async () => {
    const res = await request(app)
      .get(`/api/contributions/${contribution._id}`)
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(200);
  });

  it('should return a 404 Not Found error if the team does not exist', async () => {
    const unknownId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .get(`/api/contributions/${contribution._id}`)
      .set('Authorization', `Bearer ${generateAccessToken(unknownId)}`);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Team not found' });
  });

  it('should return a 500 Invalid ID error if the id of the contribution is unvalid', async () => {
    const falseId = 'lalaa';

    const res = await request(app)
      .get(`/api/contributions/${falseId}`)
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: `Invalid ID: ${falseId}` });
  });

  it('should handle errors properly', async () => {
    jest.spyOn(Contribution, 'findOne').mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    const res = await request(app)
      .get(`/api/contributions/${contribution._id}`)
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(500);
    expect(res.body.error).toBeDefined();
  });
});

describe('DELETE /api/contributions/delete/:contributionId', () => {
  let team;
  let contribution;

  beforeEach(async () => {
    // Create a team for testing*

    contribution = await Contribution.create({
      title: 'Test Contribution',
      startDate: '2023-05-16',
      relatedContribution: '',
      abstract: 'abstract.pdf',
      teamRole: 'leader',
    });
    team = await Team.create({
      name: 'Test Team',
      password: 'password',
      contributions: [contribution],
    });
  });

  afterEach(async () => {
    // Delete the test team from the database*
    await Team.deleteOne({ _id: team._id });
    await Contribution.deleteOne({ _id: contribution._id });
  });

  it('should return a 200 OK response with a success message and delete the contribution', async () => {
    const res = await request(app)
      .delete(`/api/contributions/delete/${contribution._id}`)
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Successfully deleted' });
  });

  it('should return a 404 Not Found error if the team does not exist', async () => {
    const unknownId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .delete(`/api/contributions/delete/${contribution._id}`)
      .set('Authorization', `Bearer ${generateAccessToken(unknownId)}`);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Contribution not found' });
  });

  it('should return a 500 Invalid ID error if the id of the contribution is unvalid', async () => {
    const falseId = 'lalaa';

    const res = await request(app)
      .delete(`/api/contributions/delete/${falseId}`)
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: `Invalid ID: ${falseId}` });
  });

  it('should handle errors properly and return 500', async () => {
    jest.spyOn(Contribution, 'deleteOne').mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    const res = await request(app)
      .delete(`/api/contributions/delete/${contribution._id}`)
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(500);
    expect(res.body.error).toBeDefined();
  });
});

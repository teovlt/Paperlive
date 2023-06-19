const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

const Team = require('../src/models/teamModel');
const Contribution = require('../src/models/contributionModel');

const { generateAccessToken } = require('../src/controllers/authenticationController');
const ScientificField = require('../src/models/scientificFieldModel');

beforeAll(async () => {
  await mongoose.connect('mongodb://database:27017/paperlive_test', {
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
  let scientificField;
  let abstract;

  beforeEach(async () => {
    // Create a team for testing*

    scientificField = await ScientificField.create({
      label: 'test',
    });

    contribution = await Contribution.create({
      title: 'Test Contribution',
      startDate: '2023-05-16',
      relatedContribution: '',
      abstract: { name: 'abstract.pdf', size: 10 },
      teamRole: 'leader',
      scientificField: scientificField,
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
    await ScientificField.deleteOne({ _id: scientificField._id });
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
    expect(res.body).toEqual({ error: 'Contribution not found' });
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

  let scientificField;

  beforeEach(async () => {
    // Create a team for testing*

    scientificField = await ScientificField.create({
      label: 'test',
    });

    contribution = await Contribution.create({
      title: 'Test Contribution',
      startDate: '2023-05-16',
      relatedContribution: '',
      abstract: { name: 'abstract.pdf', size: 10 },
      teamRole: 'leader',
      scientificField: scientificField,
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
    await ScientificField.deleteOne({ _id: scientificField._id });
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

describe('POST /api/contributions/new', () => {
  let team;
  let scientificField;

  beforeEach(async () => {
    team = await Team.create({
      name: 'Test Team',
      password: 'password',
    });
    scientificField = await ScientificField.create({
      label: 'test',
    });
  });

  afterEach(async () => {
    // Delete the test team from the database*
    await Team.deleteOne({ _id: team._id });
    await ScientificField.deleteOne({ _id: scientificField._id });
  });

  it('should create a contribution and return 201 with a success message', async () => {
    const res = await request(app)
      .post('/api/contributions/new')
      .send({
        title: 'Test Contribution',
        startDate: '2023-05-16',
        relatedContribution: '',
        abstract: { name: 'abstract.pdf', size: 10 },
        teamRole: 'leader',
        scientificField: scientificField,
      })
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ message: `Successfully created` });
  });

  it('should return a 404 error if the team is not found', async () => {
    const unknownId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .post('/api/contributions/new')
      .send({
        title: 'Test Contribution',
        startDate: '2023-05-16',
        relatedContribution: '',
        abstract: { name: 'abstract.pdf', size: 10 },
        teamRole: 'leader',
        scientificField: scientificField,
      })
      .set('Authorization', `Bearer ${generateAccessToken(unknownId)}`);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: `Team not found` });
  });

  it('should handle errors properly and return a 500 status', async () => {
    jest.spyOn(Team, 'updateOne').mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    const res = await request(app)
      .post('/api/contributions/new')
      .send({
        title: 'Test Contribution',
        startDate: '2023-05-16',
        relatedContribution: '',
        abstract: { name: 'abstract.pdf', size: 10 },
        teamRole: 'leader',
        scientificField: scientificField,
      })
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(500);
    expect(res.body.error).toBeDefined();
  });
});

describe('PUT /api/contributions/update/:contributionId', () => {
  let team;
  let contribution;
  let scientificField;

  beforeEach(async () => {
    scientificField = await ScientificField.create({
      label: 'test',
    });

    contribution = await Contribution.create({
      title: 'Test Contribution',
      startDate: '2023-05-16',
      relatedContribution: '',
      abstract: { name: 'abstract.pdf', size: 10 },
      teamRole: 'leader',
      scientificField: scientificField,
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
    await ScientificField.deleteOne({ _id: scientificField._id });
  });

  it('should update a contribution and return 200 with a success message', async () => {
    const res = await request(app)
      .put(`/api/contributions/update/${contribution._id}`)
      .send({
        title: 'Test Contribution nouveau',
      })
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: `Successfully updated` });
  });

  it('should return a 404 error if the team doesnt exist', async () => {
    const unknownId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/api/contributions/update/${contribution._id}`)
      .send({
        title: 'Test Contribution nouveau',
      })
      .set('Authorization', `Bearer ${generateAccessToken(unknownId)}`);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: `Contribution not found` });
  });

  it('should return a 500 if the ID is invalid', async () => {
    const falseId = 'lalaa';
    const res = await request(app)
      .put(`/api/contributions/update/${falseId}`)
      .send({
        title: 'Test Contribution nouveau',
      })
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: `Invalid ID: ${falseId}` });
  });

  it('should handle errors properly', async () => {
    jest.spyOn(Contribution, 'updateOne').mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    const res = await request(app)
      .put(`/api/contributions/update/${contribution._id}`)
      .send({
        title: 'Test Contribution nouveau',
      })
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(500);
    expect(res.body.error).toBeDefined();
  });
});

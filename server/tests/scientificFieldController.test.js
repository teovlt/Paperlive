const ScientificField = require('../src/models/scientificFieldModel');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

const Team = require('../src/models/teamModel');

const { generateAccessToken } = require('../src/controllers/authenticationController');

beforeAll(async () => {
  await mongoose.connect('mongodb://database:27017/paperlive_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('GET /api/scientificFields/', () => {
  let team;

  beforeEach(async () => {
    team = await Team.create({ name: 'Test Team', password: 'password' });
  });

  afterEach(async () => {
    await Team.deleteOne({ _id: team._id });
  });

  it('should return all the scientificFields', async () => {
    const res = await request(app)
      .get(`/api/scientificFields/`)
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);
    expect(res.status).toBe(200);
  });
});

describe('POST /api/scientificFields/', () => {
  let team;

  beforeEach(async () => {
    team = await Team.create({ name: 'Test Team', password: 'password' });
  });

  afterEach(async () => {
    await Team.deleteOne({ _id: team._id });
  });

  it('should return all the scientificFields', async () => {
    const res = await request(app)
      .post(`/api/scientificFields/`)
      .send({ label: 'test' })
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);
    expect(res.status).toBe(200);
  });
});

describe('GET /api/scientificFields/:scientificFieldId', () => {
  let team;
  let scientificField;

  beforeEach(async () => {
    team = await Team.create({
      name: 'teamtest',
      password: 'password',
    });
    scientificField = await ScientificField.create({
      label: 'test',
    });
  });

  afterEach(async () => {
    await Team.deleteOne({ _id: team._id });
    await ScientificField.deleteOne({ _id: scientificField._id });
  });

  it('should return 200 success message and update the scientificField', async () => {
    const res = await request(app)
      .put(`/api/scientificFields/${scientificField._id}`)
      .send({ label: 'testUpdate' })
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(200);
  });
  it('should return 500 error if the ID is invalid', async () => {
    const invalidID = 'lalala';

    const res = await request(app)
      .put(`/api/scientificFields/${invalidID}`)
      .send({ label: 'testUpdate' })
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: `Invalid ID: ${invalidID}` });
  });
  it('should return a 404 error if the scientificField is not found', async () => {
    const unknownId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .put(`/api/scientificFields/${unknownId}`)
      .send({ label: 'testUpdate' })
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'ScientificField not found' });
  });
});

const Venue = require('../src/models/venueModel');
const mongoose = require('mongoose');
const Team = require('../src/models/teamModel');
const request = require('supertest');
const app = require('../src/app');
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

describe('GET /api/venues/', () => {
  let team;

  beforeEach(async () => {
    team = await new Team({ name: 'TestTeam', password: 'password' });
  });

  afterEach(async () => {
    await team.deleteOne({ _id: team._id });
  });

  it('should return all the venues with a 200 response', async () => {
    const res = await request(app)
      .get('/api/venues/')
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(200);
  });
});

describe('POST /api/venues/', () => {
  let team;

  beforeEach(async () => {
    team = await new Team({ name: 'TestTeam', password: 'password' });
  });

  afterEach(async () => {
    await team.deleteOne({ _id: team._id });
  });

  it('should create an venue', async () => {
    const res = await request(app)
      .post('/api/venues/')
      .send({ name: 'ttc', rank: 'a+' })
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(200);
  });
});

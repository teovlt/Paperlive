const Author = require('../src/models/authorModel');
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

describe('GET /api/authors/', () => {
  let team;

  beforeEach(async () => {
    team = await new Team({ name: 'TestTeam', password: 'password' });
  });

  afterEach(async () => {
    await team.deleteOne();
  });

  it('should give me an author with a 200 response', async () => {
    const res = await request(app)
      .get('/api/authors/')
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(200);
  });
});



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

describe('PUT /api/venues/:venueId', () => {
  let team;
  let venue;

  beforeEach(async () => {
    team = await new Team({ name: 'TestTeam', password: 'password' });
    venue = await new Venue({ name: 'ttc', rank: 'a+' });
  });

  afterEach(async () => {
    await team.deleteOne({ id: team._id });
    await venue.deleteOne({ _id: venue._id });
  });

  it('should update the venue and gives a 200 status', async () => {
    await venue.save();
    const venueId = venue._id;
    const res = await request(app)
      .put(`/api/venues/${venueId}`)
      .send({ rank: 'c-' })
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(200);
  });

  it('should return a 404 error if the venue doesnt exist', async () => {
    const unknownId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .put(`/api/venues/${unknownId}`)
      .send({ rank: 'c-' })
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Venue not found' });
  });

  it('should return a 500 error if id is invalid', async () => {
    const falseID = 'lalala';

    const res = await request(app)
      .put(`/api/venues/${falseID}`)
      .send({ rank: 'c-' })
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: `Invalid ID: ${falseID}` });
  });
});

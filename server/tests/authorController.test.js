const Author = require('../src/models/authorModel');
const mongoose = require('mongoose');
const Team = require('../src/models/teamModel');
const request = require('supertest');
const app = require('../src/app');
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

describe('GET /api/authors/', () => {
  let team;

  beforeEach(async () => {
    team = await new Team({ name: 'TestTeam', password: 'password' });
  });

  afterEach(async () => {
    await team.deleteOne({ _id: team._id });
  });

  it('should give me an author with a 200 response', async () => {
    const res = await request(app)
      .get('/api/authors/')
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(200);
  });
});

describe('POST /api/authors/', () => {
  let team;

  beforeEach(async () => {
    team = await new Team({ name: 'TestTeam', password: 'password' });
  });

  afterEach(async () => {
    await team.deleteOne({ _id: team._id });
  });

  it('should create an author', async () => {
    const res = await request(app)
      .post('/api/authors/')
      .send({ name: 'jean', grade: 'student', country: 'france', email : 'jeanemail' })
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(201);
  });
});

describe('PUT /api/authors/:authorId', () => {
  let team;
  let author;

  beforeEach(async () => {
    team = await new Team({ name: 'TestTeam', password: 'password' });
    author = await new Author({ name: 'jean', grade: 'student', country: 'france', email : 'jeanemail'  });
  });

  afterEach(async () => {
    await team.deleteOne({ id: team._id });
    await author.deleteOne({ _id: author._id });
  });

  it('should update the author and gives a 200 status', async () => {
    await author.save();
    const authorId = author._id;
    const res = await request(app)
      .put(`/api/authors/${authorId}`)
      .send({ country: 'germany' })
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(200);
  });

  it('should return a 404 error if the author doesnt exist', async () => {
    const unknownId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .put(`/api/authors/${unknownId}`)
      .send({ country: 'germany' })
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Author not found' });
  });

  it('should return a 500 error if id is invalid', async () => {
    const falseID = 'lalala';

    const res = await request(app)
      .put(`/api/authors/${falseID}`)
      .send({ country: 'germany' })
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: `Invalid ID: ${falseID}` });
  });
});

const request = require('supertest');
const mongoose = require('mongoose');

const authenticationController = require('../src/controllers/authenticationController');

const app = require('../src/app');
const Team = require('../src/models/teamModel');

beforeAll(async () => {
  await mongoose.connect('mongodb://db:27017/paperlive_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('POST /api/auth/register', () => {
  afterEach(async () => {
    await Team.deleteMany();
  });

  it('should create a new team and return a 200 OK response with an access token', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'TestTeam', password: 'testpassword' });

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeDefined();
    expect(res.headers['set-cookie'][0]).toContain('__refresh__token');
  });

  it('should return a 400 Bad Request response with an error message', async () => {
    const team = new Team({ name: 'TestTeam', password: 'testpassword' });
    await team.save();

    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'TestTeam', password: 'testpassword' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Unable to create team. This name is already taken.' });
  });

  it('should handle errors properly', async () => {
    const error = new Error('Test error');
    jest.spyOn(Team.prototype, 'save').mockImplementationOnce(() => {
      throw error;
    });

    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'TestTeam', password: 'testpassword' });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: error.message });
  });
});

describe('POST /api/auth/login', () => {
  afterEach(async () => {
    await Team.deleteMany();
  });

  it('should return a 400 Bad Request response with an error message when the name is incorrect', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ name: 'TestTeam', password: 'testpassword' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid credentials' });
  });

  it('should return a 400 Bad Request response with an error message when the password is incorrect', async () => {
    const team = new Team({ name: 'TestTeam', password: 'testpassword' });
    await team.save();

    const res = await request(app)
      .post('/api/auth/login')
      .send({ name: 'TestTeam', password: 'wrongpassword' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid credentials' });
  });

  it('should sign in a team and return 200 OK response with an access token', async () => {
    const team = new Team({ name: 'TestTeam', password: 'testpassword' });
    await team.save();

    const res = await request(app)
      .post('/api/auth/login')
      .send({ name: 'TestTeam', password: 'testpassword' });

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeDefined();
  });
});

describe('GET /api/auth/logout', () => {
  let team, token;

  beforeEach(async () => {
    team = new Team({ name: 'TestTeam', password: 'testpassword' });
    await team.save();
    token = { id: team._id };
  });

  afterEach(async () => {
    await Team.deleteMany();
  });

  it('should sign out a team successfully', async () => {
    const res = await request(app).get('/api/auth/logout').set('Cookie', `jwt=${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Signed out successfully' });
  });

  it('should clear the __refresh__token cookie and return a 200 OK response', async () => {
    const res = await request(app)
      .get('/api/auth/logout')
      .set('Cookie', `__refresh__token=${'thisIsAToken'}`);

    const refreshTokenCookie = res.header['set-cookie'][0].split(';')[0];
    expect(refreshTokenCookie).toMatch('__refresh__token=');
  });

  it('handle errors properly', async () => {
    const error = new Error('Test error');
    const res = {
      clearCookie: jest.fn(() => {
        throw error;
      }),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await authenticationController.signOut({}, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });
});

// describe('GET /api/auth/refresh-token', () => {
//   it('should return a 200 OK response with an accessToken', async () => {
//     const refreshToken = authenticationController.generateRefreshToken('123');
//     const res = await request(app)
//       .get('/api/auth/refresh-token')
//       .set('Cookie', [`__refresh__token=${refreshToken}`]);

//     expect(res.status).toBe(200);
//     expect(res.body.accessToken).toBeDefined();
//   });
// });

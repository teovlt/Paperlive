const request = require('supertest');
const mongoose = require('mongoose');

const authController = require('../src/controllers/authController');

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

describe('signUp', () => {
  afterEach(async () => {
    await Team.deleteMany();
  });

  it('should create a new team and return a success message', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'TestTeam', password: 'testpassword' })
      .expect(200);

    expect(res.body.message).toEqual('Signed up successfully');

    const team = await Team.findOne({ name: 'TestTeam' });
    expect(team).not.toBeNull();
  });

  it('should return an error message if team name already exists', async () => {
    const team = new Team({ name: 'TestTeam', password: 'testpassword' });
    await team.save();

    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'TestTeam', password: 'testpassword' })
      .expect(400);

    expect(res.body.error).toEqual('team validation failed: name: already taken');
  });

  it('should handle errors properly', async () => {
    const error = new Error('Database error');
    jest.spyOn(Team.prototype, 'save').mockImplementationOnce(() => {
      throw error;
    });

    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'TestTeam', password: 'testpassword' })
      .expect(500);

    expect(res.body.error).toEqual(error.message);
  });
});

describe('signIn', () => {
  afterEach(async () => {
    await Team.deleteMany();
  });

  it('should return an error message if the team name does not exist', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ name: 'TestTeam', password: 'testpassword' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ error: 'Error during login: Team not found' });
  });

  it('should return an error message if the password is incorrect', async () => {
    const team = new Team({ name: 'TestTeam', password: 'testpassword' });
    await team.save();

    const res = await request(app)
      .post('/api/auth/login')
      .send({ name: 'TestTeam', password: 'wrongpassword' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ error: 'Error during login: Wrong password' });
  });

  it('should sign in a team and return a success message', async () => {
    const team = new Team({ name: 'TestTeam', password: 'testpassword' });
    await team.save();

    const res = await request(app)
      .post('/api/auth/login')
      .send({ name: 'TestTeam', password: 'testpassword' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Signed in successfully' });
  });
});

describe('signOut', () => {
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

  it('should clear the jwt cookie when signing out', async () => {
    const res = await request(app).get('/api/auth/logout').set('Cookie', `jwt=${token}`);

    const jwtCookie = res.header['set-cookie'][0].split(';')[0];
    expect(jwtCookie).toMatch('jwt=');
  });

  it('handle errors properly', async () => {
    const error = new Error('Database error');
    const res = {
      clearCookie: jest.fn(() => {
        throw error;
      }),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await authController.signOut({}, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });
});

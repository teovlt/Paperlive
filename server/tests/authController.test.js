// Import necessary dependencies for testing
const request = require('supertest');
const mongoose = require('mongoose');

// Import module to be tested
const authController = require('../src/controllers/authController');

// Import application
const app = require('../src/app');

// Import data model "Team"
const Team = require('../src/models/teamModel');

// Function executed before all tests
beforeAll(async () => {
  // Connect to test database
  await mongoose.connect('mongodb://db:27017/paperlive_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Function executed after all tests
afterAll(async () => {
  // Disconnect from test database
  await mongoose.disconnect();
});

//Tests for the function signUp
describe('signUp', () => {
  afterEach(async () => {
    await Team.deleteMany();
  });

  // Test that the sign out route returns 200 status code and the signUp gives the good message
  it('should return a 200 authorized response if a team can signUp', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'TestTeam', password: 'testpassword' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Signed up successfully' });

    const team = await Team.findOne({ name: 'TestTeam' });
    expect(team).not.toBeNull();
  });

  // Test that the sign out route returns 400 status code and the appropriate message
  it('should return a 400 unAuthorized response if the team already exist', async () => {
    const team = new Team({ name: 'TestTeam', password: 'testpassword' });
    await team.save();

    const res = await request(app).post('/api/auth/register');
    send({ name: 'TestTeam', password: 'testpassword' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: 'team validation failed: name: already taken' });
  });

  // Test that the sign out route returns 500 status code and the appropriate error message
  it('should handle errors properly', async () => {
    const error = new Error('Database error');
    jest.spyOn(Team.prototype, 'save').mockImplementationOnce(() => {
      throw error;
    });

    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'TestTeam', password: 'testpassword' });
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: error.message });
  });
});

//Tests for the function signIn
describe('signIn', () => {
  // Clean up after each test
  afterEach(async () => {
    await Team.deleteMany();
  });

  // Test that the sign out route returns 200 status code and the appropriate message
  it('should return an error message if the team name does not exist', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ name: 'TestTeam', password: 'testpassword' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ error: 'Error during login: Team not found' });
  });

  // Test that the sign out route returns 200 status code and the appropriate message
  it('should return an error message if the password is incorrect', async () => {
    const team = new Team({ name: 'TestTeam', password: 'testpassword' });
    await team.save();

    const res = await request(app)
      .post('/api/auth/login')
      .send({ name: 'TestTeam', password: 'wrongpassword' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ error: 'Error during login: Wrong password' });
  });

  // Test that the sign out route returns 200 status code and expected response body
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

//Tests for the function signOut
describe('signOut', () => {
  // Declaring variables that will be used in tests
  let team, token;

  // Set up initial conditions before each test
  beforeEach(async () => {
    team = new Team({ name: 'TestTeam', password: 'testpassword' });
    await team.save();
    token = { id: team._id };
  });

  // Clean up after each test
  afterEach(async () => {
    await Team.deleteMany();
  });

  // Test that the sign out route returns 200 status code and expected response body
  it('should sign out a team successfully', async () => {
    const res = await request(app).get('/api/auth/logout').set('Cookie', `jwt=${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Signed out successfully' });
  });

  // Test that the JWT cookie is cleared when signing out
  it('should clear the jwt cookie when signing out', async () => {
    const res = await request(app).get('/api/auth/logout').set('Cookie', `jwt=${token}`);

    const jwtCookie = res.header['set-cookie'][0].split(';')[0];
    expect(jwtCookie).toMatch('jwt=');
  });

  // Test that errors are handled properly when signing out
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

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

describe('GET /api/teams', () => {
  const testData = [
    new Team({ name: 'Team1', password: 'password1' }),

    new Team({ name: 'Team2', password: 'password2' }),

    new Team({ name: 'Team3', password: 'password3' }),
  ];

  beforeAll(async () => {
    // insert the test data into the database before running the tests*

    await Team.insertMany(testData);
  });

  afterAll(async () => {
    // remove test data from the database after running the tests*

    testData.forEach(async (team) => {
      await Team.deleteOne({ _id: team._id });
    });
  });

  it('should return a 200 OK response with a list of teams', async () => {
    const res = await request(app)
      .get('/api/teams')

      .set('Authorization', `Bearer ${generateAccessToken('123')}`);

    expect(res.status).toBe(200);
  });

  it('should return a 500 error with message when an error occurs', async () => {
    // Mock the Team.find() method to throw an error*

    jest.spyOn(Team, 'find').mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    // Send a GET request to the endpoint*

    const response = await request(app)
      .get('/api/teams')

      .set('Authorization', `Bearer ${generateAccessToken('123')}`);

    // Assert that the response has a 500 status code and contains an error message*

    expect(response.status).toBe(500);

    expect(response.body.error).toBeDefined();
  });
});

describe('GET /api/teams/:teamId', () => {
  let team;

  beforeEach(async () => {
    // Create a team for testing*

    team = await Team.create({ name: 'Test Team', password: 'password' });
  });

  afterEach(async () => {
    // Delete the test team from the database*

    await Team.deleteOne({ _id: team._id });
  });

  it('should return a team object with password field excluded', async () => {
    const res = await request(app)
      .get(`/api/teams/${team._id}`)

      .set('Authorization', `Bearer ${generateAccessToken('123')}`);

    const { password, ...teamWithoutPassword } = { ...team._doc, _id: team._doc._id.toString() };

    expect(res.status).toBe(200);

    expect(res.body).toEqual(teamWithoutPassword);
  });

  it('should return a 404 Not Found when the team is not found', async () => {
    const unknownId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .get(`/api/teams/${unknownId}`)

      .set('Authorization', `Bearer ${generateAccessToken('123')}`);

    expect(res.status).toBe(404);

    expect(res.body).toEqual({ error: 'Team not found' });
  });

  it('should return a 500 Internal Server Error response with an error message if an invalid team ID is provided', async () => {
    const invalidId = 'invalidId';

    const res = await request(app)
      .get(`/api/teams/${invalidId}`)

      .set('Authorization', `Bearer ${generateAccessToken('123')}`);

    expect(res.status).toBe(500);

    expect(res.body).toEqual({ error: `Invalid ID: ${invalidId}` });
  });

  it('should handle errors properly', async () => {
    // mock the team.findOne() method to throw an error*

    const error = new Error('Test error');

    jest.spyOn(Team, 'findOne').mockImplementationOnce(() => {
      throw error;
    });

    const res = await request(app)
      .get(`/api/teams/${team._id}`)

      .set('Authorization', `Bearer ${generateAccessToken('123')}`);

    expect(res.status).toBe(500);

    expect(res.body).toEqual({ error: error.message });
  });
});

describe('GET /api/teams/me', () => {
  let team;

  beforeEach(async () => {
    // Create a team for testing*

    team = await Team.create({ name: 'Test Team', password: 'password' });
  });

  afterEach(async () => {
    // Delete the test team from the database*

    await Team.deleteOne({ _id: team._id });
  });

  it('should return 200 OK response with the team object', async () => {
    const res = await request(app)
      .get(`/api/teams/me`)

      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(200);

    expect(res.body._id).toEqual(team._id.toString());
  });

  it('should return 404 Not Found response with an error message', async () => {
    const unknownId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .get(`/api/teams/me`)

      .set('Authorization', `Bearer ${generateAccessToken(unknownId)}`);

    expect(res.status).toBe(404);

    expect(res.body).toEqual({ error: 'Team not found' });
  });

  it('handle errors properly', async () => {
    const error = new Error('Test error');

    jest.spyOn(Team, 'findOne').mockImplementationOnce(() => {
      throw error;
    });

    const res = await request(app)
      .get(`/api/teams/me`)

      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(500);

    expect(res.body).toEqual({ error: error.message });
  });
});

describe('PUT /api/teams', () => {
  let team;

  beforeEach(async () => {
    // Create a team for testing*

    team = await Team.create({ name: 'Test Team', password: 'password' });
  });

  afterEach(async () => {
    // Delete the test team from the database*

    await Team.deleteOne({ _id: team._id });
  });

  it('should update a team and return 200 OK response with a success message', async () => {
    const newValues = { description: 'new description' };

    const res = await request(app)
      .put(`/api/teams/update`)

      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`)

      .send(newValues);

    expect(res.status).toBe(200);

    expect(res.body).toEqual({ message: 'Successfully updated' });

    // Check that the team was actually updated from the database*

    const updatedTeam = await Team.findOne({ _id: team._id });

    expect(updatedTeam.description).toEqual(newValues.description);
  });

  it('should return a 404 Not Found response with an error message if the team does not exist', async () => {
    // Create a random invalid team ID*

    const unknownId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .put(`/api/teams/update`)

      .set('Authorization', `Bearer ${generateAccessToken(unknownId)}`);

    expect(res.status).toBe(404);

    expect(res.body).toEqual({ error: 'Team not found' });
  });

  it('should handle errors properly', async () => {
    const error = new Error('Test error');

    jest.spyOn(Team, 'updateOne').mockImplementationOnce(() => {
      throw error;
    });

    const res = await request(app)
      .put(`/api/teams/update`)

      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(500);

    expect(res.body).toEqual({ error: error.message });
  });
});

describe('DELETE /api/teams/delete', () => {
  let team;

  beforeEach(async () => {
    // Create a team for testing*

    team = await Team.create({ name: 'Test Team', password: 'password' });
  });

  afterEach(async () => {
    // Delete the test team from the database*

    await Team.deleteOne({ _id: team._id });
  });

  it('should delete a team and return 200 OK reponse with a success message', async () => {
    const res = await request(app)
      .post(`/api/teams/delete`)
      .send({ name: team.name, password: 'password' })
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Successfully deleted' });
  });

  it('should delete a team and return 400 error if wrong credentials', async () => {
    const res = await request(app)
      .post(`/api/teams/delete`)
      .send({ name: team.name, password: 'wrongPassword' })
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid credentials' });
  });

  it('should return a 404 Not Found response with an error message if the team does not exist', async () => {
    const unknownId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .post(`/api/teams/delete`)
      .set('Authorization', `Bearer ${generateAccessToken(unknownId)}`);

    expect(res.status).toBe(404);

    expect(res.body).toEqual({ error: 'Team not found' });
  });

  it('should handle errors properly', async () => {
    const error = new Error('Test error');

    jest.spyOn(Team, 'deleteOne').mockImplementationOnce(() => {
      throw error;
    });

    const res = await request(app)
      .post(`/api/teams/delete`)
      .send({ name: team.name, password: 'password' })
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(500);

    expect(res.body).toEqual({ error: error.message });
  });
});

describe('PUT api/teams/change-password', () => {
  let team;

  beforeEach(async () => {
    // Create a team for testing*

    team = await Team.create({ name: 'Test Team', password: 'password' });
  });

  afterEach(async () => {
    // Delete the test team from the database*

    await Team.deleteOne({ _id: team._id });
  });

  it('should return 200 with a sucess message', async () => {
    const res = await request(app)
      .put(`/api/teams/change-password`)
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`)
      .send({ oldPassword: 'password', newPassword: 'newPassword' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Successfully updated' });
  });

  it('should return 404 error with an error message', async () => {
    const unknownId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .put(`/api/teams/change-password`)
      .set('Authorization', `Bearer ${generateAccessToken(unknownId)}`)
      .send({ oldPassword: 'password', newPassword: 'newPassword' });

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Team not found' });
  });

  it('should handle errors properly', async () => {
    const res = await request(app)
      .put(`/api/teams/change-password`)
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`)
      .send({ oldPassword: 'wrongPassword', newPassword: 'newPassword' });

    expect(res.status).toBe(500);
  });
});

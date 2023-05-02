const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../src/app');
const Team = require('../src/models/teamModel');
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

// describe('GET /api/teams', () => {
//   const testData = [
//     new Team({ name: 'Team1', password: 'password1' }),
//     new Team({ name: 'Team2', password: 'password2' }),
//     new Team({ name: 'Team3', password: 'password3' }),
//   ];

//   beforeAll(async () => {
//     // insert the test data into the database before running the tests
//     await Team.insertMany(testData);
//   });

//   afterAll(async () => {
//     // remove test data from the database after running the tests
//     testData.forEach(async (team) => {
//       await Team.deleteOne({ _id: team._id });
//     });
//   });

//   it('should return a 200 OK response with a list of teams excluding the password field', async () => {
//     const res = await request(app).get('/api/teams');

//     expect(res.status).toBe(200);
//     //expect(res.body.length).toBe(3);
//     res.body.forEach((team) => {
//       expect(team.password).toBeUndefined();
//     });
//   });

//   it('should handle errors properly', async () => {
//     // mock the team.find() method to throw an error
//     const error = new Error('Test error');
//     jest.spyOn(Team, 'find').mockImplementationOnce(() => {
//       throw error;
//     });

//     const res = await request(app).get('/api/teams');

//     expect(res.status).toBe(500);
//     expect(res.body).toEqual({ message: error.message });
//   });
// });

// describe('GET /api/teams/:teamId', () => {
//   let team;

//   beforeEach(async () => {
//     // Create a team for testing
//     team = await Team.create({ name: 'Test Team', password: 'password' });
//   });

//   afterEach(async () => {
//     // Delete the test team from the database
//     await Team.deleteOne({ _id: team._id });
//   });

//   it('should return a team object with password field excluded', async () => {
//     const res = await request(app).get(`/api/teams/${team._id}`);

//     const { password, ...teamWithoutPassword } = { ...team._doc, _id: team._doc._id.toString() };

//     expect(res.status).toBe(200);
//     expect(res.body).toEqual(teamWithoutPassword);
//   });

//   it('should return a 404 Not Found when the team is not found', async () => {
//     const invalidId = new mongoose.Types.ObjectId();
//     const res = await request(app).get(`/api/teams/${invalidId}`);

//     expect(res.status).toBe(404);
//     expect(res.body).toEqual({ message: 'Team not found' });
//   });

//   it('should return a 500 Internal Server Error response with an error message if an invalid team ID is provided', async () => {
//     const invalidId = 'invalidId';
//     const res = await request(app).get(`/api/teams/${invalidId}`);

//     expect(res.status).toBe(500);
//     expect(res.body).toEqual({ message: `Invalid ID: ${invalidId}` });
//   });

//   it('should handle errors properly', async () => {
//     // mock the team.findOne() method to throw an error
//     const error = new Error('Test error');
//     jest.spyOn(Team, 'findOne').mockImplementationOnce(() => {
//       throw error;
//     });

//     const res = await request(app).get(`/api/teams/${team._id}`);

//     expect(res.status).toBe(500);
//     expect(res.body).toEqual({ message: error.message });
//   });
// });

describe('PUT /api/teams', () => {
  let team;

  beforeEach(async () => {
    // Create a team for testing
    team = await Team.create({ name: 'Test Team', password: 'password' });
  });

  afterEach(async () => {
    // Delete the test team from the database
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

    // Check that the team was actually updated from the database
    const updatedTeam = await Team.findOne({ _id: team._id });
    expect(updatedTeam.description).toEqual(newValues.description);
  });

  it('should return a 404 Not Found response with an error message if the team does not exist', async () => {
    // Create a random invalid team ID
    const unknownId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .put(`/api/teams/update`)
      .set('Authorization', `Bearer ${generateAccessToken(unknownId)}`);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Team not found' });
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
    expect(res.body).toEqual({ message: error.message });
  });
});

describe('DELETE /api/teams/:teamId', () => {
  let team;

  beforeEach(async () => {
    // Create a team for testing
    team = await Team.create({ name: 'Test Team', password: 'password' });
  });

  afterEach(async () => {
    // Delete the test team from the database
    await Team.deleteOne({ _id: team._id });
  });

  it('should delete a team and return 200 OK reponse with a success message', async () => {
    const res = await request(app)
      .delete(`/api/teams/${team._id}`)
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Successfully deleted' });

    // Check that the team was actually deleted from the database
    const deletedTeam = await Team.findOne({ _id: team._id });
    expect(deletedTeam).toBeNull();
  });

  it('should return a 404 Not Found response with an error message if the team does not exist', async () => {
    const unknownId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .delete(`/api/teams/${unknownId}`)
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Team not found' });
  });

  it('should return a 500 Internal Server Error response with an error message if an invalid team ID is provided', async () => {
    const invalidId = 'invalid-id';
    const res = await request(app)
      .delete(`/api/teams/${invalidId}`)
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: `Invalid ID: ${invalidId}` });
  });

  it('should handle errors properly', async () => {
    const error = new Error('Test error');
    jest.spyOn(Team, 'deleteOne').mockImplementationOnce(() => {
      throw error;
    });

    const res = await request(app)
      .delete(`/api/teams/${team._id}`)
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: error.message });
  });
});

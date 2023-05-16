const request = require('supertest');

const mongoose = require('mongoose');

const app = require('../src/app');

const Team = require('../src/models/teamModel');

const Contribution = require('../src/models/contributionModel');

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

describe('GET /api/contributions', () => {
  let team;

  beforeEach(async () => {
    // Create a team for testing*
    team = await Team.create({ name: 'Test Team', password: 'password' });
  });

  afterEach(async () => {
    // Delete the test team from the database*
    await Team.deleteOne({ _id: team._id });
  });

  it('should return a 200 OK response with a list of the contributions', async () => {
    const res = await request(app)
      .get('/api/contributions')
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

    expect(res.status).toBe(200);
  });

  it('should return a 404 Not Found error if the team does not exist', async () => {
    const unknownId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .get('/api/contributions')
      .set('Authorization', `Bearer ${generateAccessToken(unknownId)}`);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Team not found' });
  });

  it('should handle errors properly', async () => {
    jest.spyOn(Contribution, 'find').mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    const res = await request(app)
      .get('/api/contributions')
      .set('Authorization', `Bearer ${generateAccessToken('123')}`);

    expect(res.status).toBe(500);
    expect(res.body.error).toBeDefined();
  });
});

// describe('GET /api/contributions/:contributionId', () => {
//   let team;
//   let contribution;

//   beforeEach(async () => {
//     contribution = await Contribution.create({
//       title: 'contributionTest',
//       startDate: '01/01/01',
//       relatedContribution: '',
//       abstract: 'abstractTest',
//       teamRole: 'leader',
//     });

//     team = await Team.create({
//       name: 'Test Team',
//       password: 'password',
//       contributions: [],
//     });

//     // Add the newly created contribution to the team's contributions array
//     team.contributions.push(contribution._id);
//     await team.save();
//   });

//   afterEach(async () => {
//     // Delete the test team from the database*
//     await Team.deleteOne({ _id: team._id });
//     await Contribution.deleteOne({ id: contribution._id });
//   });

//   it('should read a contribution', async () => {
//     const res = await request(app)
//       .get(`/api/contributions/${contribution._id}`)
//       .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);
//     expect(res.status).toBe(200);

//     expect(res.body).toBe('contributionTest');
//   });
// });

// describe('POST /api/contributions/new', () => {
//   let team;
//   let contribution;

//   beforeEach(async () => {
//     team = await Team.create({
//       name: 'Test Team',
//       password: 'password',
//       contributions: [],
//     });
//   });

//   afterEach(async () => {
//     // Delete the test team from the database*
//     await Team.deleteOne({ _id: team._id });
//   });

//   it('should return a 200 OK response and add the new contribution to the connected team', async () => {
//     const res = await request(app)
//       .post('/api/contributions/new')
//       .send({
//         title: 'contributionTest',
//         startDate: '01/01/01',
//         relatedContribution: '',
//         abstract: 'abstractTest',
//         teamRole: 'leader',
//       })
//       .send({
//         teamId: team._id,
//       })
//       .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);

//     expect(res.status).toBe(201);
//     expect(res.body).toEqual({ message: 'Successfully created' });
//     console.log(team)
//   });
// });

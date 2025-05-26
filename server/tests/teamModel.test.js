const Team = require('../src/models/teamModel');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

beforeAll(async () => {
  await mongoose.connect('mongodb://database:27017/paperlive_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('teamSchema pre hooks', () => {
  let team;

  afterEach(async () => {
    await team.deleteOne();
  });

  it('should set name to lowercase and hash password on save', async () => {
    team = await new Team({ name: 'TestTeam', password: 'password' }).save();

    expect(team.name).toEqual('testteam');
    expect(team.password).not.toEqual('password');
  });
});

describe('teamSchema comparePassword method', () => {
  let team;

  beforeEach(async () => {
    team = await Team.create({ name: 'TestTeam', password: 'password' });
  });

  afterEach(async () => {
    await team.deleteOne();
  });

  it('should return true when the password is correct', async () => {
    const isMatch = await team.comparePassword('password');
    expect(isMatch).toBe(true);
  });

  it('should return false when the password is incorrect', async () => {
    const isMatch = await team.comparePassword('wrongpassword');
    expect(isMatch).toBe(false);
  });
});

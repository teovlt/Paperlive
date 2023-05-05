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

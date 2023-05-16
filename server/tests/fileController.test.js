const request = require('supertest');
const app = require('../src/app');
const fs = require('fs');
const path = require('path');
const Team = require('../src/models/teamModel');
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect('mongodb://db:27017/paperlive_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('getProfile', () => {
  
});

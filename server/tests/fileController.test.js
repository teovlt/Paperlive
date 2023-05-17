const request = require('supertest');
const app = require('../src/app');
const fs = require('fs');
const path = require('path');
const Team = require('../src/models/teamModel');
const mongoose = require('mongoose');
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

describe('GET /api/files/:filename', () => {
  let team;

  beforeEach(async () => {
    // Create a team for testing*
    team = await Team.create({ name: 'Test Team', password: 'password' });
  });

  afterEach(async () => {
    // Delete the test team from the database*
    await Team.deleteOne({ _id: team._id });
  });

  it('should download a file when it exists', async () => {
    const filename = 'test-file.txt';
    const filePath = path.join(__dirname, '../uploads', filename);

    // Créez un fichier de test dans le répertoire de téléchargement
    fs.writeFileSync(filePath, 'Test file content');

    const res = await request(app)
      .get(`/api/files/${filename}`)
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);
    expect(res.status).toBe(200);
    expect(res.text).toEqual('Test file content');

    // Supprimez le fichier de test après le téléchargement
    fs.unlinkSync(filePath);
  });

  it('should return a 404 error when the file does not exist', async () => {
    const filename = 'nonexistent-file.txt';
    const res = await request(app)
      .get(`/api/files/${filename}`)
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`);
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'File not found' });
  });
});

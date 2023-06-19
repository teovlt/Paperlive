const request = require('supertest');
const app = require('../src/app');
const fs = require('fs');
const path = require('path');
const Team = require('../src/models/teamModel');
const mongoose = require('mongoose');
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

describe('POST /api/files/team/picture', () => {
  let team;
  let filePath;

  beforeEach(async () => {
    // Create a team for testing
    team = await Team.create({ name: 'Test Team', password: 'password' });
    filePath = path.join(__dirname, 'test-picture.jpg');
  });

  afterEach(async () => {
    // Delete the test team from the database
    await Team.deleteOne({ _id: team._id });

    // Delete the test picture file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });

  it('should upload a team picture file', async () => {
    const fileContent = 'Test file content';
    // Create a test picture file
    fs.writeFileSync(filePath, fileContent);

    const res = await request(app)
      .post('/api/files/team/picture')
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`)
      .attach('file', filePath);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'File uploaded successfully',
      filename: expect.any(String),
    });

    // Verify that the team picture is updated in the database
    const updatedTeam = await Team.findById(team._id);
    expect(updatedTeam.picture).toEqual(res.body.filename);
  });

  it('should return an error for other general upload error', async () => {
    // Simulating an error by passing an incorrect fieldname
    const file = {
      fieldname: 'invalidField',
      originalname: 'test-file.txt',
      mimetype: 'text/plain',
      buffer: Buffer.from('Test file content'),
    };

    const res = await request(app)
      .post('/api/files/team/picture')
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`)
      .attach(file.fieldname, file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: 'Error uploading file', error: expect.anything() });
  });
});

describe('POST /api/files/submission/zipfolder', () => {
  let team;
  let filePath;

  beforeEach(async () => {
    // Create a team for testing
    team = await Team.create({ name: 'Test Team', password: 'password' });
    filePath = path.join(__dirname, 'test-picture.jpg');
  });

  afterEach(async () => {
    // Delete the test team from the database
    await Team.deleteOne({ _id: team._id });

    // Delete the test picture file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });

  it('should upload a submission zipfolder', async () => {
    const fileContent = 'Test file content';
    // Create a test picture file
    fs.writeFileSync(filePath, fileContent);

    const res = await request(app)
      .post('/api/files/submission/zipfolder')
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`)
      .attach('file', filePath);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'File uploaded successfully',
    });
  });
  it('should return an error for other general upload error', async () => {
    // Simulating an error by passing an incorrect fieldname
    const file = {
      fieldname: 'invalidField',
      originalname: 'test-file.txt',
      mimetype: 'text/plain',
      buffer: Buffer.from('Test file content'),
    };

    const res = await request(app)
      .post('/api/files/submission/zipfolder')
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`)
      .attach(file.fieldname, file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: 'Error uploading file', error: expect.anything() });
  });
});

describe('POST /api/files/submission/compiledpdf', () => {
  let team;
  let filePath;

  beforeEach(async () => {
    // Create a team for testing
    team = await Team.create({ name: 'Test Team', password: 'password' });
    filePath = path.join(__dirname, 'test-picture.jpg');
  });

  afterEach(async () => {
    // Delete the test team from the database
    await Team.deleteOne({ _id: team._id });

    // Delete the test picture file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });

  it('should upload a submission compiledpdf', async () => {
    const fileContent = 'Test file content';
    // Create a test picture file
    fs.writeFileSync(filePath, fileContent);

    const res = await request(app)
      .post('/api/files/submission/compiledpdf')
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`)
      .attach('file', filePath);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'File uploaded successfully',
    });
  });

  it('should return an error for other general upload error', async () => {
    // Simulating an error by passing an incorrect fieldname
    const file = {
      fieldname: 'invalidField',
      originalname: 'test-file.txt',
      mimetype: 'text/plain',
      buffer: Buffer.from('Test file content'),
    };

    const res = await request(app)
      .post('/api/files/submission/compiledpdf')
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`)
      .attach(file.fieldname, file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: 'Error uploading file', error: expect.anything() });
  });
});

describe('POST /api/files/submission/diffpdf', () => {
  let team;
  let filePath;

  beforeEach(async () => {
    // Create a team for testing
    team = await Team.create({ name: 'Test Team', password: 'password' });
    filePath = path.join(__dirname, 'test-picture.jpg');
  });

  afterEach(async () => {
    // Delete the test team from the database
    await Team.deleteOne({ _id: team._id });

    // Delete the test picture file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });

  it('should upload a submission diffpdf', async () => {
    const fileContent = 'Test file content';
    // Create a test picture file
    fs.writeFileSync(filePath, fileContent);

    const res = await request(app)
      .post('/api/files/submission/diffpdf')
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`)
      .attach('file', filePath);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'File uploaded successfully',
    });
  });
  it('should return an error for other general upload error', async () => {
    // Simulating an error by passing an incorrect fieldname
    const file = {
      fieldname: 'invalidField',
      originalname: 'test-file.txt',
      mimetype: 'text/plain',
      buffer: Buffer.from('Test file content'),
    };

    const res = await request(app)
      .post('/api/files/submission/diffpdf')
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`)
      .attach(file.fieldname, file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: 'Error uploading file', error: expect.anything() });
  });
});

describe('POST /api/files/submission/commentpdf', () => {
  let team;
  let filePath;

  beforeEach(async () => {
    // Create a team for testing
    team = await Team.create({ name: 'Test Team', password: 'password' });
    filePath = path.join(__dirname, 'test-picture.jpg');
  });

  afterEach(async () => {
    // Delete the test team from the database
    await Team.deleteOne({ _id: team._id });

    // Delete the test picture file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });

  it('should upload a submission commentpdf', async () => {
    const fileContent = 'Test file content';
    // Create a test picture file
    fs.writeFileSync(filePath, fileContent);

    const res = await request(app)
      .post('/api/files/submission/commentpdf')
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`)
      .attach('file', filePath);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'File uploaded successfully',
    });
  });

  it('should return an error for other general upload error', async () => {
    // Simulating an error by passing an incorrect fieldname
    const file = {
      fieldname: 'invalidField',
      originalname: 'test-file.txt',
      mimetype: 'text/plain',
      buffer: Buffer.from('Test file content'),
    };

    const res = await request(app)
      .post('/api/files/submission/commentpdf')
      .set('Authorization', `Bearer ${generateAccessToken(team._id)}`)
      .attach(file.fieldname, file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: 'Error uploading file', error: expect.anything() });
  });
});

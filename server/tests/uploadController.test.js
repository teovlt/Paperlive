const request = require('supertest');
const app = require('../src/app');
const fs = require('fs');
const path = require('path');

describe('getProfile', () => {
  const filePath = 'test.gif';
  const existingFile = path.join(__dirname, '../uploads/profile/', filePath);

  it('should return a 404 error if the file does not exist', async () => {
    const res = await request(app).get('/api/upload/profile/non-existent-file.gif');

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: 'File not found' });
  });

  it('should return the file if it exists', async () => {
    const res = await request(app).get(`/api/upload/profile/${filePath}`);

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toBe('image/gif');
    expect(res.body.toString()).toBe(fs.readFileSync(existingFile).toString());
  });
});

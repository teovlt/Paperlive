const jwt = require('jsonwebtoken');
const request = require('supertest');

const app = require('../src/app');

describe('authenticateAccessToken middleware', () => {
  it('should return a 401 Unauthorized response if no token is provided', async () => {
    const res = await request(app).get(`/api/teams/me`);

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: 'Access token not found' });
  });

  it('should return a 401 Unauthorized response if an invalid token is provided', async () => {
    const token = jwt.sign({ id: '123' }, 'invalid-secret');
    const res = await request(app)
      .get(`/api/teams/me`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: 'Invalid access token' });
  });
});

describe('authenticateRefreshToken middleware', () => {
  it('should return a 401 Unauthorized response if no token is provided', async () => {
    const res = await request(app).get(`/api/auth/refresh-token`);

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: 'Refresh token not found' });
  });

  it('should return a 401 Unauthorized response if an invalid token is provided', async () => {
    const token = jwt.sign({ id: '123' }, 'invalid-secret');
    const res = await request(app)
      .get(`/api/auth/refresh-token`)
      .set('Cookie', `__refresh__token=${token}`);

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: 'Invalid refresh token' });
  });
});

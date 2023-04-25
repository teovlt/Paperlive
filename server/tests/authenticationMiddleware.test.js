const jwt = require('jsonwebtoken');
const request = require('supertest');

const app = require('../src/app');

describe('verifyToken middleware', () => {
  it('should return a 401 Unauthorized response if no token is provided', async () => {
    const res = await request(app).put(`/api/teams/team-id`);

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ message: 'Authentication required' });
  });

  it('should return a 401 Unauthorized response if an invalid token is provided', async () => {
    const token = jwt.sign({ id: '123' }, 'invalid-secret');
    const res = await request(app)
      .put(`/api/teams/team-id`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ message: 'Invalid token' });
  });
});

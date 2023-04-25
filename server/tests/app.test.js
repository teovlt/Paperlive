const request = require('supertest');

const app = require('../src/app');

describe('Preflight request handler', () => {
  it('should return a 200 OK response with allowed methods for any route', async () => {
    const res = await request(app).options('/example-route');

    expect(res.status).toBe(200);
    expect(res.headers['access-control-allow-methods']).toEqual('PUT, POST, PATCH, DELETE, GET');
    expect(res.body).toEqual({});
  });
});

describe('GET /api/ping', () => {
  it('should return a 200 OK response with a message indicating the server is running', async () => {
    const res = await request(app).get('/api/ping');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'The server is running!' });
  });
});

describe('Error handling middleware', () => {
  it('should return a 404 Not Found response for invalid routes', async () => {
    const url = '/invalid_route';
    const res = await request(app).get(url);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: `The requested route ${url} was not found` });
  });
});

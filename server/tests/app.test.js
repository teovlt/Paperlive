const request = require('supertest');
const app = require('../src/app');


// Mock the setInterval call in utils.js
jest.spyOn(global, 'setInterval').mockImplementation((callback) => {
  callback(); // Immediately invoke the callback
  return setInterval(callback, 1000); // Return a fake interval ID
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
    expect(res.body).toEqual({ error: `The requested route ${url} was not found` });
  });
});

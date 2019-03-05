const request = require('supertest');
const server = require('../index');

describe('basic route tests', () => {
  test('get root', async () => {
    const response = await request(server).get('/');
    expect(response.status).toEqual(200);
  });
});

describe('get films by id', () => {
  test('get one object', async () => {
    const response = await request(server).get('/films/22');
    expect(response.status).toEqual(200);
  });
});

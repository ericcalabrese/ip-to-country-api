const request = require('supertest');
const app = require('../src/index');
const vendorClients = require('../src/vendorClients/vendorClient');

describe('GET /ip-to-country', () => {
  // Store the server reference for cleanup
  let server;
  
  beforeAll(() => {
    // Start the server manually
    server = app.listen();
  });

  afterAll((done) => {
    // Close the server after all tests to prevent open handles
    server.close(done);
  });

  it('should return country for valid IP', async () => {
    const res = await request(app).get('/ip-to-country').query({ ip: '8.8.8.8' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('country');
  });

  it('should return 400 if IP is not provided', async () => {
    const res = await request(app).get('/ip-to-country');
    expect(res.statusCode).toEqual(400);
  });

  it('should handle error when ip is not in correct format', async () => {
    const res = await request(app).get('/ip-to-country').query({ ip: 'invalid-ip' });
    expect(res.statusCode).toEqual(400);
  });

  it('should return a country from the fallback vendor if the primary vendor fails', async () => {
    jest.spyOn(vendorClients, 'fetchCountry').mockImplementation(() => {
      throw new Error('Primary vendor failed');
    });
  
    const res = await request(app).get('/ip-to-country').query({ ip: '8.8.8.8' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('country');
  });  
});

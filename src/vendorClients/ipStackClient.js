const axios = require('axios');
const { IPSTACK_API_KEY } = require('../config');
const VendorBase = require('./vendorBase');
const { consumeRateLimit } = require('../rateLimiter');

class IpStackClient extends VendorBase {
  constructor() {
    super();
    this.name = 'ipstack';
    this.apiKey = IPSTACK_API_KEY;
    this.baseUrl = 'http://api.ipstack.com';
  }

  async fetchCountry(ip) {
    try {
      await consumeRateLimit(this.name);

      const url = `${this.baseUrl}/${ip}`;
      const params = { access_key: this.apiKey };
  
      const response = await axios.get(url, { params });
      return response.data.country_name;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = IpStackClient;

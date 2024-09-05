const axios = require('axios');
const { consumeRateLimit } = require('../rateLimiter');

async function fetchCountry(vendorName, url, params) {
  try {
    await consumeRateLimit(vendorName);

    const response = await axios.get(url, { params });
    return response.data.country_name || response.data.country;
  } catch (err) {
    throw err;
  }
}

module.exports = { fetchCountry };

const { fetchCountry } = require('./vendorClient');
const { IPSTACK_API_KEY } = require('../config');

async function getCountryFromIpStack(ip) {
  const url = `http://api.ipstack.com/${ip}`;
  const params = { access_key: IPSTACK_API_KEY };
  return fetchCountry('ipstack', url, params);
}

module.exports = { getCountryFromIpStack };
const { fetchCountry } = require('./vendorClient');
const { IPAPI_KEY } = require('../config');

async function getCountryFromIpapi(ip) {
  const url = `https://ipapi.co/${ip}/json/`;
  const params = { key: IPAPI_KEY };
  return fetchCountry('ipapi', url, params);
}

module.exports = { getCountryFromIpapi };

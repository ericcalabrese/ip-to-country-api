const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 3600 });

function getCachedCountry(ip) {
  return cache.get(ip);
}

function cacheCountry(ip, country) {
  cache.set(ip, country);
}

module.exports = {
  getCachedCountry,
  cacheCountry
};

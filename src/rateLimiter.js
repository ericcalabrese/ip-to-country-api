const { RateLimiterMemory } = require('rate-limiter-flexible');
const { RATE_LIMIT_MAX, RATE_LIMIT_DURATION } = require('./config');

const rateLimiter = new RateLimiterMemory({
  points: RATE_LIMIT_MAX,
  duration: RATE_LIMIT_DURATION
});

function consumeRateLimit(vendorName) {
  return rateLimiter.consume(vendorName);
}

module.exports = { consumeRateLimit };

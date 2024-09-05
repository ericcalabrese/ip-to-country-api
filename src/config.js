require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  IPSTACK_API_KEY: process.env.IPSTACK_API_KEY,
  IPAPI_KEY: process.env.IPAPI_KEY,
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX) || 1000,
  RATE_LIMIT_DURATION: parseInt(process.env.RATE_LIMIT_DURATION) || 3600
};

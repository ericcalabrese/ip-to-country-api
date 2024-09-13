const express = require('express');
const { getCachedCountry, cacheCountry } = require('./cache');
const VendorFactory = require('./vendorClients/vendorFactory');

const app = express();
const { PORT, vendors } = require('./config');

// Utility function for IP validation
function isValidIP(ip) {
  const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Pattern = /([a-f0-9:]+:+)+[a-f0-9]+/i;
  return ipv4Pattern.test(ip) || ipv6Pattern.test(ip);
}

async function getCountry(ip) {
  const cachedCountry = getCachedCountry(ip);
  if (cachedCountry) {
    return cachedCountry;
  }

  for (const vendor of vendors) {
    try {
      const factory = VendorFactory.getVendor(vendor.name);
      const country = await factory.fetchCountry(ip);
      if (country) {
        cacheCountry(ip, country);
        return country;
      }
    } catch(error) {
      console.error(`Failed to fetch country from ${vendor.name}: `, error.message);
    }
  }

  throw new Error('Failed to fetch country from all vendors.');
}

app.get('/ip-to-country', async (req, res) => {
  const { ip } = req.query;
  if (!ip) {
    // Return error if no IP is provided
    return res.status(400).json({ error: 'IP address is required' });
  }

  // Validate the IP address format
  if (!isValidIP(ip)) {
    return res.status(400).json({ error: 'Invalid IP address format' });
  }

  try {
    const country = await getCountry(ip);
    res.json({ country });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Only call app.listen() if the file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the app for testing
module.exports = app;

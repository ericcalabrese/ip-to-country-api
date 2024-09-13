const IpStackClient = require('./ipStackClient');
const IpapiClient = require('./ipapiClient');

class VendorFactory {
  static getVendor(name) {
    switch (name) {
      case 'ipstack':
        return new IpStackClient();
      case 'ipapi':
        return new IpapiClient();
      // Add more vendors as needed
      default:
        throw new Error(`Vendor ${name} not supported`);
    }
  }
}

module.exports = VendorFactory;
  
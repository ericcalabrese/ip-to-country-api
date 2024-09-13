class VendorBase {
  async fetchCountry(ip) {
    throw new Error('fetchCountry() must be implemented by subclasses');
  }
}

module.exports = VendorBase;

# IP to Country API

This server provides the country name associated with an IP address by querying multiple IP location services.

Key features include:
- **Multiple Vendor Support**: The system can switch between multiple geolocation services (currently using `ipstack` and `ipapi`) to provide redundancy and fallback options.
- **Rate Limiting**: Implemented per-vendor rate-limiting to prevent exceeding API request quotas.
- **Caching**: A naive cache implementation reduces unnecessary API calls and improves performance.
- **Error Handling**: Graceful error handling to ensure robust responses even when external services fail.
- **Scalable Design**: The design is modular, allowing new IP geolocation vendors to be added easily.

## Setup Instructions

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-repo/ip-to-country-api.git
    cd ip-to-country-api
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:

   Copy `.env.example` to `.env` and update the values accordingly:

    ```bash
    cp .env.example .env
    ```

4. **Start the application**:

    ```bash
    npm start
    ```

# API Endpoints

GET /ip-to-country?ip=<IP_ADDRESS>

Description: Returns the country associated with the given IP address.

Parameters:
- ip: The IP address to look up. Must be a valid IPv4 or IPv6 address.

Responses:
- 200 OK: The country information is successfully retrieved.
- 400 Bad Request: The IP is missing or invalid.
- 500 Internal Server Error: All vendors failed to provide a response, or another internal error occurred.

# Testing
This project uses Jest for unit and integration testing, along with Supertest to test the API endpoints.

Running Tests
- To run the full test suite: npm test
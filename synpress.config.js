// synpress.config.js
const { defineConfig } = require('cypress');
// import synpress node events
const setupNodeEvents = require('@synthetixio/synpress/plugins/index');
// Set timeout (in milliseconds) for Cypress & Synpress to wait before failing.
// Note: big timeout can slow the tests down. Slow timeouts can cause the test to fail.
// Read more about timeouts: https://docs.cypress.io/guides/references/configuration#Timeouts
const timeout = process.env.SYNDEBUG ? 9999999 : 30000;

module.exports = defineConfig({
  userAgent: 'synpress',
  retries: {
    runMode: process.env.CI ? 1 : 0,
    openMode: 0
  },
  fixturesFolder: '@synthetixio/synpress/fixtures',
  chromeWebSecurity: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
  video: false,
  env: {
    coverage: false
  },
  defaultCommandTimeout: timeout,
  pageLoadTimeout: timeout,
  requestTimeout: timeout,
  e2e: {
    testIsolation: false,
    setupNodeEvents,
    // Url for the test dApp
    baseUrl: 'http://127.0.0.1:8080/',
    // Where all tests can be found.
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    // Path for your support file your setup early
    supportFile: 'cypress/support/e2e.ts'
  }
});

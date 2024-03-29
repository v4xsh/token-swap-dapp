const { defineConfig } = require('cypress');
const setupNodeEvents = require('@synthetixio/synpress/plugins/index');
const supportFile = 'cypress/support/e2e.ts';
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
  screenshots: false,
  screenshotOnRunFailure: false,
  env: {
    coverage: false
  },
  defaultCommandTimeout: timeout,
  pageLoadTimeout: timeout,
  requestTimeout: timeout,
  e2e: {
    testIsolation: false,
    setupNodeEvents,
    baseUrl: 'http://127.0.0.1:3000/',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    supportFile
  }
});

import { defineConfig } from 'cypress';
const setupNodeEvents = require('@synthetixio/synpress/plugins/index');

export default defineConfig({
  userAgent: 'synpress',
  e2e: {
    setupNodeEvents
    // setupNodeEvents (on, config) {
    //   // implement node event listeners here
    // }
  }
});

const setupNodeEvents = require('@synthetixio/synpress/plugins/index');
module.exports = defineConfig({
  userAgent: 'synpress',
  e2e: {
    setupNodeEvents
  }
});

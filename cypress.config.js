const {defineConfig} = require('cypress');

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:4173',
        specPattern: 'cypress/e2e/**/*.cy.js',
        supportFile: false,
    },
    env: {
        search_delay: 300,
    },
});
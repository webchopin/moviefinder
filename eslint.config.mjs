import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';

export default defineConfig([
    globalIgnores(['dist/']),
    {
        files: ['**/*.js'],
        extends: [js.configs.recommended],
    },
    {
        files: ['src/**/*.js'],
        languageOptions: {
            globals: globals.browser,
        },
    },
    {
        files: ['cypress/**/*.js'],
        languageOptions: {
            globals: { ...globals.mocha, cy: 'readonly', Cypress: 'readonly' },
        },
    },
    {
        files: ['cypress.config.js'],
        languageOptions: {
            sourceType: 'commonjs',
            globals: globals.node,
        },
    },
]);

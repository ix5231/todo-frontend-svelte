/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  verbose: true,
  preset: 'ts-jest/presets/js-with-babel',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "<rootDir>/src/testHelpers/setup/mockServer.ts"
  ],
  transformIgnorePatterns: [
    "/node_modules/((?!svelte-spa-router)/)"
  ],
  transform: {
    "^.+\\.svelte$": [
      "svelte-jester",
      {
        "preprocess": "./svelte.config.js"
      }
    ],
    "^.+\\.ts$": "ts-jest",
    "^.+\\.js$": "babel-jest"
  },
  moduleFileExtensions: [
    "js",
    "ts",
    "svelte"
  ],
  moduleNameMapper: {
    "#root/(.*)$": "<rootDir>/$1",
    "#src/(.*)$": "<rootDir>/src/$1",
    "#api": "<rootDir>/src/api",
    "#components/(.*)$": "<rootDir>/src/components/$1",
    "#utils": "<rootDir>/src/utils",
    "#test-helpers": "<rootDir>/src/testHelpers"
  }
};
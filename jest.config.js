export default {
  testEnvironment: "node",

  // extensionsToTreatAsEsm: [".js"],

  transform: {},

  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

  testMatch: ["**/test/**/*.test.js"],

  collectCoverageFrom: ["src/**/*.js", "!src/index.js", "!src/scripts/**"],

  coverageDirectory: "coverage",
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};

const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  testEnvironment: "jsdom",
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
};

module.exports = config;

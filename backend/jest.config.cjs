/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  setupFiles: ["<rootDir>/tests/setup-env.ts"],
  collectCoverageFrom: ["src/**/*.ts", "!src/server.ts", "!src/types/**/*.d.ts"],
  testMatch: ["**/*.spec.ts"],
  clearMocks: true,
  transform: {
    "^.+\\.(t|j)sx?$": ["ts-jest", { diagnostics: false }],
  },
};

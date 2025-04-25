module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', 
    '^.+\\.(ts|tsx)$': 'ts-jest', 
  },
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy', // Mock .css imports
    '\\.(png|jpg|jpeg|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock image imports
  },
  setupFiles: ['<rootDir>/jest.setup.js'], 
  testEnvironment: 'jest-environment-jsdom',  // Test environment
  setupFilesAfterEnv: ['@testing-library/jest-dom'],  // For jest-dom matchers
  collectCoverage: true,  // Enable code coverage
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',  // Collect from all TypeScript files
    '!src/**/*.d.ts',  // Exclude declaration files
    '!src/**/*.{test,spec}.ts',  // Exclude test files from coverage
  ],
  coverageReporters: ['text', 'lcov'],  // Coverage reporters
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',  // Point to the main tsconfig.json
    },
  },
};

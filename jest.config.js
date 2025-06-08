// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle module aliases (as configured in tsconfig.json)
    '^@/(.*)$': '<rootDir>/src/$1', // <--- ADD OR MODIFY THIS LINE
    // You can remove or keep the more specific ones if you want,
    // but '^@/(.*)$': '<rootDir>/src/$1' usually covers everything.
     //'^@/components/(.*)$': '<rootDir>/src/components/$1', // Example of specific mapping if needed
     //'^@/pages/(.*)$': '<rootDir>/src/pages/$1', // Example of specific mapping if needed
    },
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};

module.exports = createJestConfig(customJestConfig);
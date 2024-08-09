module.exports = {
  preset: "jest-preset-angular",
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  setupFilesAfterEnv: [
    '<rootDir>/src/setup.jest.ts'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/'
  ],
  globals: {
    tsConfig: '<rootDir>/tsconfig.spec.json',
  },
  transform: {
     '^.+\\.(ts|js|html)$': 'jest-preset-angular'
  }
}
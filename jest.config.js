module.exports = {
  preset: "jest-preset-angular",
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
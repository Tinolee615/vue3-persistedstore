module.exports = {
  collectCoverage: true,
  verbose: true,
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  testMatch: ['**/__test__/**/*.spec.[jt]s?(x)'],
  setupFilesAfterEnv: [
    // require.resolve('jest-dom/extend-expect'),
    // path.resolve(__dirname, './global.ts'),
  ],
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsconfig: 'tsconfig.json',
      diagnostics: false,
    },
  },
  coveragePathIgnorePatterns: [
    // '/node_modules/',
    '/__tests__/',
    'package-lock.json',
  ],
}

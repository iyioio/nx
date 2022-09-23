/* eslint-disable */
export default {
  displayName: 'cdk',
  preset: '<%- toRoot %>/jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '<%- toRoot %>/coverage/packages/cdk',
};

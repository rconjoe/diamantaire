/* eslint-disable */
export default {
  displayName: 'darkside-core',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['@swc/jest', { jsc: { transform: { react: { runtime: 'automatic' } } } }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/darkside/core',
};

/* eslint-disable */
export default {
  displayName: 'darkside-page-pdp',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['@swc/jest', { jsc: { transform: { react: { runtime: 'automatic' } } } }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/darkside/page/pdp',
};

/* eslint-disable */
export default {
  displayName: 'darkside-components-products-pdp',
  preset: '../../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['@swc/jest', { jsc: { transform: { react: { runtime: 'automatic' } } } }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../../coverage/libs/darkside/components/products/pdp',
};

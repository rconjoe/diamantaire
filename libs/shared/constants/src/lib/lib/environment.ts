export const environment = process.env['NODE_ENV'];
export const isDevEnv = Object.is(environment, 'development');
export const isStagingEnv = Object.is(environment, 'staging');
export const isProdEnv = Object.is(environment, 'production');
export const isTestEnv = Object.is(environment, 'test');

export default {
  isDevEnv,
  isProdEnv,
  isStagingEnv,
  isTestEnv,
  environment,
};

function getEnvConfig() {
  switch (process.env.DEPLOYMENT_ENV) {
    case 'production':
      return require('./env.config.production');
    case 'staging':
      return require('./env.config.staging');
    case 'features':
      return require('./env.config.features');
    case 'showcase':
      return require('./env.config.showcase');
    case 'test':
      return require('./env.config.testing');
    default:
      return require('./env.config.development');
  }
}

export { getEnvConfig };

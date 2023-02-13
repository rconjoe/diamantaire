function getRootURL(env, country, protocol = 'https') {
  let primarySubdomain = country ? country : '';
  const secondarySubdomain = env ? env : '';

  if (!country && !env) {
    primarySubdomain = 'www';
  }

  return `${protocol}://${primarySubdomain}${
    primarySubdomain && secondarySubdomain ? '.' : ''
  }${secondarySubdomain}.vrai.com`;
}

export default getRootURL;

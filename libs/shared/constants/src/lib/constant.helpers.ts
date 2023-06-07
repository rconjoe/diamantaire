export const createDisplayOrderFromOptionNames = (namesInOrder, humanNames) => {
  return namesInOrder.map((name) => {
    const label = humanNames[name];

    return {
      name,
      label,
    };
  });
};

export const getOptionValues = (obj) => {
  return Object.values(obj)
    .flat()
    .map((v) => typeof v === 'string' && v.toLowerCase());
};

export const getRootURL = (env: string, country?: string, protocol = 'https') => {
  let primarySubdomain = country ? country : '';
  const secondarySubdomain = env ? env : '';

  if (!country && !env) {
    primarySubdomain = 'www';
  }

  return `${protocol}://${primarySubdomain}${
    primarySubdomain && secondarySubdomain ? '.' : ''
  }${secondarySubdomain}.vrai.com`;
};

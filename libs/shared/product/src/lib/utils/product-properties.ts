import { VraiProduct } from '../types';

export function getConfigMatrix(collection: VraiProduct[], targetConfiguration: Record<string, string>) {
  const configMatrix = {};

  for (const configKey in targetConfiguration) {
    if (configKey === 'goldPurity') {
      continue;
    }
    const configValue = targetConfiguration[configKey];
    const configurationToMatch = { ...targetConfiguration };

    delete configurationToMatch[configKey];

    const configMatches = collection.filter((product) =>
      Object.keys(configurationToMatch).every((key) => product.configuration[key] === configurationToMatch[key]),
    );

    if (configMatches) {
      const configsByValue = configMatches.reduce((prevConfigs, config) => {
        prevConfigs[config.configuration[configKey]] = config.contentId;

        return prevConfigs;
      }, {});

      if (!configMatrix[configKey]) {
        configMatrix[configKey] = configsByValue;
      } else {
        configMatrix[configKey][configValue] = configsByValue;
      }
    }
  }

  return configMatrix;
}

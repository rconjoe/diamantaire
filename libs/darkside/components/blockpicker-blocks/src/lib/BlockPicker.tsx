import { MODULAR_RANDOM_BANNER_BLOCK } from '@diamantaire/shared/constants';
import React from 'react';

import ModularBannerBlock from './blocks/ModularBannerBlock';

const Dynamic = () => {
  return <p>dynamic</p>;
};

type configProps = {
  [key: string]: any;
};

const config: configProps = {
  [MODULAR_RANDOM_BANNER_BLOCK]: {
    standard: ModularBannerBlock,
    dynamic: Dynamic,
  },
};

const BlockPicker = ({ _modelApiKey, modularBlockData, isMobile, countryCode, currencyCode }) => {
  const BlockComponent = config?.[_modelApiKey]?.standard;

  console.log('modularBlockData', modularBlockData);

  return (
    <>
      {!BlockComponent && <p>No block found for: {_modelApiKey}</p>}
      {BlockComponent && (
        <BlockComponent
          isMobile={isMobile}
          countryCode={countryCode}
          currencyCode={currencyCode}
          {...modularBlockData.blocks[0]}
        />
      )}
    </>
  );
};

export { BlockPicker };

/*
  This component implements the BlockPicker loop for the Home Page, and Standard Pages
* */

import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import React from 'react';

const StandardPageEntry = ({ page, isMobile, countryCode, currencyCode }) => {
  const { content1 } = page || [];

  return (
    <div className="content-one-container">
      {content1?.slice(0, 3).map((contentBlockData, idx) => {
        const { id, _modelApiKey } = contentBlockData;

        // Desktop + Mobile, anything after the first two blocks should be lazy loaded
        const contentIsAboveFold = idx < 1;
        const shouldLazyLoad = contentIsAboveFold ? false : true;

        return (
          <React.Fragment key={id}>
            <BlockPicker
              key={id}
              _modelApiKey={_modelApiKey}
              modularBlockData={{ ...contentBlockData }}
              isMobile={isMobile}
              countryCode={countryCode}
              currencyCode={currencyCode}
              shouldLazyLoad={shouldLazyLoad}
            />
            <p>{_modelApiKey}</p>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export { StandardPageEntry };

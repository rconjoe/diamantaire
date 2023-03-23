/*
  This component implements the BlockPicker loop for the Home Page, and Standard Pages
* */

import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import { Suspense } from 'react';

const StandardPageEntry = ({ page, isMobile, countryCode, currencyCode }) => {
  const { content1 } = page || [];

  return (
    <div className="content-one-container">
      <Suspense fallback={`Loading...`}>
        {content1?.slice(0, 2).map((contentBlockData, idx) => {
          const { id, _modelApiKey } = contentBlockData;

          // Desktop + Mobile, anything after the first two blocks should be lazy loaded
          const isBelowTheFold = idx > 1;
          const shouldLazyLoad = isBelowTheFold ? true : false;

          return (
            <BlockPicker
              key={id}
              _modelApiKey={_modelApiKey}
              modularBlockData={{ ...contentBlockData, shouldLazyLoad }}
              isMobile={isMobile}
              countryCode={countryCode}
              currencyCode={currencyCode}
            />
          );
        })}
      </Suspense>
    </div>
  );
};

export { StandardPageEntry };

import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import React, { Suspense } from 'react';

const StandardPageEntry = ({ page, isMobile, countryCode, currencyCode }) => {
  console.log('page', page);

  const { content1 } = page || [];

  return (
    <div className="content-one-container">
      <Suspense fallback={`Loading...`}>
        {content1?.slice(10, 11).map((contentBlockData, idx) => {
          const { id, _modelApiKey } = contentBlockData;

          // Desktop + Mobile, anything after the first two blocks should be lazy loaded
          const isBelowTheFold = idx > 1;
          const shouldLazyLoad = isBelowTheFold ? true : false;

          return (
            <>
              <p>{_modelApiKey}</p>
              <BlockPicker
                key={id}
                _modelApiKey={_modelApiKey}
                modularBlockData={{ ...contentBlockData, shouldLazyLoad }}
                isMobile={isMobile}
                countryCode={countryCode}
                currencyCode={currencyCode}
              />
            </>
          );
        })}
      </Suspense>
    </div>
  );
};

export { StandardPageEntry };

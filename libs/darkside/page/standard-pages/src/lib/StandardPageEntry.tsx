/*
  This component implements the BlockPicker loop for the Home Page, and Standard Pages
* */

import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import React, { Suspense } from 'react';

type StandardPageEntryProps = {
  page?: {
    content1?: Array<any>;
  };
  isMobile?: boolean;
  countryCode?: string;
  currencyCode?: string;
};

const StandardPageEntry = ({ page, isMobile, countryCode, currencyCode }: StandardPageEntryProps) => {
  // const { content1 } = page || [];
  // console.log(page, isMobile, countryCode, currencyCode);

  // console.log('page?.content1', page?.content1.length);

  return (
    <div className="content-one-container">
      <Suspense fallback={'Loading'}>
        {page?.content1?.slice(0, 9).map((contentBlockData, idx) => {
          const { id, _modelApiKey } = contentBlockData;

          // Desktop + Mobile, anything after the first two blocks should be lazy loaded
          const contentIsAboveFold = idx < 1;
          const shouldLazyLoad = contentIsAboveFold ? false : true;

          return (
            <React.Fragment key={id}>
              <BlockPicker
                _modelApiKey={_modelApiKey}
                modularBlockData={{ ...contentBlockData }}
                isMobile={isMobile}
                countryCode={countryCode}
                currencyCode={currencyCode}
                shouldLazyLoad={shouldLazyLoad}
              />
            </React.Fragment>
          );
        })}
      </Suspense>
    </div>
  );
};

export { StandardPageEntry };

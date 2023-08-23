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

const StandardPageEntry = ({ page, countryCode, currencyCode }: StandardPageEntryProps) => {
  // const { content1 } = page || [];
  // console.log(page);

  return (
    <div className="content-one-container">
      <Suspense fallback={'Loading'}>
        {page?.content1?.slice(0, page.content1.length).map((contentBlockData, idx) => {
          const { _modelApiKey } = contentBlockData;

          // Desktop + Mobile, anything after the first two blocks should be lazy loaded
          const contentIsAboveFold = idx < 2;
          const shouldLazyLoad = contentIsAboveFold ? false : true;

          return (
            <React.Fragment key={`${_modelApiKey}_${idx}`}>
              <BlockPicker
                _modelApiKey={_modelApiKey}
                modularBlockData={{ ...contentBlockData }}
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

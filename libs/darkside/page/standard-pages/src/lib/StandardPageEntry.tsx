/*
  This component implements the BlockPicker loop for the Home Page, and Standard Pages
* */

import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import clsx from 'clsx';
import React, { Suspense } from 'react';

type StandardPageEntryProps = {
  page?: {
    content1?: Array<any>;
  };
  isMobile?: boolean;
  countryCode?: string;
  currencyCode?: string;
  gtmClass?: string;
};

const StandardPageEntry = ({ page, countryCode, currencyCode, gtmClass }: StandardPageEntryProps) => {
  // const { content1 } = page || [];
  // console.log(page);

  return (
    <div className={clsx('content-one-container', gtmClass)}>
      {page?.content1?.map((contentBlockData, idx) => {
        const { _modelApiKey } = contentBlockData;

        // Desktop + Mobile, anything after the first two blocks should be lazy loaded
        const contentIsAboveFold = idx < 2;
        const shouldLazyLoad = contentIsAboveFold ? false : true;

        if (shouldLazyLoad) {
          return (
            <Suspense fallback={'Loading'} key={`${_modelApiKey}_${idx}`}>
              <BlockPicker
                _modelApiKey={_modelApiKey}
                modularBlockData={contentBlockData}
                countryCode={countryCode}
                currencyCode={currencyCode}
                shouldLazyLoad={shouldLazyLoad}
              />
            </Suspense>
          );
        } else {
          return (
            <BlockPicker
              _modelApiKey={_modelApiKey}
              modularBlockData={contentBlockData}
              countryCode={countryCode}
              currencyCode={currencyCode}
              shouldLazyLoad={shouldLazyLoad}
              key={`${_modelApiKey}_${idx}`}
            />
          );
        }
      })}
    </div>
  );
};

export { StandardPageEntry };

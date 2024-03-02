/*
  This component implements the BlockPicker loop for the Home Page, and Standard Pages
* */

import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import { Breadcrumb } from '@diamantaire/darkside/components/common-ui';
import clsx from 'clsx';

type StandardPageEntryProps = {
  page?: {
    content1?: Array<any>;
    breadcrumb: {
      title?: string;
      name?: string;
      path: string;
      link?: {
        slug: string;
        category: string;
        slugNew: string;
      };
    }[];
  };
  isMobile?: boolean;
  countryCode?: string;
  currencyCode?: string;
  gtmClass?: string;
};

const StandardPageEntry = ({ page, countryCode, currencyCode, gtmClass }: StandardPageEntryProps) => {
  return (
    <div className={clsx('content-one-container', gtmClass)}>
      {page?.breadcrumb.length > 0 && <Breadcrumb breadcrumb={page?.breadcrumb} spacingType="containedWidth" />}

      {page?.content1?.map((contentBlockData, idx) => {
        const { _modelApiKey } = contentBlockData;

        const contentIsAboveFold = idx < 2;

        const shouldLazyLoad = contentIsAboveFold ? false : true;

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
      })}
    </div>
  );
};

export { StandardPageEntry };

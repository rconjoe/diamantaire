// This is just how we can use the blockpicker in the plp, it is not a replacement - Davidoff

import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import { usePlpBlockPickerBlocks } from '@diamantaire/darkside/data/hooks';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

const PlpBlockPicker = ({ plpSlug }) => {
  const { locale } = useRouter();
  const { data: { listPage } = {} } = usePlpBlockPickerBlocks(locale, plpSlug);

  return listPage?.belowBannerBlocks?.map((contentBlockData, idx) => {
    const { _modelApiKey } = contentBlockData;

    return (
      <Fragment key={`${_modelApiKey}_${idx}`}>
        <BlockPicker
          _modelApiKey={_modelApiKey}
          modularBlockData={{ ...contentBlockData }}
          countryCode={'US'}
          currencyCode={'USD'}
          shouldLazyLoad={true}
        />
      </Fragment>
    );
  });
};

export { PlpBlockPicker };

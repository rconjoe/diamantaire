import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import { useProductBelowBannerBlocks } from '@diamantaire/darkside/data/hooks';
import { PdpTypePlural } from '@diamantaire/shared/constants';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

type ProductBlockPickerProps = {
  slug: string;
  pdpType: PdpTypePlural;
};

const ProductBlockPicker = ({ slug, pdpType }: ProductBlockPickerProps) => {
  const { locale } = useRouter();
  const { data } = useProductBelowBannerBlocks(slug, locale, pdpType);

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return data?.map((contentBlockData, idx) => {
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

export { ProductBlockPicker };

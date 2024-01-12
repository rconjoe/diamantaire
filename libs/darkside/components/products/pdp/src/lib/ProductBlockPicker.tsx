import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import { useProductBelowBannerBlocks } from '@diamantaire/darkside/data/hooks';
import { PdpTypePlural, getCurrency } from '@diamantaire/shared/constants';
import { getCountry } from '@diamantaire/shared/helpers';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

type ProductBlockPickerProps = {
  slug: string;
  pdpType: PdpTypePlural;
};

const ProductBlockPicker = ({ slug, pdpType }: ProductBlockPickerProps) => {
  const { locale } = useRouter();
  const countryCode = getCountry(locale);
  const currencyCode = getCurrency(countryCode);
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
          countryCode={countryCode}
          currencyCode={currencyCode}
          shouldLazyLoad={true}
        />
      </Fragment>
    );
  });
};

export { ProductBlockPicker };

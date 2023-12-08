import { MobileDesktopImage, UniLink } from '@diamantaire/darkside/components/common-ui';
import { useCartData, usePlpGWP } from '@diamantaire/darkside/data/hooks';
import { getCurrency, getFormattedPrice } from '@diamantaire/shared/constants';
import { getBlockPictureAlt, getCountry, replacePlaceholders } from '@diamantaire/shared/helpers';
import { DatoImageType } from '@diamantaire/shared/types';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import { ModularSkinnyBannerBlockContainer } from './ModularSkinnyBannerBlock.style';

type ModularSkinnyBannerBlockProps = {
  title?: string;
  copy?: string;
  desktopImage: DatoImageType;
  mobileImage: DatoImageType;
  textColor?: {
    hex: string;
  };
  ctaCopy?: string;
  ctaRoute?: string;
  additionalClass?: string;
};

const ModularSkinnyBannerBlock = (props: ModularSkinnyBannerBlockProps) => {
  const { title, copy, mobileImage, desktopImage, textColor, ctaCopy, ctaRoute, additionalClass } = props || {};

  const alt = getBlockPictureAlt({
    desktopImage,
    mobileImage,
    title,
  });

  const { locale } = useRouter();

  const { data } = usePlpGWP(locale);
  const { data: checkout } = useCartData(locale);

  const gwpData = data?.allGwpDarksides?.[0]?.tiers?.[0];

  const { minSpendByCurrencyCode } = gwpData || {};

  const countryCode = getCountry(locale);
  const currencyCode = getCurrency(countryCode);

  const minSpendValue = getFormattedPrice(minSpendByCurrencyCode?.[currencyCode], locale);

  let refinedCopy = replacePlaceholders(
    copy,
    ['%%GWP_minimum_spend%%'],
    [getFormattedPrice(parseFloat(minSpendValue), locale)],
  ).toString();

  refinedCopy = replacePlaceholders(
    refinedCopy,
    ['%%GWP_remaining_spend%%'],
    [getFormattedPrice(parseFloat(minSpendValue) - parseFloat(checkout?.cost?.subtotalAmount?.amount) * 100, locale)],
  ).toString();

  return (
    <ModularSkinnyBannerBlockContainer $textColor={textColor?.hex || '#000000'}>
      <MobileDesktopImage
        className="skinny-banner__image-container"
        desktopImage={desktopImage}
        mobileImage={mobileImage}
        alt={alt}
      />

      {(title || (ctaRoute && ctaCopy)) && (
        <div className={clsx('skinny-banner__title-copy-wrapper -center-copy', additionalClass)}>
          {title && <h1 className={clsx('skinny-banner__title primary', additionalClass)}>{title}</h1>}
          {refinedCopy && <p className="skinny-banner__subtitle">{refinedCopy}</p>}
          {ctaCopy && ctaRoute && (
            <UniLink route={ctaRoute} className="skinny-banner__cta">
              {ctaCopy}
            </UniLink>
          )}
        </div>
      )}
    </ModularSkinnyBannerBlockContainer>
  );
};

export default ModularSkinnyBannerBlock;

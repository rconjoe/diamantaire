import { Markdown, Heading, DatoImage, UniLink, DarksideButton } from '@diamantaire/darkside/components/common-ui';
import { getBlockPictureAlt } from '@diamantaire/shared/helpers';
import { DatoImageType, DatoDarksideButtonProps } from '@diamantaire/shared/types';
import clsx from 'clsx';

import { ModularSideBySideBlockStyles } from './ModularSideBySideBlock.style';

type ModularSideBySideBlockProps = {
  title?: string;
  copy?: string;
  ctaCopy?: string;
  ctaRoute?: string;
  darksideButtons: DatoDarksideButtonProps[];
  additionalClass?: string;
  textBlockAlignment: string;
  ctaCopy2?: string;
  ctaRoute2?: string;
  darksideButtons2?: DatoDarksideButtonProps[];
  headingType?: string;
  headingAdditionalClass?: string;
  supportedCountries?: Array<string>;
  countryCode: string;
  image: DatoImageType;
  imageInline: DatoImageType;
  imageMobile: DatoImageType;
  shouldHeadingBeAboveImageOnMobile: boolean;
};

const ModularSideBySideBlock = ({
  image,
  title,
  copy,
  ctaCopy,
  ctaRoute,
  additionalClass,
  textBlockAlignment,
  ctaCopy2,
  ctaRoute2,
  headingType,
  headingAdditionalClass,
  supportedCountries,
  countryCode,
  imageInline,
  imageMobile,
  darksideButtons,
  shouldHeadingBeAboveImageOnMobile,
}: ModularSideBySideBlockProps) => {
  // If there are supported countries listed, check to see if its supported.
  if (supportedCountries?.length && !supportedCountries.includes(countryCode)) {
    return null;
  }

  const alt = getBlockPictureAlt({
    image,
    title,
  });

  return (
    <ModularSideBySideBlockStyles
      className={clsx('container-wrapper', additionalClass)}
      $textBlockAlignment={textBlockAlignment}
    >
      {title && shouldHeadingBeAboveImageOnMobile && (
        <Heading
          type={headingType ? headingType : 'h2'}
          className={clsx(
            'side-by-side__title h1 primary show-on-mobile mobile-only-heading',
            headingAdditionalClass ? headingAdditionalClass : 'h1',
            additionalClass,
          )}
        >
          {title}
        </Heading>
      )}
      <div className={clsx('side-by-side__image-container', additionalClass)}>
        <div className="desktop">
          <DatoImage image={image} overrideAlt={alt} />
        </div>
        <div className="mobile">
          <DatoImage image={imageMobile} overrideAlt={alt} />
        </div>
      </div>

      <div className={clsx('side-by-side__text-container', additionalClass)}>
        <div className={clsx('side-by-side__inner-text-container', additionalClass)}>
          {title && (
            <Heading
              type={headingType ? headingType : 'h2'}
              className={clsx(
                'side-by-side__title h1 primary',
                headingAdditionalClass ? headingAdditionalClass : 'h1',
                additionalClass,
                {
                  'hide-on-mobile': shouldHeadingBeAboveImageOnMobile,
                },
              )}
            >
              {title}
            </Heading>
          )}

          {imageInline && (
            <div className="side-by-side-inline-image">
              <DatoImage image={imageInline}></DatoImage>
            </div>
          )}

          {copy && (
            <Markdown withStyles={false} extraClass="-modularSideBySideBlock side-by-side__copy">
              {copy}
            </Markdown>
          )}
          {ctaRoute && ctaCopy && (
            <UniLink route={ctaRoute} className="side-by-side__cta">
              {ctaCopy}
            </UniLink>
          )}
          {ctaRoute2 && ctaCopy2 && (
            <UniLink route={ctaRoute2} className="side-by-side__cta">
              {ctaCopy2}
            </UniLink>
          )}
          {darksideButtons?.map((button) => {
            return (
              <DarksideButton
                className="side-by-side__cta"
                colorTheme={button.ctaButtonColorTheme}
                mobileColorTheme={button.ctaButtonMobileColorTheme}
                href={button.ctaLinkUrl}
                key={button.id}
                type={button.ctaButtonType}
              >
                {button.ctaCopy}
              </DarksideButton>
            );
          })}
        </div>
      </div>
    </ModularSideBySideBlockStyles>
  );
};

export default ModularSideBySideBlock;

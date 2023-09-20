import { Markdown, Heading, DatoImage } from '@diamantaire/darkside/components/common-ui';
import { UniLink } from '@diamantaire/darkside/core';
import { getBlockPictureAlt } from '@diamantaire/shared/helpers';
import { DatoImageType } from '@diamantaire/shared/types';
import clsx from 'clsx';

import { ModularSideBySideBlockStyles } from './ModularSideBySideBlock.style';

type ModularSideBySideBlockProps = {
  title?: string;
  copy?: string;
  ctaCopy?: string;
  ctaRoute?: string;
  additionalClass?: string;
  textBlockAlignment: string;
  ctaCopy2?: string;
  ctaRoute2?: string;
  headingType?: string;
  headingAdditionalClass?: string;
  supportedCountries?: Array<string>;
  countryCode: string;
  image: DatoImageType;
  imageInline: DatoImageType;
  imageMobile: DatoImageType;
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
}: ModularSideBySideBlockProps) => {
  // If there are supported countries listed, check to see if its supported.
  if (supportedCountries?.length && !supportedCountries.includes(countryCode)) {
    return null;
  }

  const alt = getBlockPictureAlt({
    image,
    title,
  });

  console.log('imageMobile', imageMobile);

  return (
    <ModularSideBySideBlockStyles
      className={clsx('container-wrapper', additionalClass)}
      $textBlockAlignment={textBlockAlignment}
    >
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
                'side-by-side__title',
                headingAdditionalClass ? headingAdditionalClass : 'h1',
                additionalClass,
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
        </div>
      </div>
    </ModularSideBySideBlockStyles>
  );
};

export default ModularSideBySideBlock;

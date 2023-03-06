import {
  Button,
  Heading,
  MobileDesktopImage,
  ShowMobileOnly,
  ShowTabletAndUpOnly,
} from '@diamantaire/darkside/components/common-ui';
import { UniLink } from '@diamantaire/darkside/core';
import { WHITE } from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
import Markdown from 'markdown-to-jsx';

import { ModularHalfBannerBlockContainer } from './ModularHalfBannerBlock.style';

const ModularHalfWidthBannerBlock = ({
  title,
  mobileTitle,
  subTitle,
  desktopImage,
  mobileImage,
  desktopCopy,
  mobileCopy,
  ctaCopy,
  ctaCopy2,
  ctaCopy3,
  ctaRoute,
  ctaRoute2,
  ctaRoute3,
  ctaButtonType = 'secondary',
  ctaButtonType2 = 'secondary',
  ctaButtonType3 = 'secondary',
  alt,
  headingType,
  textBlockAlignment,
  textColor,
  isTextBlockWide,
  headingAdditionalClass,
  subtitleAdditionalClass,
  additionalClass,
}) => {
  const renderHalfWidthBlockTitle = (title) => {
    return (
      <Heading
        type={headingType ? headingType : 'h2'}
        className={clsx(
          headingAdditionalClass ? headingAdditionalClass : 'h1',
          'banner half-width-banner__title',
          'primary',
          {
            '-white': textColor.toLowerCase() === 'white',
          },
        )}
      >
        <Markdown options={{ forceInline: true }}>{title}</Markdown>
      </Heading>
    );
  };

  return (
    <ModularHalfBannerBlockContainer className="container-emotion -vertical-margins">
      <div
        className={clsx('half-width__image-wrapper', {
          '-left': textBlockAlignment.toLowerCase() === 'left',
          '-right': textBlockAlignment.toLowerCase() === 'right',
        })}
      >
        <MobileDesktopImage
          desktopImage={desktopImage}
          mobileImage={mobileImage}
          alt={alt}
          className={clsx({
            '-left': textBlockAlignment.toLowerCase() === 'left',
            '-right': textBlockAlignment.toLowerCase() === 'right',
          })}
        />
      </div>

      <div
        className={clsx(
          'half-width-banner__text -bg',
          {
            '-left': textBlockAlignment.toLowerCase() === 'left',
            '-right': textBlockAlignment.toLowerCase() === 'right',
            '-white': textColor.toLowerCase() === 'white',
            '-wide': isTextBlockWide,
          },
          additionalClass,
        )}
      >
        {title && mobileTitle && (
          <>
            <ShowMobileOnly>{renderHalfWidthBlockTitle(mobileTitle)}</ShowMobileOnly>
            <ShowTabletAndUpOnly>{renderHalfWidthBlockTitle(title)}</ShowTabletAndUpOnly>
          </>
        )}
        {title && !mobileTitle && renderHalfWidthBlockTitle(title)}
        {subTitle && (
          <div
            className={clsx(
              'half-width-banner__title',
              {
                '-white': textColor.toLowerCase() === 'white',
              },
              subtitleAdditionalClass,
            )}
          >
            <Markdown options={{ forceInline: true }}>{subTitle}</Markdown>
          </div>
        )}

        <div
          className={clsx(
            'half-width-banner__copy',
            {
              '-white': textColor.toLowerCase() === 'white',
            },
            additionalClass,
          )}
        >
          {desktopCopy && (
            <ShowTabletAndUpOnly>
              <Markdown options={{ forceBlock: true }}>{desktopCopy}</Markdown>
            </ShowTabletAndUpOnly>
          )}

          {mobileCopy && (
            <ShowMobileOnly>
              <Markdown options={{ forceBlock: true }}>{mobileCopy}</Markdown>
            </ShowMobileOnly>
          )}
        </div>

        <div className="cta">
          {ctaRoute && (
            <UniLink route={ctaRoute}>
              <Button
                className={clsx('-mobile-wide', ctaButtonType, additionalClass, {
                  '-inverse-tabletAndUp': textColor === WHITE,
                })}
              >
                {ctaCopy}
              </Button>
            </UniLink>
          )}
          {ctaRoute && ctaRoute2 && (
            <UniLink route={ctaRoute2}>
              <Button
                className={clsx('second-button', ctaButtonType2, additionalClass, {
                  '-inverse-tabletAndUp': textColor === WHITE,
                })}
              >
                {ctaCopy2}
              </Button>
            </UniLink>
          )}
          {ctaRoute && ctaRoute2 && ctaRoute3 && (
            <UniLink route={ctaRoute3}>
              <Button
                className={clsx('second-button', ctaButtonType3, additionalClass, {
                  '-inverse-tabletAndUp': textColor === WHITE,
                })}
              >
                {ctaCopy3}
              </Button>
            </UniLink>
          )}
        </div>
      </div>
    </ModularHalfBannerBlockContainer>
  );
};

export default ModularHalfWidthBannerBlock;

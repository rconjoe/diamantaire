/* 
  This component is actively being abstracted as more use-cases appear -Sam
*/

import {
  Heading,
  ShowMobileOnly,
  ShowTabletAndUpOnly,
  MobileDesktopImage,
  VRAIButton,
  ButtonTypeProps,
} from '@diamantaire/darkside/components/common-ui';
import { UniLink } from '@diamantaire/darkside/core';
import { replaceMoneyByCurrency, getBlockPictureAlt, isCountrySupported } from '@diamantaire/shared/helpers';
import { DatoImageType } from '@diamantaire/shared/types';
import { WHITE } from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
import Markdown from 'markdown-to-jsx';

import {
  BannerTextContainer,
  BannerWrapper,
  Copy,
  FullWidthImageContainer,
  SubTitle,
  Title,
} from './ModularBannerBlock.style';

type ModularBannerBlockProps = {
  title: string;
  subTitle?: string;
  mobileTitle?: string;
  desktopCopy?: string;
  mobileCopy?: string;
  ctaCopy?: string;
  ctaRoute?: string;
  ctaButtonType?: ButtonTypeProps;
  desktopImage: DatoImageType;
  mobileImage: DatoImageType;
  textBlockAlignment: string;
  desktopImageName: string;
  mobileImageName: string;
  isFullWidth: boolean;
  textColor: string;
  isTextBlockWide: boolean;
  shouldLazyLoad?: boolean;
  ctaCopy2?: string;
  ctaRoute2?: string;
  ctaButtonType2?: ButtonTypeProps;
  ctaCopy3?: string;
  ctaRoute3?: string;
  ctaButtonType3?: ButtonTypeProps;
  middleLayerImage: DatoImageType;
  middleLayerImageMobile: DatoImageType;
  additionalClass?: string;
  copyPrices: object;
  currencyCode: string;
  countryCode: string;
  supportedCountries: Array<{
    code: string;
  }>;
  gtmClass?: string;
  headingType?: string;
  headingAdditionalClass?: string;
  isMobile?: boolean;
  subtitleAdditionalClass?: string;
};

const ModularBannerBlock = (props) => {
  const { shouldLazyLoad } = props;

  let { title, desktopCopy, mobileCopy, subTitle } = props;

  const {
    headingType,
    headingAdditionalClass,
    mobileTitle,
    ctaCopy,
    ctaRoute,
    ctaButtonType = 'secondary',
    desktopImage,
    mobileImage,
    textBlockAlignment,
    isFullWidth = true,
    textColor,
    isTextBlockWide,
    ctaCopy2,
    ctaRoute2,
    ctaButtonType2 = 'secondary',
    ctaCopy3,
    ctaRoute3,
    ctaButtonType3 = 'secondary',
    additionalClass,
    currencyCode = 'USD',
    copyPrices,
    countryCode = 'US',
    supportedCountries,
    gtmClass,
    subtitleAdditionalClass,
  }: ModularBannerBlockProps = props;

  // If country is not supported, do not render
  if (!isCountrySupported(supportedCountries, countryCode)) {
    return null;
  }

  // Replace any money value with appropriate currency format and value
  if (copyPrices) {
    title = replaceMoneyByCurrency(title, currencyCode, copyPrices);
    subTitle = subTitle && replaceMoneyByCurrency(subTitle, currencyCode, copyPrices);
    desktopCopy = replaceMoneyByCurrency(desktopCopy, currencyCode, copyPrices);
    mobileCopy = replaceMoneyByCurrency(mobileCopy, currencyCode, copyPrices);
  }

  const alt = getBlockPictureAlt({ desktopImage, mobileImage, title });

  const renderBlocKTitle = (title) => {
    if (isFullWidth) {
      return renderFullWidthBlockTitle(title);
    }

    return renderFullWidthBlockTitle(title);
  };

  const renderFullWidthBlockTitle = (title) => (
    <Heading
      type={headingType}
      className={clsx(headingAdditionalClass, Title, 'primary', {
        '-white': textColor?.toLowerCase() === 'white',
      })}
    >
      <Markdown options={{ forceInline: true }}>{title}</Markdown>
    </Heading>
  );

  return (
    <BannerWrapper>
      <div
        className={clsx(additionalClass, {
          '-vertical-margins': !isFullWidth,
        })}
      >
        <FullWidthImageContainer>
          <MobileDesktopImage
            desktopImage={desktopImage}
            mobileImage={mobileImage}
            alt={alt}
            shouldLazyLoad={shouldLazyLoad}
          />
        </FullWidthImageContainer>

        <BannerTextContainer
          className={clsx(
            {
              '-left': textBlockAlignment.toLowerCase() === 'left',
              '-right': textBlockAlignment.toLowerCase() === 'right',
              '-bg': !isFullWidth,
              '-white': textColor?.toLowerCase() === 'white',
              '-wide': isTextBlockWide,
            },
            additionalClass,
          )}
        >
          {title && mobileTitle && (
            <>
              <ShowMobileOnly>{renderBlocKTitle(mobileTitle)}</ShowMobileOnly>
              <ShowTabletAndUpOnly>{renderBlocKTitle(title)}</ShowTabletAndUpOnly>
            </>
          )}
          {title && !mobileTitle && renderBlocKTitle(title)}
          {subTitle && (
            <SubTitle
              className={clsx(
                {
                  '-white': textColor === WHITE,
                },
                subtitleAdditionalClass,
              )}
            >
              <Markdown options={{ forceInline: true }}>{subTitle}</Markdown>
            </SubTitle>
          )}

          <Copy
            className={clsx(
              {
                '-white': textColor?.toLowerCase() === 'white',
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
          </Copy>

          <div className="cta">
            {ctaRoute && (
              <span>
                <UniLink route={ctaRoute} className={gtmClass}>
                  <VRAIButton
                    colorTheme={
                      ctaButtonType.includes('-white') ? 'white' : ctaButtonType.includes('-teal') ? 'teal' : 'black'
                    }
                    inverse={ctaButtonType.includes('-white')}
                    className={clsx('-mobile-wide', ctaButtonType, additionalClass, {
                      '-inverse-tabletAndUp': textColor === WHITE,
                      // primary: !ctaButtonType,
                    })}
                    type={ctaButtonType}
                  >
                    {ctaCopy}
                  </VRAIButton>
                </UniLink>
              </span>
            )}
            {ctaRoute && ctaRoute2 && (
              <span>
                <UniLink route={ctaRoute2}>
                  <VRAIButton
                    colorTheme={
                      ctaButtonType2.includes('-white')
                        ? 'white'
                        : ctaButtonType2.includes('-teal') && !ctaButtonType2.includes('-hover-font-teal')
                        ? 'teal'
                        : 'black'
                    }
                    inverse={true}
                    className={clsx('second-button', ctaButtonType2, additionalClass, {
                      '-inverse-tabletAndUp': textColor === WHITE,
                    })}
                    type={ctaButtonType2}
                  >
                    {ctaCopy2}
                  </VRAIButton>
                </UniLink>
              </span>
            )}
            {ctaRoute && ctaRoute2 && ctaRoute3 && (
              <span>
                <UniLink route={ctaRoute3}>
                  <VRAIButton
                    className={clsx('second-button', ctaButtonType3, additionalClass, {
                      '-inverse-tabletAndUp': textColor === WHITE,
                    })}
                    type={ctaButtonType3}
                  >
                    {ctaCopy3}
                  </VRAIButton>
                </UniLink>
              </span>
            )}
          </div>
        </BannerTextContainer>
      </div>
    </BannerWrapper>
  );
};

export default ModularBannerBlock;

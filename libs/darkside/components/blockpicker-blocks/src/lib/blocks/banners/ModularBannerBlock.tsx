/* 
  This component is actively being abstracted as more use-cases appear -Sam
*/

import {
  DarksideButton,
  DatoDarksideButtonProps,
  Heading,
  MobileDesktopImage,
  ShowMobileOnly,
  ShowTabletAndUpOnly,
} from '@diamantaire/darkside/components/common-ui';
import { getBlockPictureAlt, isCountrySupported, replaceMoneyByCurrency } from '@diamantaire/shared/helpers';
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
  desktopImage: DatoImageType;
  mobileImage: DatoImageType;
  textBlockAlignment: string;
  desktopImageName: string;
  mobileImageName: string;
  isFullWidth: boolean;
  textColor: string;
  isTextBlockWide: boolean;
  shouldLazyLoad?: boolean;
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
  darksideButtons: DatoDarksideButtonProps[];
};

const ModularBannerBlock = (props) => {
  const { shouldLazyLoad } = props;

  let { title, desktopCopy, mobileCopy, subTitle } = props;

  const {
    headingType,
    headingAdditionalClass,
    mobileTitle,
    desktopImage,
    mobileImage,
    textBlockAlignment,
    isFullWidth = true,
    textColor,
    isTextBlockWide,
    additionalClass,
    currencyCode = 'USD',
    copyPrices,
    countryCode = 'US',
    supportedCountries,
    subtitleAdditionalClass,
    darksideButtons,
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
              '-left': textBlockAlignment?.toLowerCase() === 'left',
              '-right': textBlockAlignment?.toLowerCase() === 'right',
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
            {darksideButtons?.map((button) => (
              <div className="cta__button" key={button.id}>
                <DarksideButton
                  mobileColorTheme={button.ctaButtonMobileColorTheme}
                  colorTheme={button.ctaButtonColorTheme}
                  type={button.ctaButtonType}
                  href={button.ctaLinkUrl}
                >
                  {button.ctaCopy}
                </DarksideButton>
              </div>
            ))}
          </div>
        </BannerTextContainer>
      </div>
    </BannerWrapper>
  );
};

export default ModularBannerBlock;

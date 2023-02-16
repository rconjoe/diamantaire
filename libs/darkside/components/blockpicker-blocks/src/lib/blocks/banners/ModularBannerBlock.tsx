import {
  MobileDesktopImage,
  Button,
  Heading,
  ShowMobileOnly,
  ShowTabletAndUpOnly,
} from '@diamantaire/darkside/components/common-ui';
import { UniLink } from '@diamantaire/darkside/core';
import { replaceMoneyByCurrency, getBlockPictureAlt, isCountrySupported } from '@diamantaire/shared/helpers';
import { WHITE } from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
import Markdown from 'markdown-to-jsx';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';

import {
  BannerTextContainer,
  BannerWrapper,
  Copy,
  FullWidthImageContainer,
  HalfWidthImageContainer,
  MiddleLayerImageContainer,
  MobileMiddleLayerImageContainer,
  SubTitle,
  Title,
} from './ModularBannerBlock.style';

const ReactPlayer = dynamic(() => import('react-player'));

type ModularBannerBlockProps = {
  title: string;
  subTitle?: string;
  mobileTitle?: string;
  desktopCopy?: string;
  mobileCopy?: string;
  ctaCopy?: string;
  ctaRoute?: string;
  ctaButtonType?: string;
  desktopImage: {
    mimeType: string;
    url: string;
    alt: string;
    desktopAlt: string;
    responsiveImage: {
      width: number;
      height: number;
    };
  };
  mobileImage: {
    mimeType: string;
    url: string;
    alt: string;
    responsiveImage: {
      width: number;
      height: number;
    };
  };
  textBlockAlignment: string;
  desktopImageName: string;
  mobileImageName: string;
  isFullWidth: boolean;
  textColor: string;
  isTextBlockWide: boolean;
  shouldLazyLoad: boolean;
  ctaCopy2?: string;
  ctaRoute2?: string;
  ctaButtonType2?: string;
  ctaCopy3?: string;
  ctaRoute3?: string;
  ctaButtonType3?: string;
  middleLayerImage: {
    url: string;
    desktopAlt?: string;
    alt?: string;
    responsiveImage: {
      width: number;
      height: number;
    };
  };
  middleLayerImageMobile: {
    desktopAlt?: string;
    url: string;
    responsiveImage: {
      width: number;
      height: number;
    };
  };
  additionalClass?: string;
  copyPrices: object;
  currencyCode: string;
  countryCode: string;
  supportedCountries: Array<string>;
  gtmClass?: string;
  headingType?: string;
  headingAdditionalClass?: string;
  isMobile?: boolean;
  subtitleAdditionalClass?: string;
};

const Banner = (props) => {
  let { title, desktopCopy, mobileCopy, subTitle } = props?.blocks?.[0] || props;
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
    middleLayerImage,
    middleLayerImageMobile,
    additionalClass,
    currencyCode = 'USD',
    copyPrices,
    countryCode = 'US',
    supportedCountries,
    gtmClass,
    isMobile,
    subtitleAdditionalClass,
  }: ModularBannerBlockProps = props?.blocks?.[0] || props;

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

  const hasResponsive = Boolean(desktopImage?.responsiveImage && mobileImage?.responsiveImage);

  const alt = getBlockPictureAlt({ desktopImage, mobileImage, title });

  const Block = isFullWidth ? (
    <FullWidthImageContainer>
      <div className="image__desktop">
        <Image
          src={desktopImage?.url}
          height={desktopImage?.responsiveImage?.height}
          width={desktopImage?.responsiveImage?.width}
          alt={alt}
        />
      </div>
      <div className="image__mobile">
        <Image
          src={mobileImage?.url}
          height={mobileImage?.responsiveImage?.height}
          width={mobileImage?.responsiveImage?.width}
          alt={alt}
        />
      </div>
    </FullWidthImageContainer>
  ) : (
    <HalfWidthImageContainer className={textBlockAlignment === 'right' ? '-right' : '-left'}>
      <div className="half-width__image-wrapper">
        <div className="image__desktop">
          <Image
            src={desktopImage?.url}
            height={desktopImage?.responsiveImage?.height}
            width={desktopImage?.responsiveImage?.width}
            alt={alt}
          />
        </div>
        <div className="image__mobile">
          <Image
            src={mobileImage?.url}
            height={mobileImage?.responsiveImage?.height}
            width={mobileImage?.responsiveImage?.width}
            alt={alt}
          />
        </div>
      </div>
    </HalfWidthImageContainer>
  );

  const responsiveBlockClassNames = [];

  if (textBlockAlignment !== 'right') {
    responsiveBlockClassNames.push('-left');
  } else {
    responsiveBlockClassNames.push('-right');
  }

  const getResponsiveBlock = () => {
    return isFullWidth ? (
      <FullWidthImageContainer>
        <MobileDesktopImage desktopImage={desktopImage} mobileImage={mobileImage} alt={alt} />
      </FullWidthImageContainer>
    ) : (
      <HalfWidthImageContainer>
        <MobileDesktopImage
          className={clsx(responsiveBlockClassNames.join(' '))}
          desktopImage={desktopImage}
          mobileImage={mobileImage}
          alt={alt}
        />
      </HalfWidthImageContainer>
    );
  };

  const renderBlocKTitle = (title) => {
    if (isFullWidth) {
      return renderFullWidthBlockTitle(title);
    }

    return renderHalfWidthBlockTitle(title);
  };

  const renderFullWidthBlockTitle = (title) => (
    <Heading
      type={headingType}
      className={clsx(headingAdditionalClass, Title, 'primary', {
        '-white': textColor === WHITE,
      })}
    >
      <Markdown options={{ forceInline: true }}>{title}</Markdown>
    </Heading>
  );

  const renderHalfWidthBlockTitle = (title) => {
    return (
      <Heading
        type={headingType ? headingType : 'h2'}
        className={clsx(headingAdditionalClass ? headingAdditionalClass : 'h1', Title, 'banner', 'primary', {
          '-white': textColor === WHITE,
        })}
      >
        <Markdown options={{ forceInline: true }}>{title}</Markdown>
      </Heading>
    );
  };
  const isMobileWebMFile = mobileImage?.mimeType === 'video/webm' && isMobile;

  const isDesktopWebMFile = desktopImage?.mimeType === 'video/webm' && !isMobile;

  const getNonResponsiveBlock = () => {
    if (isMobileWebMFile || isDesktopWebMFile) {
      return (
        <ReactPlayer
          url={isMobile ? mobileImage?.url : desktopImage?.url}
          playing={true}
          playsinline
          height="100%"
          width="100%"
          muted={true}
          loop={true}
          controls={false}
          config={{
            file: {
              attributes: {
                title: isMobile ? mobileImage?.alt : desktopImage?.alt,
              },
            },
          }}
        />
      );
    }

    return Block;
  };

  const bannerText = (
    <BannerTextContainer
      className={clsx(
        {
          '-left': textBlockAlignment === 'left',
          '-right': textBlockAlignment === 'right',
          '-bg': !isFullWidth,
          '-white': textColor === WHITE,
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
            '-white': textColor === WHITE,
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
          <UniLink route={ctaRoute} className={gtmClass}>
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
    </BannerTextContainer>
  );

  const bannerContent = (
    <>
      {hasResponsive ? getResponsiveBlock() : getNonResponsiveBlock()}

      {middleLayerImage && (
        <ShowTabletAndUpOnly>
          <MiddleLayerImageContainer className={additionalClass}>
            <Image
              src={middleLayerImage.url}
              height={middleLayerImage?.responsiveImage?.height}
              width={middleLayerImage?.responsiveImage?.width}
              alt={getBlockPictureAlt({
                desktopImage: middleLayerImage,
                title,
              })}
            />
          </MiddleLayerImageContainer>
        </ShowTabletAndUpOnly>
      )}

      {middleLayerImageMobile && (
        <ShowMobileOnly>
          <MobileMiddleLayerImageContainer className={additionalClass}>
            <Image
              src={middleLayerImageMobile.url}
              height={middleLayerImageMobile?.responsiveImage?.height}
              width={middleLayerImageMobile?.responsiveImage?.width}
              alt={getBlockPictureAlt({
                // //@ts-expect-error: need to fix types
                mobileImage: middleLayerImageMobile,
                title,
              })}
            />
          </MobileMiddleLayerImageContainer>
        </ShowMobileOnly>
      )}

      {bannerText}
    </>
  );

  return (
    <BannerWrapper>
      <div
        className={clsx(additionalClass, {
          '-vertical-margins': !isFullWidth,
        })}
      >
        {bannerContent}
      </div>
    </BannerWrapper>
  );
};

export default Banner;

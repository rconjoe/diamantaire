import { UniLink } from '@diamantaire/darkside/core';
import {
  replaceMoneyByCurrency,
  makeContentImageUrl,
  makeDatoImageUrl,
  getBlockPictureAlt,
  isCountrySupported,
} from '@diamantaire/shared/helpers';
import { WHITE } from '@diamantaire/styles/darkside-styles';
import { cx } from '@emotion/css';
import Markdown from 'markdown-to-jsx';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';

import MobileDesktopImage from './MobileDesktopImage';
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
import Button from './molecules/Button';
import Heading from './molecules/Heading';
import Picture from './molecules/Picture';
import ShowMobileOnly from './ShowMobileOnly';
import ShowTabletAndUpOnly from './ShowTabletAndUpOnly';

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
    responsiveImage: {
      width: number;
      height: number;
    };
  };
  middleLayerImageMobile: {
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

const Banner = ({
  title,
  headingType,
  headingAdditionalClass,
  subTitle = '',
  mobileTitle,
  desktopCopy,
  mobileCopy,
  ctaCopy,
  ctaRoute,
  ctaButtonType = 'secondary',
  desktopImage,
  mobileImage,
  desktopImageName,
  mobileImageName,
  textBlockAlignment,
  isFullWidth = true,
  textColor,
  isTextBlockWide,
  shouldLazyLoad = true,
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
}: ModularBannerBlockProps) => {
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

  const desktopImg = (() => {
    if (desktopImageName) {
      return makeContentImageUrl(desktopImageName);
    }

    if (desktopImage) {
      return makeDatoImageUrl(desktopImage.url);
    }
  })();

  const mobileImg = (() => {
    if (mobileImageName) {
      return makeContentImageUrl(mobileImageName);
    }

    if (mobileImage) {
      return makeDatoImageUrl(mobileImage.url);
    }
  })();

  const fullWidthSizes = {
    desktopSource: {
      imageUrl: desktopImg,
      mediaMinThreshold: 768,
      sizes: `
            (min-width: 1440px) 1440px,
            (min-width: 768px) 100vw,
          `,
      srcSet1XSizes: [991, 1199, 1440],
    },
    mobileSource: {
      imageUrl: mobileImg,
      mediaMinThreshold: 0,
      sizes: '100vw',
      srcSet1XSizes: [375, 414, 767],
    },
    maxWidth: 1440,
  };

  const halfWidthSizes = {
    desktopSource: {
      imageUrl: desktopImg,
      mediaMinThreshold: 768,
      sizes: `
              (min-width: 1440px) 864px,
              (min-width: 768px) 60vw,
            `,
      srcSet1XSizes: [461, 595, 719, 864],
    },
    mobileSource: {
      imageUrl: mobileImg,
      mediaMinThreshold: 0,
      sizes: '100vw',
      srcSet1XSizes: [375, 575, 767],
    },
    maxWidth: 864,
  };

  const hasResponsive = Boolean(desktopImage?.responsiveImage && mobileImage?.responsiveImage);

  const alt = getBlockPictureAlt({ desktopImage, mobileImage, title });

  const Block = isFullWidth ? (
    <FullWidthImageContainer>
      <Picture
        desktopSource={fullWidthSizes.desktopSource}
        mobileSource={fullWidthSizes.mobileSource}
        isLazyLoaded={shouldLazyLoad}
        maxWidth={fullWidthSizes.maxWidth}
        alt={alt}
      />
    </FullWidthImageContainer>
  ) : (
    <HalfWidthImageContainer className={textBlockAlignment === 'right' ? '-right' : '-left'}>
      <Picture
        desktopSource={halfWidthSizes.desktopSource}
        mobileSource={halfWidthSizes.mobileSource}
        isLazyLoaded={shouldLazyLoad}
        maxWidth={halfWidthSizes.maxWidth}
        alt={alt}
      />
    </HalfWidthImageContainer>
  );

  const getResponsiveBlock = () => {
    return isFullWidth ? (
      <FullWidthImageContainer>
        <MobileDesktopImage desktopImage={desktopImage} mobileImage={mobileImage} alt={alt} />
      </FullWidthImageContainer>
    ) : (
      <HalfWidthImageContainer>
        <MobileDesktopImage
          className={cx(styles.halfWidthImageContainer, {
            '-left': textBlockAlignment !== 'right',
            '-right': textBlockAlignment === 'right',
          })}
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
      className={cx(headingAdditionalClass, Title, 'primary', {
        '-white': textColor === WHITE,
      })}
    >
      <Markdown options={{ forceInline: true }}>{title}</Markdown>
    </Heading>
  );

  const renderHalfWidthBlockTitle = (title) => (
    <Heading
      type={headingType ? headingType : 'h2'}
      className={cx(headingAdditionalClass ? headingAdditionalClass : 'h1', styles.title, 'banner', 'primary', {
        '-white': textColor === WHITE,
      })}
    >
      <Markdown options={{ forceInline: true }}>{title}</Markdown>
    </Heading>
  );

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

  // headline
  const bannerTextClassNames = [];

  if (textBlockAlignment === 'left') bannerTextClassNames.push('-left');
  if (textBlockAlignment === 'right') bannerTextClassNames.push('-right');
  if (!isFullWidth) bannerTextClassNames.push('-bg');
  if (isTextBlockWide) bannerTextClassNames.push('-wide');
  if (textColor === WHITE) bannerTextClassNames.push('-white');
  if (additionalClass) bannerTextClassNames.push(additionalClass);

  // copy
  const copyClassNames = [];

  if (textColor === WHITE) copyClassNames.push('-white');
  if (additionalClass) copyClassNames.push(additionalClass);

  // subtitle
  const subTitleClassNames = [];

  if (textColor === WHITE) subTitleClassNames.push('-white');

  // buttons

  const buttonOneClassNames = ['-mobile-wide', ctaButtonType, additionalClass ? additionalClass : ''];
  const buttonTwoClassNames = ['second-button', ctaButtonType2];
  // this is how it was.....
  const buttonThreeClassNames = ['second-button', ctaButtonType3];

  if (textColor === WHITE) {
    buttonOneClassNames.push('-inverse-tabletAndUp');
    buttonTwoClassNames.push('-inverse-tabletAndUp');
  }

  const bannerText = (
    <BannerTextContainer className={bannerTextClassNames.join(' ')}>
      {title && mobileTitle && (
        <>
          <ShowMobileOnly>{renderBlocKTitle(mobileTitle)}</ShowMobileOnly>
          <ShowTabletAndUpOnly>{renderBlocKTitle(title)}</ShowTabletAndUpOnly>
        </>
      )}
      {title && !mobileTitle && renderBlocKTitle(title)}
      {subTitle && (
        <SubTitle className={subTitleClassNames}>
          <Markdown options={{ forceInline: true }}>{subTitle}</Markdown>
        </SubTitle>
      )}

      <Copy className={copyClassNames}>
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
            <Button className={buttonOneClassNames.join(' ')}>{ctaCopy}</Button>
          </UniLink>
        )}
        {ctaRoute && ctaRoute2 && (
          <UniLink route={ctaRoute2}>
            <Button className={buttonTwoClassNames.join(' ')}>{ctaCopy2}</Button>
          </UniLink>
        )}
        {ctaRoute && ctaRoute2 && ctaRoute3 && (
          <UniLink route={ctaRoute3}>
            <Button className={buttonThreeClassNames.join(' ')}>{ctaCopy3}</Button>
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

  const bannerWrapperClassNames = [];

  if (!isFullWidth) bannerWrapperClassNames.push('-vertical-margins');
  if (!additionalClass) bannerWrapperClassNames.push(additionalClass);

  return (
    <BannerWrapper>
      <div className={bannerWrapperClassNames.join(' ')}>{bannerContent}</div>
    </BannerWrapper>
  );
};

export default Banner;

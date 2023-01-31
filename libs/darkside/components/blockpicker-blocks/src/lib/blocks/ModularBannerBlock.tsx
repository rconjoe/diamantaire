import styled from '@emotion/styled';
import Image from 'next/image';
import React from 'react';

const ModularBannerBlockStyles = styled.div``;

const ModularBannerBlock = (props) => {
  console.log('props', props);

  const {
    title,
    headingType,
    headingAdditionalClass,
    subTitle,
    mobileTitle,
    desktopCopy,
    mobileCopy,
    ctaCopy,
    ctaRoute,
    ctaButtonType,
    desktopImage,
    mobileImage,
    desktopImageName,
    mobileImageName,
    textBlockAlignment,
    isFullWidth,
    textColor,
    isTextBlockWide,
    shouldLazyLoad,
    ctaCopy2,
    ctaRoute2,
    ctaButtonType2,
    ctaCopy3,
    ctaRoute3,
    ctaButtonType3,
    middleLayerImage,
    middleLayerImageMobile,
    additionalClass,
    currencyCode,
    copyPrices,
    countryCode,
    supportedCountries,
    gtmClass,
    isMobile,
    subtitleAdditionalClass,
  } = props.blocks[0];

  const desktopImageObject = {
    src: desktopImage.url,
    height: desktopImage.responsiveImage.height,
    width: desktopImage.responsiveImage.width,
  };

  const mobileImageObject = {
    src: mobileImage.url,
    height: mobileImage.responsiveImage.height,
    width: mobileImage.responsiveImage.width,
  };

  return (
    <ModularBannerBlockStyles>
      <div className="desktop-image">
        <Image
          alt={ctaCopy}
          src={desktopImageObject.src}
          height={desktopImageObject.height}
          width={desktopImageObject.width}
        />
      </div>
    </ModularBannerBlockStyles>
  );
};

export default ModularBannerBlock;

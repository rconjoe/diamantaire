import {
  ShowMobileOnly,
  ShowTabletAndUpOnly,
  MobileDesktopImage,
  VRAIButton,
  ButtonTypeProps,
} from '@diamantaire/darkside/components/common-ui';
import { UniLink } from '@diamantaire/darkside/core';
import { getBlockPictureAlt } from '@diamantaire/shared/helpers';
import { Logo as VOLogo } from '@diamantaire/shared/icons';
import { DatoImageType } from '@diamantaire/shared/types';
import { WHITE } from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
import dynamic from 'next/dynamic';

import { ModularCollectionHeroBlockContainer } from './ModularCollectionHeroBlock.style';

type ModularCollectionHeroBlockProps = {
  title: string;
  titleFont?: string;
  titleStyle?: string;
  desktopImage: DatoImageType;
  mobileImage: DatoImageType;
  showByVrai?: boolean;
  byText?: string;
  ctaCopy?: string;
  ctaType?: ButtonTypeProps;
  ctaLinkUrl?: string;
  textColor?: {
    hex: string;
  };
  additionalClass?: string;
  subtitle?: string;
  subtitleFont?: string;
  backgroundColor?: {
    hex: string;
  };
};

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

const ModularCollectionHeroBlock = (props: ModularCollectionHeroBlockProps) => {
  const {
    title,
    subtitle,
    subtitleFont,
    titleFont,
    titleStyle,
    desktopImage,
    mobileImage,
    ctaCopy,
    ctaType,
    ctaLinkUrl,
    textColor,
    showByVrai,
    byText,
    additionalClass,
    backgroundColor,
  } = props;

  const alt = getBlockPictureAlt({ desktopImage, mobileImage, title });
  const hasImage = !!desktopImage || !!mobileImage;
  const hasDesktopVideo = !!desktopImage?.video;
  const hasMobileVideo = !!mobileImage?.video;

  const ctaTypeClass = ctaType ? ctaType : 'primary';

  console.log('textColor', textColor);

  return (
    <ModularCollectionHeroBlockContainer
      $backgroundColor={backgroundColor?.hex}
      $showByVrai={showByVrai}
      $ctaLinkUrl={ctaLinkUrl}
      $subtitle={subtitle}
      $subtitleFont={subtitleFont}
      $textColor={textColor}
      $titleFont={titleFont}
      $titleStyle={titleStyle}
      className={clsx(hasImage ? '' : 'no-image', additionalClass)}
    >
      {hasDesktopVideo && hasMobileVideo ? (
        <>
          <ShowTabletAndUpOnly>
            <div className="hero-block__video-wrapper">
              <ReactPlayer
                url={desktopImage?.video?.streamingUrl}
                playing
                volume={0}
                muted
                loop
                playsinline
                height="100%"
                width="100%"
              />
            </div>
          </ShowTabletAndUpOnly>
          <ShowMobileOnly>
            <div className="hero-block__video-wrapper">
              <ReactPlayer
                url={mobileImage.video.streamingUrl}
                playing
                volume={0}
                muted
                loop
                playsinline
                height="100%"
                width="100%"
              />
            </div>
          </ShowMobileOnly>
        </>
      ) : hasImage ? (
        <MobileDesktopImage desktopImage={desktopImage} mobileImage={mobileImage} alt={alt} />
      ) : (
        ''
      )}

      <div className={clsx('hero-block__title-container', additionalClass)}>
        <h1 className={clsx('hero-block__title', additionalClass)}>{title}</h1>

        {showByVrai && (
          <div className={clsx('hero-block__by-vrai-container', additionalClass)}>
            <span className={clsx('hero-block__by-block', additionalClass)}>{byText ? byText : 'by'}</span>
            <div className={clsx('hero-block__vrai-block', additionalClass)}>
              <VOLogo />
            </div>
          </div>
        )}

        {subtitle && (
          <div className="hero-block__by-vrai-container">
            <span className="hero-block__subtitle">{subtitle}</span>
          </div>
        )}

        {ctaLinkUrl && (
          <div className={'hero-block__button-container'}>
            <UniLink route={ctaLinkUrl} className="hero-block__cta">
              <ShowMobileOnly>
                <VRAIButton
                  className={clsx('hero-block__button -wide', ctaTypeClass, {
                    '-inverse': textColor?.hex?.toLowerCase() === 'white',
                  })}
                  type={ctaTypeClass}
                >
                  {ctaCopy}
                </VRAIButton>
              </ShowMobileOnly>

              <ShowTabletAndUpOnly>
                <VRAIButton
                  className={clsx('hero-block__button', ctaTypeClass, {
                    '-inverse': textColor?.hex === WHITE,
                  })}
                  type={ctaTypeClass}
                >
                  {ctaCopy}
                </VRAIButton>
              </ShowTabletAndUpOnly>
            </UniLink>
          </div>
        )}
      </div>
    </ModularCollectionHeroBlockContainer>
  );
};

export default ModularCollectionHeroBlock;

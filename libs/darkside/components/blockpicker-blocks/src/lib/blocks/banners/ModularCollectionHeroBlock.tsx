import {
  ShowMobileOnly,
  ShowTabletAndUpOnly,
  MobileDesktopImage,
  DarksideButton,
} from '@diamantaire/darkside/components/common-ui';
import { getBlockPictureAlt } from '@diamantaire/shared/helpers';
import { Logo as VOLogo } from '@diamantaire/shared/icons';
import { DatoDarksideButtonProps, DatoImageType } from '@diamantaire/shared/types';
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
  ctaType?: string;
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
  darksideButtons: DatoDarksideButtonProps[];
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
    darksideButtons,
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

  return (
    <ModularCollectionHeroBlockContainer
      $backgroundColor={backgroundColor?.hex}
      $showByVrai={showByVrai}
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
        <div className="hero-block__image-wrapper">
          <MobileDesktopImage desktopImage={desktopImage} mobileImage={mobileImage} alt={alt} quality={90} />
        </div>
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

        {darksideButtons?.length > 0 && (
          <div className={'hero-block__button-container'}>
            {darksideButtons?.map((button) => {
              return (
                <DarksideButton
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
        )}
      </div>
    </ModularCollectionHeroBlockContainer>
  );
};

export default ModularCollectionHeroBlock;

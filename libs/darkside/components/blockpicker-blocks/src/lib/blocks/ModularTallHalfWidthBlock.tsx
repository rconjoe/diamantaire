import {
  DarksideButton,
  DatoImage,
  Heading,
  MobileDesktopImage,
  ShowMobileOnly,
  ShowTabletAndUpOnly,
} from '@diamantaire/darkside/components/common-ui';
import { getBlockPictureAlt, isCountrySupported } from '@diamantaire/shared/helpers';
import { DatoDarksideButtonProps, DatoImageType } from '@diamantaire/shared/types';
import clsx from 'clsx';
import Markdown from 'markdown-to-jsx';

import { ModularTallHalfWidthBlockContainer } from './ModularTallHalfWidthBlock.style';

type ModularTallHalfWidthBlockProps = {
  title: string;
  headingType?: string;
  headingAdditionalClass?: string;
  mobileTitle?: string;
  desktopCopy?: string;
  mobileCopy?: string;
  ctaCopy?: string;
  ctaRoute?: string;
  ctaCopy2?: string;
  ctaRoute2?: string;
  isTextBlockWide?: boolean;
  textColor?: string;
  textBlockAlignment: string;
  additionalClass?: string;
  supportedCountries: Array<{
    code: string;
  }>;
  countryCode?: string;
  shouldLazyLoad?: boolean;
  titleImage?: DatoImageType;
  desktopImage?: DatoImageType;
  mobileImage?: DatoImageType;
  darksideButtons: DatoDarksideButtonProps[];
};

const ModularTallHalfWidthBlock = ({
  title,
  headingType,
  headingAdditionalClass,
  mobileTitle,
  desktopCopy,
  desktopImage,
  mobileImage,
  isTextBlockWide,
  textColor,
  textBlockAlignment,
  additionalClass,
  supportedCountries,
  countryCode = 'US',
  titleImage,
  shouldLazyLoad,
  darksideButtons,
}: ModularTallHalfWidthBlockProps) => {
  if (!isCountrySupported(supportedCountries, countryCode)) {
    return null;
  }

  const alt = getBlockPictureAlt({ desktopImage, mobileImage, title });

  return (
    <ModularTallHalfWidthBlockContainer className={clsx('-vertical-margins', additionalClass)}>
      <MobileDesktopImage
        className={clsx('image-container', {
          '-left': textBlockAlignment !== 'right',
          '-right': textBlockAlignment === 'right',
        })}
        desktopImage={desktopImage}
        mobileImage={mobileImage}
        alt={alt}
      />

      <div
        className={clsx('content-container', '-bg', {
          '-left': textBlockAlignment !== 'right',
          '-right': textBlockAlignment === 'right',
          '-wide': isTextBlockWide,
          '-white': textColor === '#FFFFFF',
          [additionalClass]: additionalClass,
        })}
      >
        {title && mobileTitle && (
          <>
            <ShowTabletAndUpOnly>
              <Heading
                type={headingType}
                className={clsx(headingAdditionalClass, 'content__title primary', {
                  '-white': textColor === '#FFFFFF',
                })}
              >
                <Markdown options={{ forceInline: true }}>{title}</Markdown>
              </Heading>
            </ShowTabletAndUpOnly>

            <ShowMobileOnly>
              <Heading
                type={headingType}
                className={clsx(headingAdditionalClass, 'content__title primary', {
                  '-white': textColor === '#FFFFFF',
                })}
              >
                <Markdown options={{ forceInline: true }}>{mobileTitle}</Markdown>
              </Heading>
            </ShowMobileOnly>
          </>
        )}
        <div>
          {title && !mobileTitle && titleImage && (
            <div className="logo__title-wrapper">
              <Heading
                type={headingType}
                className={clsx(headingAdditionalClass, 'content__title primary', '-no-margin', {
                  '-white': textColor === '#FFFFFF',
                })}
              >
                <Markdown options={{ forceInline: true }}>{title}</Markdown>
              </Heading>

              <DatoImage
                image={titleImage}
                className="content__title-image"
                overrideAlt={title}
                shouldLazyLoad={shouldLazyLoad}
              />
            </div>
          )}
          {title && !mobileTitle && !titleImage && (
            <Heading
              type={headingType}
              className={clsx(headingAdditionalClass, 'content__title primary', {
                '-white': textColor === '#FFFFFF',
              })}
            >
              <Markdown options={{ forceInline: true }}>{title}</Markdown>
            </Heading>
          )}

          {desktopCopy && (
            <div className="content__desktop-copy">
              <Markdown options={{ forceBlock: true }}>{desktopCopy}</Markdown>
            </div>
          )}

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
      </div>
    </ModularTallHalfWidthBlockContainer>
  );
};

export default ModularTallHalfWidthBlock;

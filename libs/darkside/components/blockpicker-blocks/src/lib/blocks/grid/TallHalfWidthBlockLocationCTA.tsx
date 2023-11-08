import {
  DarksideButton,
  DatoDarksideButtonProps,
  Heading,
  MobileDesktopImage,
  ShowMobileOnly,
  ShowTabletAndUpOnly,
  UIString,
} from '@diamantaire/darkside/components/common-ui';
import { isUserCloseToShowroom } from '@diamantaire/shared/geolocation';
import { getBlockPictureAlt, isCountrySupported } from '@diamantaire/shared/helpers';
import { DatoImageType } from '@diamantaire/shared/types';
import clsx from 'clsx';
import Markdown from 'markdown-to-jsx';
import { useEffect, useState } from 'react';

import { TallHalfWidthBlockLocationCTAContainer } from './TallHalfWidthBlockLocation.style';

type TallHalfWidthBlockLocationCTAProps = {
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
  desktopImage: DatoImageType;
  mobileImage: DatoImageType;
  isTextBlockWide?: boolean;
  textColor?: string;
  textBlockAlignment: string;
  additionalClass?: string;
  supportedCountries: Array<any>;
  countryCode?: string;
  shouldLazyLoad?: boolean;
  titleImage: object;
  darksideButtons: DatoDarksideButtonProps[];
};

const TallHalfWidthBlockLocationCTA = ({
  title,
  headingType,
  headingAdditionalClass,
  desktopCopy,
  desktopImage,
  mobileImage,
  isTextBlockWide,
  textColor,
  textBlockAlignment,
  additionalClass,
  supportedCountries,
  shouldLazyLoad = true,
  countryCode = 'US',
  darksideButtons,
}: TallHalfWidthBlockLocationCTAProps) => {
  const [showroom, setShowroom] = useState({
    title: 'Expert advice',
    handle: '',
  });

  useEffect(() => {
    const showroomIfUserIsClose = isUserCloseToShowroom();

    if (showroomIfUserIsClose) {
      setShowroom(showroomIfUserIsClose);
    }
  }, []);

  if (!isCountrySupported(supportedCountries, countryCode)) {
    return null;
  }

  const alt = getBlockPictureAlt({ desktopImage, mobileImage, title });

  return (
    <TallHalfWidthBlockLocationCTAContainer>
      <MobileDesktopImage
        className={clsx('cta__image-container', {
          '-left': textBlockAlignment !== 'right',
          '-right': textBlockAlignment === 'right',
        })}
        desktopImage={desktopImage}
        mobileImage={mobileImage}
        shouldLazyLoad={shouldLazyLoad}
        alt={alt}
      />

      <div
        className={clsx('content__container', '-bg', {
          '-left': textBlockAlignment === 'left',
          '-right': textBlockAlignment === 'right',
          '-wide': isTextBlockWide,
          '-white': textColor === '#FFFFFF',
          [additionalClass]: additionalClass,
        })}
      >
        <ShowTabletAndUpOnly>
          <Heading
            type={headingType}
            className={clsx(headingAdditionalClass, 'content__title', 'primary', {
              '-white': textColor === '#FFFFFF',
            })}
          >
            {showroom?.title}
          </Heading>
        </ShowTabletAndUpOnly>
        <ShowMobileOnly>
          <Heading
            type={headingType}
            className={clsx(headingAdditionalClass, 'content__title', 'primary', {
              '-white': textColor === '#FFFFFF',
            })}
          >
            {showroom?.title}
          </Heading>
        </ShowMobileOnly>
        {desktopCopy && (
          <div className="content__desktop-copy">
            <Markdown options={{ forceBlock: true }}>{desktopCopy}</Markdown>
          </div>
        )}

        {showroom.title !== 'Expert advice' ? (
          <div className="cta -first">
            <DarksideButton
              mobileColorTheme={'desktop'}
              colorTheme={'black'}
              type={'outline'}
              href={`/book-appointment?location=${showroom.handle}`}
            >
              <UIString>Book an appointment</UIString>
            </DarksideButton>
          </div>
        ) : (
          darksideButtons?.map((button) => (
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
          ))
        )}
      </div>
    </TallHalfWidthBlockLocationCTAContainer>
  );
};

export default TallHalfWidthBlockLocationCTA;

import {
  Heading,
  Button,
  MobileDesktopImage,
  ShowTabletAndUpOnly,
  ShowMobileOnly,
} from '@diamantaire/darkside/components/common-ui';
import { UIString, UniLink } from '@diamantaire/darkside/core';
import { SHOWROOM_LOCATIONS } from '@diamantaire/shared/constants';
import { getBlockPictureAlt, isCountrySupported } from '@diamantaire/shared/helpers';
import { DatoImageType } from '@diamantaire/shared/types';
import { WHITE } from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
import Markdown from 'markdown-to-jsx';
import React, { useEffect, useState } from 'react';

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
};

const TallHalfWidthBlockLocationCTA = ({
  title,
  headingType,
  headingAdditionalClass,
  desktopCopy,
  ctaCopy,
  ctaRoute,
  ctaCopy2,
  ctaRoute2,
  desktopImage,
  mobileImage,
  isTextBlockWide,
  textColor,
  textBlockAlignment,
  additionalClass,
  supportedCountries,
  shouldLazyLoad = true,
  countryCode = 'US',
}: TallHalfWidthBlockLocationCTAProps) => {
  const [showroom, setShowroom] = useState({
    title: 'Expert advice',
    handle: '',
  });

  useEffect(() => {
    getIP().then((userLocation) => {
      let matchingLocation = SHOWROOM_LOCATIONS.filter((location) => location.location === userLocation.city)?.[0];

      if (!matchingLocation) {
        // fallbacks based on timezone
        if (userLocation.timezone === 'America/Los_Angeles') {
          matchingLocation = SHOWROOM_LOCATIONS.filter((location) => location.location === 'Los Angeles')?.[0];
        }

        if (userLocation.timezone === 'America/New_York') {
          matchingLocation = SHOWROOM_LOCATIONS.filter((location) => location.location === 'New York')?.[0];
        }

        if (userLocation.timezone === 'America/Chicago') {
          matchingLocation = SHOWROOM_LOCATIONS.filter((location) => location.location === 'Chicago')?.[0];
        }
        // no sf, same timezone as LA
      }

      if (matchingLocation) {
        setShowroom(matchingLocation);
      }
    });
  }, []);

  if (!isCountrySupported(supportedCountries, countryCode)) {
    return null;
  }

  async function getIP() {
    const location = await fetch('https://api.ipify.org?format=json')
      .then((res) => res.json())
      .then(async (response) => {
        const res = await fetch(`${window.location.origin}/api/geolocation/provided-ip`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            ip: response.ip,
          }),
        });

        return await res.json();
      })
      .catch((e) => {
        console.log(e);

        return { city: 'New York', timezone: 'America/New_York' };
      });

    return location;
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
          '-white': textColor === WHITE,
          [additionalClass]: additionalClass,
        })}
      >
        <ShowTabletAndUpOnly>
          <Heading
            type={headingType}
            className={clsx(headingAdditionalClass, 'content__title', 'primary', {
              '-white': textColor === WHITE,
            })}
          >
            {showroom?.title}
          </Heading>
        </ShowTabletAndUpOnly>
        <ShowMobileOnly>
          <Heading
            type={headingType}
            className={clsx(headingAdditionalClass, 'content__title', 'primary', {
              '-white': textColor === WHITE,
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
            {ctaRoute && (
              <UniLink route={`/book-appointment?location=${showroom.handle}`}>
                <Button
                  className={clsx('primary', '-mobile-wide', {
                    [additionalClass]: additionalClass,
                    '-inverse-tabletAndUp': textColor === WHITE,
                  })}
                >
                  <UIString>Book an appointment</UIString>
                </Button>
              </UniLink>
            )}
          </div>
        ) : (
          <>
            <div className="cta -first">
              {ctaRoute && (
                <UniLink route={ctaRoute}>
                  <Button
                    className={clsx('primary', '-mobile-wide', {
                      [additionalClass]: additionalClass,
                      '-inverse-tabletAndUp': textColor === WHITE,
                    })}
                  >
                    <UIString>{ctaCopy}</UIString>
                  </Button>
                </UniLink>
              )}
            </div>

            <div className="cta -last">
              {ctaRoute2 && (
                <UniLink route={ctaRoute2}>
                  <Button
                    className={clsx('primary', '-mobile-wide', {
                      [additionalClass]: additionalClass,
                      '-inverse-tabletAndUp': textColor === WHITE,
                    })}
                  >
                    <UIString>{ctaCopy2}</UIString>
                  </Button>
                </UniLink>
              )}
            </div>
          </>
        )}
      </div>
    </TallHalfWidthBlockLocationCTAContainer>
  );
};

export default TallHalfWidthBlockLocationCTA;

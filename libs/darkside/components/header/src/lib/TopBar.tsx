import { useCartData, useTopBar, useTopBarGWP } from '@diamantaire/darkside/data/hooks';
import { getCurrency, getFormattedPrice } from '@diamantaire/shared/constants';
import { isUserCloseToShowroom } from '@diamantaire/shared/geolocation';
import {
  getCountry,
  isCountrySupported,
  isCurrentTimeWithinInterval,
  replacePlaceholders,
} from '@diamantaire/shared/helpers';
import { XIcon } from '@diamantaire/shared/icons';
import { media } from '@diamantaire/styles/darkside-styles';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import styled from 'styled-components';

type TopBarTypes = {
  setIsTopbarShowing: React.Dispatch<React.SetStateAction<boolean>>;
};

const TopBarContainer = styled.div`
  background-color: var(--color-teal);
  padding: 1rem 0;
  position: relative;
  z-index: 5000;
  min-height: 3.8rem;

  * {
    color: #fff;
  }

  .top-bar__wrapper {
    .slider__wrapper {
      margin: 0 auto;
      display: flex;
      justify-content: center;
      padding: 0 2rem;

      @media (min-width: ${({ theme }) => theme.sizes.small}) {
        max-width: 55rem;
        padding: 0;
      }

      .slides {
        flex: 1;
        text-align: center;
      }
      p {
        margin: 0;
        font-size: 1.3rem;

        ${media.small`font-size: var(--font-size-xxxsmall);`}

        span {
          margin-left: 0.8rem;
        }
      }

      .slider-nav {
        &.disabled {
          opacity: 0.5;
        }
      }

      .arrow-right,
      .arrow-left {
        width: 0;
        height: 0;
        border-left: 0.4rem solid transparent;
        border-right: 0.4rem solid transparent;
        border-bottom: 0.8rem solid var(--color-white);
        display: inline-block;
        transform: rotate(90deg);
      }
      .arrow-left {
        transform: rotate(270deg);
      }
    }
  }

  /* Mandatory slider styles */
  .embla {
    overflow: hidden;
  }
  .embla__container {
    display: flex;
  }
  .embla__slide {
    flex: 0 0 100%;
    min-width: 0;
  }
  .embla__slide p {
    transform: translate(0, 0.1rem);
  }

  .slider-nav {
    button {
      background-color: transparent;
      border: none;
    }
  }

  .close__container {
    transform: scale(0.6);
    position: absolute;
    right: 1rem;
    top: 0.7rem;
    height: 2.4rem;
    width: 2.4rem;

    button {
      padding: 0;
      background-color: transparent;
      border: none;

      svg {
        stroke: #fff;
        stroke-width: 0.1rem;
      }
    }
  }
`;

const TopBar: FC<TopBarTypes> = ({ setIsTopbarShowing }): JSX.Element => {
  const { locale } = useRouter();
  const { data } = useTopBar(locale);
  const { data: gwp } = useTopBarGWP(locale);
  const { data: checkout } = useCartData(locale);

  const showroomLocation = isUserCloseToShowroom();

  const options: any = { loop: true };
  const [emblaRef] = useEmblaCarousel(options, [
    Autoplay({
      delay: 7000,
    }),
  ]);

  const isThereMoreThanOneSlide = data?.announcementBar?.data.length > 1;

  const gwpData = gwp?.allGwpDarksides?.[0]?.tiers?.[0];

  const {
    gwpSupportedCountries,
    minSpendByCurrencyCode,
    promotionDateRangeStart,
    promotionDateRangeEnd,
    announcementBarQualifiedCopy,
    announcementBarNonQualifiedCopy,
    announcementBarNothingInCartCopy,
  } = gwpData || {};

  const countryCode = getCountry(locale);
  const currencyCode = getCurrency(countryCode);

  const minSpendValue = minSpendByCurrencyCode?.[currencyCode]?.toString();
  const isThereOneProduct = checkout?.lines?.length > 0;
  const hasUserQualified = parseFloat(checkout?.cost?.subtotalAmount?.amount) * 100 >= parseFloat(minSpendValue);

  return (
    <TopBarContainer id="top-bar">
      <div className="top-bar__wrapper">
        <div className="slider__wrapper">
          <div className="embla slides" ref={isThereMoreThanOneSlide ? emblaRef : null}>
            <div className="embla__container">
              {data?.announcementBar?.data?.map((slide, index) => {
                const {
                  // link,
                  route,
                  copy: defaultCopy,
                  enableGeoCopy,
                  nonGeoCopy,
                  geoCopy,
                  enableGwp,
                  supportedCountries,
                } = slide || {};

                // confirm if country is supported for slide
                if (
                  !isCountrySupported(supportedCountries, countryCode) ||
                  !isCountrySupported(gwpSupportedCountries, countryCode)
                ) {
                  return null;
                }

                // Skips GWP slide if conditions are not met
                const isWithinTimeframe = isCurrentTimeWithinInterval(promotionDateRangeStart, promotionDateRangeEnd);

                const minSpendValue = minSpendByCurrencyCode?.[currencyCode]?.toString();

                const textVal = !isThereOneProduct
                  ? announcementBarNothingInCartCopy
                  : hasUserQualified
                  ? announcementBarQualifiedCopy
                  : announcementBarNonQualifiedCopy;

                let replacedText = replacePlaceholders(
                  textVal,
                  ['%%GWP_minimum_spend%%'],
                  [getFormattedPrice(parseFloat(minSpendValue), locale).trim()],
                ).toString();

                replacedText = replacePlaceholders(
                  replacedText,
                  ['%%GWP_remaining_spend%%'],
                  [
                    getFormattedPrice(
                      parseFloat(minSpendValue) - parseFloat(checkout?.cost?.subtotalAmount?.amount) * 100,
                      locale,
                    ).trim(),
                  ],
                ).toString();

                if (enableGwp && !isWithinTimeframe) return null;

                return (
                  <div className="embla__slide" key={`top-bar-slide-${index}`}>
                    {enableGwp ? (
                      <p>{replacedText}</p>
                    ) : enableGeoCopy && showroomLocation ? (
                      <p>
                        {/* If there is a location, and the slide has geo on it 🪄 */}
                        <Link href={route}>
                          {replacePlaceholders(geoCopy, ['%%location-name%%'], [showroomLocation?.location])
                            .toString()
                            .trim()}{' '}
                          <span className="arrow-right"></span>
                        </Link>
                      </p>
                    ) : enableGeoCopy ? (
                      <p>{nonGeoCopy}</p>
                    ) : (
                      <p>{defaultCopy}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="close__container">
          <button aria-label="Close Top Bar" onClick={() => setIsTopbarShowing(false)}>
            <XIcon />
          </button>
        </div>
      </div>
    </TopBarContainer>
  );
};

export default TopBar;

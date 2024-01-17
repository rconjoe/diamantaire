import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { VIRTUAL_SHOWROOM } from '@diamantaire/shared/constants';
import { isUserCloseToShowroom } from '@diamantaire/shared/geolocation';
import { replacePlaceholders } from '@diamantaire/shared/helpers';
import { BookCalendarIcon } from '@diamantaire/shared/icons';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { SlideOut } from './SlideOut';

const ProductAppointmentCTAStyles = styled.div`
  margin-top: 1rem;
  .appointment-button {
    &.outline {
      width: 100%;
      height: 4.9rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-white);
      border: 1px solid var(--color-black);
      color: var(--color-black);
      font-size: var(--font-size-xxsmall);
      span {
        flex: 0 0 2.5rem;
        position: relative;
        top: 0.2rem;
        margin-right: 0.2rem;
      }
    }
    &.underline {
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-white);
      border: none;
      color: var(--color-teal);
      text-decoration: underline;
      font-size: var(--font-size-xxsmall);
      font-weight: var(--font-weight-bold);
      span {
        display: none;
      }
    }
    &.with-hidden-button {
      display: none;
    }
  }

  /* Slideout styles */
  iframe {
    min-height: 90vh;
  }

  .appointment-slideout {
    .primary {
      text-align: center;
    }
  }
`;

const ProductAppointmentCTA = ({
  productType,
  withHiddenButton,
  type = 'outline',
}: {
  productType?: string;
  withHiddenButton?: boolean;
  type?: string;
}) => {
  const { locale } = useRouter();
  const { _t } = useTranslations(locale);
  const [isAppointmentSlideoutShowing, setIsAppointmentSlideoutShowing] = useState(false);
  const [ctaTitle, setCtaTitle] = useState(_t(`Book an appointment`));
  const [appointmentLink, setAppointmentLink] = useState(getVirtualFallbackLink(productType, locale));

  // if user isn't near showroom, fallback to virtual showroom
  const showroomLocation = isUserCloseToShowroom() || VIRTUAL_SHOWROOM;

  useEffect(() => {
    const getCtaTitle = ({ productType, location }) => {
      if (location) {
        if (productType === 'Engagement Ring' || productType === 'Wedding Band') {
          return _t(`Discover our rings at VRAI %%location%%`);
        }

        if (
          productType === 'Earrings' ||
          productType === 'Bracelet' ||
          productType === 'Necklace' ||
          productType === 'Ring'
        ) {
          return _t(`Discover our designs at VRAI %%location%%`);
        }

        return _t(`Consult with a diamond expert online`);
      } else {
        // Fallback if no location matched
        if (productType === 'Engagement Ring' || productType === 'Wedding Band') {
          return _t(`Consult with a diamond expert online`);
        }
        if (
          productType === 'Earrings' ||
          productType === 'Bracelet' ||
          productType === 'Necklace' ||
          productType === 'Ring'
        ) {
          _t(`Consult with a diamond expert online`);
        }

        return _t(`Consult with a diamond expert online`);
      }
    };

    let title = getCtaTitle({ productType, location: showroomLocation?.location });

    title = replacePlaceholders(title, ['%%location%%'], [showroomLocation?.location]);

    const appointmentLocationLink = generateAppointmentLink(showroomLocation, productType);

    setAppointmentLink(appointmentLocationLink);

    setCtaTitle(title);
  }, []);

  function generateAppointmentLink(matchingLocation, productType) {
    const fineJewelryTypes = ['Earrings', 'Bracelet', 'Necklace', 'Ring'];
    const { appointmentOptions } = matchingLocation;

    if (fineJewelryTypes.includes(productType)) {
      productType = 'Fine Jewelry';
    }

    if (appointmentOptions && appointmentOptions.length > 0) {
      const matchingOption = appointmentOptions.find((option) => option.productType === productType);

      if (matchingOption) {
        const appointmentId = matchingOption.appointmentId;

        return `https://vrai.as.me/schedule.php?appointmentType=${appointmentId}`;
      }
    }

    // If there's no specific appointment option for the product type in the current location:
    if (matchingLocation !== VIRTUAL_SHOWROOM) {
      // If the location is not the Virtual showroom and there's no matching option, return the virtual appointment link for that product type.
      const virtualMatchingOption = VIRTUAL_SHOWROOM.appointmentOptions.find((option) => option.productType === productType);

      if (virtualMatchingOption) {
        const appointmentId = virtualMatchingOption.appointmentId;

        return `https://vrai.as.me/schedule.php?appointmentType=${appointmentId}`;
      }
    }

    // If all else fails, return a generic virtual appointment link.
    return 'https://vrai.as.me/schedule.php?appointmentType=Virtual';
  }

  function getVirtualFallbackLink(productType, locale) {
    const fineJewelryTypes = ['Earrings', 'Bracelet', 'Necklace', 'Ring'];

    if (fineJewelryTypes.includes(productType)) {
      if (locale === 'es') {
        const esFineJewelryId = VIRTUAL_SHOWROOM.es.appointmentOptions.find(
          (option) => option.productType === 'Fine Jewelry',
        ).appointmentId;

        return `https://vrai.as.me/schedule.php?appointmentType=${esFineJewelryId}`;
      }

      const fineJewelryId = VIRTUAL_SHOWROOM.appointmentOptions.find(
        (option) => option.productType === 'Fine Jewelry',
      ).appointmentId;

      return `https://vrai.as.me/schedule.php?appointmentType=${fineJewelryId}`;
    } else {
      if (locale === 'es') {
        const spanVirtualOption = VIRTUAL_SHOWROOM.es.appointmentOptions.find(
          (option) => option.productType === productType,
        );

        return spanVirtualOption
          ? `https://vrai.as.me/schedule.php?appointmentType=${spanVirtualOption.appointmentId}`
          : null;
      }

      const virtualOption = VIRTUAL_SHOWROOM.appointmentOptions.find((option) => option.productType === productType);

      return virtualOption ? `https://vrai.as.me/schedule.php?appointmentType=${virtualOption.appointmentId}` : null;
    }
  }

  return (
    <ProductAppointmentCTAStyles>
      <button
        className={clsx('appointment-button', type, { 'with-hidden-button': withHiddenButton })}
        onClick={() => setIsAppointmentSlideoutShowing(!isAppointmentSlideoutShowing)}
      >
        <span>
          <BookCalendarIcon />
        </span>
        {ctaTitle}
      </button>

      {isAppointmentSlideoutShowing && (
        <SlideOut
          title="Schedule your appointment"
          className="appointment-slideout"
          onClose={() => setIsAppointmentSlideoutShowing(false)}
          width="30%"
        >
          <iframe src={appointmentLink} title="Schedule Appointment" width="100%" height="450" frameBorder="0"></iframe>
        </SlideOut>
      )}
    </ProductAppointmentCTAStyles>
  );
};

export { ProductAppointmentCTA };

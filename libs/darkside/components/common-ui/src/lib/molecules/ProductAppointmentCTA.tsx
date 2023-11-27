import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { isUserCloseToShowroom } from '@diamantaire/shared/geolocation';
import { replacePlaceholders } from '@diamantaire/shared/helpers';
import { BookCalendarIcon } from '@diamantaire/shared/icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { SlideOut } from './SlideOut';

const ProductAppointmentCTAStyles = styled.div`
  margin-top: 1rem;
  .appointment-button {
    width: 100%;
    height: 4.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f7f7f7;

    span {
      flex: 0 0 2.5rem;
      position: relative;
      top: 0.2rem;
      margin-right: 0.2rem;
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

const ProductAppointmentCTA = ({ productType }: { productType?: string }) => {
  const [isAppointmentSlideoutShowing, setIsAppointmentSlideoutShowing] = useState(false);
  const [ctaTitle, setCtaTitle] = useState('Book an appointment');
  const { locale } = useRouter();

  const { _t } = useTranslations(locale);

  const showroomLocation = isUserCloseToShowroom();

  useEffect(() => {
    const getCtaTitle = ({ productType, location }) => {
      console.log('location', location);
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

        return _t(`Book an appointment`);
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

        return _t(`Book an appointment`);
      }
    };

    let title = getCtaTitle({ productType, location: showroomLocation?.location });

    title = replacePlaceholders(title, ['%%location%%'], [showroomLocation?.location]);

    setCtaTitle(title);
  }, []);

  return (
    <ProductAppointmentCTAStyles>
      <button className="appointment-button" onClick={() => setIsAppointmentSlideoutShowing(!isAppointmentSlideoutShowing)}>
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
          <iframe
            src={`https://app.acuityscheduling.com/schedule.php?owner=17078948`}
            title="Schedule Appointment"
            width="100%"
            height="450"
            frameBorder="0"
          ></iframe>
        </SlideOut>
      )}
    </ProductAppointmentCTAStyles>
  );
};

export { ProductAppointmentCTA };

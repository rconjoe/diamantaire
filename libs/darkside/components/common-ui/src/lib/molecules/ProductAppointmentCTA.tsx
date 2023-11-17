import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { isUserCloseToShowroom } from '@diamantaire/shared/geolocation';
import { replacePlaceholders } from '@diamantaire/shared/helpers';
import { BookCalendarIcon } from '@diamantaire/shared/icons';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

import { SlideOut } from './SlideOut';

const ProductAppointmentCTAStyles = styled.div`
  margin-top: 1rem;
  .appointment-button {
    width: 100%;
    height: 47px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f7f7f7;

    span {
      flex: 0 0 25px;
      position: relative;
      top: 2px;
      margin-right: 2px;
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

const ProductAppointmentCTA = () => {
  const [isAppointmentSlideoutShowing, setIsAppointmentSlideoutShowing] = useState(false);
  const { locale } = useRouter();

  const { _t } = useTranslations(locale);

  const showroomLocation = isUserCloseToShowroom();

  return (
    <ProductAppointmentCTAStyles>
      {/* Lets refine later */}
      <button className="appointment-button" onClick={() => setIsAppointmentSlideoutShowing(!isAppointmentSlideoutShowing)}>
        <span>
          <BookCalendarIcon />
        </span>
        {showroomLocation
          ? replacePlaceholders(
              _t('Visit our %%location%% location'),
              ['%%location%%'],
              [showroomLocation?.location],
            ).toString()
          : _t('Book an appointment')}
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

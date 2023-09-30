import { SlideOut } from '@diamantaire/darkside/components/common-ui';
import { BookCalendarIcon } from '@diamantaire/shared/icons';
import { useState } from 'react';

const ProductAppointmentCTA = () => {
  const [isAppointmentSlideoutShowing, setIsAppointmentSlideoutShowing] = useState(false);

  return (
    <div>
      <h1>Product Appointment CTA</h1>
      <button onClick={() => setIsAppointmentSlideoutShowing(!isAppointmentSlideoutShowing)}>
        <span>
          <BookCalendarIcon />
        </span>
        Visit our New York location
      </button>

      {isAppointmentSlideoutShowing && (
        <SlideOut title="Book an Appointment" onClose={() => setIsAppointmentSlideoutShowing(false)}>
          Weee
        </SlideOut>
      )}
    </div>
  );
};

export { ProductAppointmentCTA };

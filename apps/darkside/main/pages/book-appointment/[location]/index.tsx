import { StandardPage, getServerSideProps as originalGetServerSideProps } from '@diamantaire/darkside/page/standard-pages';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { SHOWROOM_LOCATIONS } from '@diamantaire/shared/constants';
import { getLanguage } from '@diamantaire/shared/helpers';
import { media } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const BookAppointmentStyles = styled.div`
  display: flex;
  flex-direction: column;
  .iframe-container {
    margin: auto;
    width: 100%;
    ${media.medium`max-width: 835px;
    min-width: 80%;`}
    ${media.large` min-height: 1375px;`}
  }
`;
const BookAppointmentPage = (props) => {
  const { location, locale } = props;
  const bookingUrl = getLocationBasedBookingLink(location, locale);

  return (
    <BookAppointmentStyles>
      <StandardPage {...props} />

      {bookingUrl && renderIframe({ src: bookingUrl })}
    </BookAppointmentStyles>
  );
};

const customGetServerSideProps = async (context) => {
  const customContext = {
    ...context,
    params: { ...context.params, pageSlug: 'appointment-booking--darkside' },
  };

  const serverSideProps = await originalGetServerSideProps(customContext);

  return {
    ...serverSideProps,
    props: {
      ...serverSideProps.props,
      pageSlug: 'appointment-booking--darkside',
    },
  };
};

BookAppointmentPage.getTemplate = getStandardTemplate;

export default BookAppointmentPage;
export { customGetServerSideProps as getServerSideProps };

function getLocationBasedBookingLink(location, locale) {
  const acuityBaseUrl = `https://vrai.as.me`;
  const language = getLanguage(locale);

  if (location) {
    if (location === 'virtual-spanish' || (language === 'es' && location === 'virtual')) {
      return `${acuityBaseUrl}/virtual-spanish`;
    }

    const matchingLocation = SHOWROOM_LOCATIONS.find((showroomLocation) => {
      return showroomLocation?.handle?.includes(location);
    });

    if (matchingLocation) {
      return `${acuityBaseUrl}/${matchingLocation.handle}`;
    }
  }

  return `${acuityBaseUrl}`;
}

export function renderIframe({ src }) {
  return (
    <iframe className="iframe-container" key={src} src={src} title="Schedule Appointment" width="100%" height="450"></iframe>
  );
}

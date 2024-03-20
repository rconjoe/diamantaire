import { StandardPage, getStaticProps as originalGetStaticProps } from '@diamantaire/darkside/page/standard-pages';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { ALL_SHOWROOMS } from '@diamantaire/shared/constants';
import { getLanguage } from '@diamantaire/shared/helpers';
import { media } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const BookAppointmentStyles = styled.div`
  display: flex;
  flex-direction: column;
  .content-one-container {
    padding-bottom: 2.5rem;
  }
  .iframe-container {
    display: block;
    margin: auto;
    width: 100%;
    margin-top: -2rem;
    ${media.medium`max-width: 835px;
    min-width: 80%;`}
    ${media.large` min-height: 1375px;`}
    @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
      width: 90%;
    }
  }
  .text-block__wrapper {
    margin-bottom: 0;
  }
`;
const BookAppointmentPage = (props) => {
  const { location, locale } = props;

  if (!location) {
    return null;
  }
  const bookingUrl = getLocationBasedBookingLink(location, locale);

  return (
    <BookAppointmentStyles>
      <StandardPage {...props} />

      {bookingUrl && renderIframe({ src: bookingUrl })}
    </BookAppointmentStyles>
  );
};

const customGetStaticProps = async (context) => {
  const customContext = {
    ...context,
    params: { ...context.params, pageSlug: 'appointment-booking--darkside' },
  };

  const serverSideProps = await originalGetStaticProps(customContext);

  return {
    ...serverSideProps,
    props: {
      ...serverSideProps.props,
      pageSlug: 'appointment-booking--darkside',
    },
  };
};

async function getStaticPaths({ locales }) {
  // Define the locales you want to include
  const includedLocales = ['en-US'];

  // Filter the locales and generate paths
  const paths = ALL_SHOWROOMS.flatMap((showroomLocation) => {
    return locales
      .filter((locale) => includedLocales.includes(locale))
      .map((locale) => ({ locale, params: { location: showroomLocation.handle } }));
  });

  return {
    paths,
    fallback: true,
  };
}

BookAppointmentPage.getTemplate = getStandardTemplate;

export default BookAppointmentPage;
export { customGetStaticProps as getStaticProps, getStaticPaths };

function getLocationBasedBookingLink(location, locale) {
  const acuityBaseUrl = `https://vrai.as.me`;
  const language = getLanguage(locale);

  if (location) {
    if (location === 'virtual-spanish' || (language === 'es' && location === 'virtual')) {
      return `${acuityBaseUrl}/virtual-spanish`;
    }

    const matchingLocation = ALL_SHOWROOMS.find((showroomLocation) => {
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
    <div>
       <iframe className="iframe-container" key={src} src={src} title="Schedule Appointment" width="100%" style={{height: "100vh"}}></iframe>
    </div>
  );
}

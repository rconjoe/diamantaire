import { StandardPage, getStaticProps as originalGetStaticProps } from '@diamantaire/darkside/page/standard-pages';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';

import { renderIframe, BookAppointmentStyles } from './[location]';

const BookAppointmentPage = (props) => {
  const defaultBookingUrl = `https://vrai.as.me`;

  return (
    <BookAppointmentStyles>
      <StandardPage {...props} />
      {defaultBookingUrl && renderIframe({ src: defaultBookingUrl })}
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

BookAppointmentPage.getTemplate = getStandardTemplate;

export default BookAppointmentPage;
export { customGetStaticProps as getStaticProps };

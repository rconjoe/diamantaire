import { StandardPage, getServerSideProps as originalGetServerSideProps } from '@diamantaire/darkside/page/standard-pages';

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

export default StandardPage;
export { customGetServerSideProps as getServerSideProps };

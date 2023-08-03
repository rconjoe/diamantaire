import { PlpPage, createPlpServerSideProps } from '@diamantaire/darkside/page/plp';

export default PlpPage;

const getServerSideProps = createPlpServerSideProps('engagement-rings');

export { getServerSideProps };

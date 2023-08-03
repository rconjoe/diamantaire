import { PlpPage, createPlpServerSideProps } from '@diamantaire/darkside/page/plp';

export default PlpPage;

const getServerSideProps = createPlpServerSideProps('loose-diamonds');

export { getServerSideProps };

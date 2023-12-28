import { PlpPage, createStaticProps, getStaticPaths } from '@diamantaire/darkside/page/plp';

export default PlpPage;

const getStaticProps = createStaticProps('engagement-rings');

export { getStaticProps, getStaticPaths };

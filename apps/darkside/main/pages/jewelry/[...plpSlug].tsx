import { PlpPage, createStaticProps, getStaticPaths } from '@diamantaire/darkside/page/plp';

export default PlpPage;

const getStaticProps = createStaticProps('jewelry');

export { getStaticProps, getStaticPaths };

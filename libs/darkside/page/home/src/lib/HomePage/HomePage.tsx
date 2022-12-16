import styles from './HomePage.module.css';
import { getTemplate } from '@diamantaire/darkside/template/standard';
import Link from 'next/link';

/* eslint-disable-next-line */
export interface HomePageProps {}

const HomePage = (props: HomePageProps) => {
  return (
    <div className={styles['container']}>
      <h1>Welcome to HomePage!</h1>
      <Link href={'/test-page'}>go to /test-page</Link>
    </div>
  );
};

HomePage.getTemplate = getTemplate;

export { HomePage };

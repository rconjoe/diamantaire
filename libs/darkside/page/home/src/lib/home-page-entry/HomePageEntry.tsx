import styles from './HomePageEntry.module.css';
import { getLayout } from '@diamantaire/darkside/layout/standard';

/* eslint-disable-next-line */
export interface HomePageEntryProps {}

const HomePageEntry = (props: HomePageEntryProps) => {
  return (
    <div className={styles['container']}>
      <h1>Welcome to HomePageEntry!</h1>
    </div>
  );
};

HomePageEntry.getLayout = getLayout;

export { HomePageEntry };

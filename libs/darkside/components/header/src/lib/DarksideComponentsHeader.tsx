import styles from './DarksideComponentsHeader.module.css';

/* eslint-disable-next-line */
export interface DarksideComponentsHeaderProps {}

export function DarksideComponentsHeader(props: DarksideComponentsHeaderProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to DarksideComponentsHeader!</h1>
    </div>
  );
}

export default DarksideComponentsHeader;

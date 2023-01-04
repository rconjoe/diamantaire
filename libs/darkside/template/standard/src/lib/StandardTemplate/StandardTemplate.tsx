import { ReactElement, ReactNode, useState } from 'react';
import { getTemplate as getGlobalTemplate } from '@diamantaire/darkside/template/global';
import styles from './StandardTemplate.module.css';

/* eslint-disable-next-line */
export interface StandardTemplateProps {
  children: ReactNode;
}

export function StandardTemplate({ children }: StandardTemplateProps) {
  const [thing, setThing] = useState('default-state');
  const;

  return (
    <div className={styles['container']}>
      ****STANDARD TEMPLATE****
      <h3>{thing}</h3>
      <button onClick={() => setThing('mutated-state')}>MUTATE</button>
      {children}
    </div>
  );
}

export const getTemplate = (page: ReactElement) =>
  getGlobalTemplate(<StandardTemplate>{page}</StandardTemplate>);

export default StandardTemplate;

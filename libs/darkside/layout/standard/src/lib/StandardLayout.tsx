import { ReactElement, ReactNode, useState } from 'react';
import { getLayout as getGlobalLayout } from '@diamantaire/darkside/layout/global';
import styles from './StandardLayout.module.css';

/* eslint-disable-next-line */
export interface StandardLayoutProps {
  children: ReactNode;
}

export function StandardLayout({ children }: StandardLayoutProps) {
  return (
    <div className={styles['container']}>
      ****STANDARD LAYOUT****
      {children}
    </div>
  );
}

export const getLayout = (page: ReactElement) =>
  getGlobalLayout(<StandardLayout>{page}</StandardLayout>);

export default StandardLayout;

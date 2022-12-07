import { ReactElement, ReactNode } from 'react';

export type GlobalLayoutProps = {
  children: ReactNode;
};

export const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  return (
    <div>
      <h1>*********GLOBAL LAYOUT*********</h1>
      {children}
    </div>
  );
};

export const getLayout = (page: ReactElement) => (
  <GlobalLayout>{page}</GlobalLayout>
);

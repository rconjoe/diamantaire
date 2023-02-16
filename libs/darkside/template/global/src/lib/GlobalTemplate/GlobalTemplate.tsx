import { ReactElement, ReactNode } from 'react';

export type GlobalTemplateProps = {
  children: ReactNode;
};

export const GlobalTemplate = ({ children }: GlobalTemplateProps) => {
  return (
    <div>
      <h1>*********GLOBAL TEMPLATE*********</h1>
      {children}
    </div>
  );
};

export const getTemplate = (page: ReactElement) => <GlobalTemplate>{page}</GlobalTemplate>;

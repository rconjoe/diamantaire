import { Footer } from '@diamantaire/darkside/components/footer';
import { Header } from '@diamantaire/darkside/components/header';
import { useHeader, useFooter } from '@diamantaire/darkside/data/hooks';
import { ReactElement, ReactNode } from 'react';

export type GlobalTemplateProps = {
  children: ReactNode;
};

export const GlobalTemplate = ({ children }: GlobalTemplateProps) => {
  const headerData = useHeader('en_US');
  const footerData = useFooter('en_US');

  return (
    <div>
      {headerData?.data && <Header headerData={headerData.data} isHome={false} />}
      {children}
      {footerData?.data && <Footer footerData={footerData?.data} />}
    </div>
  );
};

export const getTemplate = (page: ReactElement) => <GlobalTemplate>{page}</GlobalTemplate>;

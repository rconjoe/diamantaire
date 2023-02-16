import { Footer } from '@diamantaire/darkside/components/footer';
import { Header } from '@diamantaire/darkside/components/header';
import { useFooter, useGlobalContext, useHeader } from '@diamantaire/darkside/data/hooks';
import { getTemplate as getGlobalTemplate } from '@diamantaire/darkside/template/global';
import { ReactElement, ReactNode } from 'react';

/* eslint-disable-next-line */
export interface StandardTemplateProps {
  children: ReactNode;
  headerData?: any;
}

export function StandardTemplate({ children }: StandardTemplateProps) {
  const headerData = useHeader('en_US');
  const footerData = useFooter('en_US');
  const { headerHeight } = useGlobalContext();

  return (
    <>
      {headerData?.data && <Header headerData={headerData.data} isHome={false} />}
      {/* ****STANDARD TEMPLATE**** */}
      <main style={{ paddingTop: headerHeight + 'px' }}>{children}</main>
      {footerData?.data && <Footer footerData={footerData?.data} />}
    </>
  );
}

export const getTemplate = (page: ReactElement) => getGlobalTemplate(<StandardTemplate>{page}</StandardTemplate>);

export default StandardTemplate;

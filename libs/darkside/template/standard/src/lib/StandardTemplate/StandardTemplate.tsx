import { GoogleTagManagerContainer } from '@diamantaire/analytics';
import {
  CookieBanner,
  // EmailPopUp
} from '@diamantaire/darkside/components/common-ui';
import { BuilderProductContextProvider } from '@diamantaire/darkside/context/product-builder';
import { PageLoadProgressBar } from '@diamantaire/darkside/core';
import { getTemplate as getGlobalTemplate } from '@diamantaire/darkside/template/global';
import { ReactElement, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

/* eslint-disable-next-line */
export interface StandardTemplateProps {
  children: ReactNode;
  headerData?: any;
}

export function StandardTemplate({ children }: StandardTemplateProps) {
  /* eslint-disable-next-line */
  return <>{children}</>;
}

export const getTemplate = (page: ReactElement) =>
  getGlobalTemplate(
    <StandardTemplate>
      <BuilderProductContextProvider>
        <GoogleTagManagerContainer />
        <PageLoadProgressBar />
        {page}
        <CookieBanner />
        {/* <EmailPopUp /> */}
        <ToastContainer position="bottom-center" autoClose={10000} />
      </BuilderProductContextProvider>
    </StandardTemplate>,
  );

export default StandardTemplate;

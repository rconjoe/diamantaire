import { Footer } from '@diamantaire/darkside/components/footer';
import { Header } from '@diamantaire/darkside/components/header';
import { useGlobalData } from '@diamantaire/darkside/data/hooks';
import localFont from '@next/font/local';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode, useState } from 'react';
import styled from 'styled-components';

export const vraiFont = localFont({
  variable: '--font-family-main',
  preload: true,
  display: 'block',
  src: [
    {
      path: './futura-pt_light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './futura-pt_book.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './futura-pt_medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './futura-pt_demi.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
});

export const scriptMtFont = localFont({
  variable: '--font-family-script-mt',
  preload: true,
  src: [
    {
      path: './script-mt-bold.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './script-mt-bold.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './script-mt-bold.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
});

// const MainContainer = styled.main`
//   /* Fallback for padding before menu renders - will need to be changed once top bar becomes dynamic */
//   /* min-height: ${({ distanceFromTop }) => (distanceFromTop ? `${distanceFromTop + 1}px` : '7rem')};

//   ${media.medium`
//     padding-top: ${({ distanceFromTop, $isHome }) => ($isHome ? 0 : distanceFromTop ? `${distanceFromTop}px` : '0')};
//     min-height: ${({ distanceFromTop }) => (distanceFromTop ? `${distanceFromTop + 1}px` : '7rem')};
//   `} */
// `;
const MainContainer = styled.main`
  min-height: '7rem';
`;

export type GlobalTemplateProps = {
  children: ReactNode;
};

export const GlobalTemplate = ({ children }) => {
  const router = useRouter();
  const { locale } = router;
  const globalTemplateData = useGlobalData(router.locale);
  const headerData = globalTemplateData.data?.headerNavigationDynamic;
  const footerData = globalTemplateData.data?.footerNavigation;

  const [isTopbarShowing, setIsTopbarShowing] = useState(true);

  const { pathname } = useRouter();
  const isHome = pathname === '/';
  const isBookAppointmentPage = pathname.includes('/book-appointment');

  const storedLocale = typeof window !== 'undefined' && window.localStorage.getItem('locale');

  // If a user comes to the site with a different locale, we want to clear the cart, and reset the locale
  if (locale && storedLocale && storedLocale !== locale) {
    window.localStorage.removeItem('cartId');
    window.localStorage.removeItem('hasTermsConsent');
    window.localStorage.setItem('locale', locale);
  }

  return (
    <div
      id="vrai-site"
      // need for sticky nav
      style={{
        height: 'fit-content',
      }}
      className={`${vraiFont.className} ${vraiFont.variable} ${scriptMtFont.variable}`}
    >
      {headerData && (
        <Header
          headerData={headerData}
          isHome={isHome}
          isTopbarShowing={isTopbarShowing}
          setIsTopbarShowing={setIsTopbarShowing}
        />
      )}

      <MainContainer $isHome={isHome}>{children}</MainContainer>

      {footerData && !isBookAppointmentPage && <Footer footerData={footerData} />}
    </div>
  );
};

export const getTemplate = (page: ReactElement) => <GlobalTemplate>{page}</GlobalTemplate>;

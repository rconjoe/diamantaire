import { Footer } from '@diamantaire/darkside/components/footer';
import { Header } from '@diamantaire/darkside/components/header';
import { WishlistSlideOut } from '@diamantaire/darkside/components/wishlist';
import { useGlobalData } from '@diamantaire/darkside/data/hooks';
import { media } from '@diamantaire/styles/darkside-styles';
import localFont from '@next/font/local';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export const vraiFont = localFont({
  variable: '--font-family-main',
  preload: true,
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

const MainContainer = styled.main`
  /* Fallback for padding before menu renders - will need to be changed once top bar becomes dynamic */
  padding-top: ${({ $isHome }) => ($isHome ? '12.5rem' : '9.5rem')};
  padding-top: ${({ distanceFromTop }) => (distanceFromTop ? `${distanceFromTop}px` : '0')};
  min-height: ${({ distanceFromTop }) => (distanceFromTop ? `${distanceFromTop + 1}px` : '7rem')};

  ${media.medium`
    padding-top: ${({ distanceFromTop }) => (distanceFromTop ? `${distanceFromTop}px` : '0')};
    min-height: ${({ distanceFromTop }) => (distanceFromTop ? `${distanceFromTop + 1}px` : '7rem')};
  `}
`;

export type GlobalTemplateProps = {
  children: ReactNode;
};

export const GlobalTemplate = ({ children }) => {
  const router = useRouter();

  const globalTemplateData = useGlobalData(router.locale);

  const headerData = globalTemplateData.data?.headerNavigationDynamic;

  const footerData = globalTemplateData.data?.footerNavigation;

  const headerRef = useRef<HTMLDivElement | null>(null);

  const [isTopbarShowing, setIsTopbarShowing] = useState(true);

  const [headerHeight, setHeaderHeight] = useState(56);

  const { pathname } = useRouter();

  const isHome = pathname === '/';

  useEffect(() => {
    // Use optional chaining to ensure headerRef.current exists before accessing offsetHeight
    const fullHeaderHeight = headerRef?.current?.offsetHeight || 0;

    setHeaderHeight(fullHeaderHeight);
  }, [isTopbarShowing]);

  useEffect(() => {
    if (!headerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      // Use entries to get the new height
      if (entries[0].target instanceof HTMLElement) {
        const newHeight = entries[0].target.offsetHeight;

        setHeaderHeight(newHeight);

        window.dispatchEvent(
          new CustomEvent('RESET_HEADER_HEIGHT', {
            detail: {
              headerHeight: newHeight,
            },
          }),
        );
      }
    });

    resizeObserver.observe(headerRef.current);

    return () => resizeObserver.disconnect();
  }, [headerData, isTopbarShowing]);

  console.log('global template rendering');

  return (
    <div className={`${vraiFont.className} ${vraiFont.variable}`}>
      {headerData && (
        <Header
          headerData={headerData}
          isHome={isHome}
          headerRef={headerRef as React.MutableRefObject<HTMLDivElement>}
          isTopbarShowing={isTopbarShowing}
          setIsTopbarShowing={setIsTopbarShowing}
          headerHeight={headerHeight}
        />
      )}

      <MainContainer $isHome={isHome} distanceFromTop={isHome ? 0 : headerHeight}>
        {children}
      </MainContainer>

      {footerData && <Footer footerData={footerData} />}

      <WishlistSlideOut />
    </div>
  );
};

export const getTemplate = (page: ReactElement) => <GlobalTemplate>{page}</GlobalTemplate>;

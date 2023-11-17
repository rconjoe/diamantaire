import { Footer } from '@diamantaire/darkside/components/footer';
import { Header } from '@diamantaire/darkside/components/header';
import { useGlobalData } from '@diamantaire/darkside/data/hooks';
import { media } from '@diamantaire/styles/darkside-styles';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode, useEffect, useRef, useState, lazy, Suspense } from 'react';
import styled from 'styled-components';

const MainContainer = styled.main`
  /* This is a fallback for mobile */
  padding-top: ${({ distanceFromTopMobile }) => (!distanceFromTopMobile ? '70px' : distanceFromTopMobile + 'px')};

  ${media.medium`padding-top: ${({ distanceFromTop }) => distanceFromTop + 'px'};`}
`;

export type GlobalTemplateProps = {
  children: ReactNode;
};

const WishlistSlideOut = lazy(() => import('@diamantaire/darkside/components/wishlist/WishlistSlideOut'));

export const GlobalTemplate = ({ children }) => {
  const router = useRouter();

  const globalTemplateData = useGlobalData(router.locale);

  const headerData = globalTemplateData.data?.headerNavigationDynamic;

  const footerData = globalTemplateData.data?.footerNavigation;

  const headerRef = useRef<HTMLDivElement | null>(null);

  const [isTopbarShowing, setIsTopbarShowing] = useState(true);

  const [headerHeight, setHeaderHeight] = useState(0);

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

  return (
    <>
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

      <MainContainer distanceFromTopMobile={headerHeight} distanceFromTop={isHome ? 0 : headerHeight}>
        {children}
      </MainContainer>

      {footerData && <Footer footerData={footerData} />}

      <Suspense>
        <WishlistSlideOut />
      </Suspense>
    </>
  );
};

export const getTemplate = (page: ReactElement) => <GlobalTemplate>{page}</GlobalTemplate>;

import { Footer } from '@diamantaire/darkside/components/footer';
import { Header } from '@diamantaire/darkside/components/header';
import { WishlistSlideOut } from '@diamantaire/darkside/components/wishlist';
import { useGlobalData } from '@diamantaire/darkside/data/hooks';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// const MainContainer = styled.main`
//   padding-top: ${({ distanceFromTopMobile }) => (distanceFromTopMobile ? `${distanceFromTopMobile}px` : '94px')};
//   min-height: ${({ distanceFromTopMobile }) => (distanceFromTopMobile ? `${distanceFromTopMobile + 1}px` : '7rem')};

//   ${media.medium`
//     padding-top: ${({ distanceFromTop }) => (distanceFromTop ? `${distanceFromTop}px` : '94px')};
//     min-height: ${({ distanceFromTop }) => (distanceFromTop ? `${distanceFromTop + 1}px` : '7rem')};
//   `}
// `;

const MainContainer = styled.main`
  padding-top: 56px;
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

  const [headerHeight, setHeaderHeight] = useState(0);

  const { pathname } = useRouter();

  const isHome = pathname === '/';

  useEffect(() => {
    // Use optional chaining to ensure headerRef.current exists before accessing offsetHeight
    const fullHeaderHeight = headerRef?.current?.offsetHeight || 0;

    console.log(`fullHeaderHeight`, fullHeaderHeight);

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

      <MainContainer distanceFromTopMobile={headerHeight || '56px'} distanceFromTop={isHome ? 0 : headerHeight || '56px'}>
        {children}
      </MainContainer>

      {footerData && <Footer footerData={footerData} />}

      <WishlistSlideOut />
    </>
  );
};

export const getTemplate = (page: ReactElement) => <GlobalTemplate>{page}</GlobalTemplate>;

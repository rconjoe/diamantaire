import { useAnalytics } from '@diamantaire/analytics';
import { Cart } from '@diamantaire/darkside/components/cart';
import { CountrySelector, Modal } from '@diamantaire/darkside/components/common-ui';
import { GlobalUpdateContext } from '@diamantaire/darkside/context/global-context';
import { useCartData, useGlobalContext } from '@diamantaire/darkside/data/hooks';
import { countries, languagesByCode, parseValidLocale } from '@diamantaire/shared/constants';
import { isUserCloseToShowroom } from '@diamantaire/shared/geolocation';
import { media } from '@diamantaire/styles/darkside-styles';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useRouter } from 'next/router';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
// import Search from 'components/search/Search';

import CompactHeader from './CompactHeader';
import MegaMenu from './MegaMenu';
import MobileHeader from './MobileHeader';
import StackedHeader from './StackedHeader';
import TopBar from './TopBar';

// TODO: setup proper type
type HeaderProps = {
  headerData?: any;
  isHome: boolean;
  headerHeight: number;
  isTopbarShowing: boolean;
  setIsTopbarShowing: React.Dispatch<React.SetStateAction<boolean>>;
  compactHeaderRef: React.RefObject<HTMLDivElement>;
};

const CompactHeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 5000;
`;

const FullHeaderStyles = styled.header`
  .slide-in-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 5000;
  }
`;

const HeaderWrapper = styled.div`
  z-index: 5000;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--color-white);
  box-shadow: 0 0.1rem 0 var(--color-white);
  /* ${media.medium`${({ $isHome }) => ($isHome ? 'position: static;' : 'position: fixed;')}`} */
`;

const Header: FC<HeaderProps> = ({
  headerData,
  headerHeight,
  isTopbarShowing,
  setIsTopbarShowing,
  compactHeaderRef,
}): JSX.Element => {
  const [isStickyNavShowing, setIsStickyNavShowing] = useState(false);
  const [isCompactMenuVisible, setIsCompactMenuVisible] = useState(true);
  const [isCountrySelectorOpen, setIsCountrySelectorOpen] = useState(false);
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const { cartViewed } = useAnalytics();
  const router = useRouter();
  const { data: checkout } = useCartData(router?.locale);
  const { isCartOpen } = useGlobalContext();
  const updateGlobalContext = useContext(GlobalUpdateContext);
  const { section } = headerData;
  const { scrollY } = useScroll();
  const { countryCode: selectedCountryCode, languageCode: selectedLanguageCode } = parseValidLocale(router.locale);
  const mobileMenuRef = useRef(null);
  const topBarRef = useRef(null);
  const stackedHeaderRef = useRef(null);
  const [megaMenuIndex, setMegaMenuIndex] = useState(-1);
  const [isLoaded, setIsLoaded] = useState(false);
  const isHome = router.pathname === '/';
  const [showroomLocation, setShowroomLocation] = useState(null);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (!isHome) {
      return;
    }
    if (latest > headerHeight * 2) {
      setIsStickyNavShowing(true);
      setIsCompactMenuVisible(true);
      setMegaMenuIndex(-1);
    } else {
      setIsStickyNavShowing(false);
      setIsCompactMenuVisible(false);
      setMegaMenuIndex(-1);
    }
  });

  function toggleMegaMenuOpen(index: number) {
    return setMegaMenuIndex(index);
  }

  function toggleCart() {
    const { id, lines } = checkout || {};
    const cartId = id?.split('/')[2];

    const cartProducts = (lines || []).map((line, index) => {
      const { merchandise } = line || {};
      const { product, sku, price, id } = merchandise || {};
      const { title, availableForSale, featuredImage, productType } = product || {};
      const { url } = featuredImage || {};
      const { amount } = price;
      const variantId = id?.split('/')[3];

      return {
        id: variantId,
        sku,
        name: title,
        price: amount,
        position: index + 1,
        category: productType,
        // url: `https://www.vrai.com/products/${handle}`,
        image_url: url,
        availableForSale,
      };
    });

    cartViewed({
      cart_id: cartId,
      products: cartProducts,
    });

    // return setIsCartOpen(!isCartOpen);
    return updateGlobalContext({
      isCartOpen: !isCartOpen,
    });
  }

  function toggleCountrySelector() {
    return setIsCountrySelectorOpen(!isCountrySelectorOpen);
  }

  function toggleLanguageSelector() {
    return setIsLanguageSelectorOpen(!isLanguageSelectorOpen);
  }

  function toggleMegaMenuClose() {
    return setMegaMenuIndex(-1);
  }

  useEffect(() => {
    setIsLoaded(true);

    if (isHome) {
      setIsCompactMenuVisible(false);
    }

    router.events.on('routeChangeComplete', toggleMegaMenuClose);

    return () => {
      router.events.off('routeChangeComplete', toggleMegaMenuClose);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // entries is an array of observed elements
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is visible in the viewport
            setIsTopBarVisible(true);
          } else {
            setIsTopBarVisible(false);
          }
        });
      },
      {
        root: null, // observing for viewport
        rootMargin: '0px',
        threshold: 0.1, // adjust as per requirement
      },
    );

    if (topBarRef.current) {
      observer.observe(topBarRef.current);
    }

    // Clean up the observer on unmount
    return () => {
      if (topBarRef.current) {
        observer.unobserve(topBarRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const showroomLocationTemp = isUserCloseToShowroom();

    setShowroomLocation(showroomLocationTemp);
  }, []);

  const combinedHeight =
    isHome && isTopBarVisible
      ? stackedHeaderRef?.current?.offsetHeight + topBarRef?.current?.offsetHeight
      : isHome && !isTopBarVisible
      ? headerHeight
      : isTopBarVisible
      ? headerHeight + topBarRef?.current?.offsetHeight
      : headerHeight;

  return (
    <>
      <HeaderWrapper $isHome={isHome} id="primary-navigation--parent" onMouseLeave={() => setMegaMenuIndex(-1)}>
        <FullHeaderStyles id="primary-navigation--stacked" $isHome={isHome}>
          {isTopbarShowing && (
            <div className="top-bar__outer-container" ref={topBarRef}>
              <TopBar setIsTopbarShowing={setIsTopbarShowing} />
            </div>
          )}
          {isHome && (
            <>
              <div ref={stackedHeaderRef}>
                <StackedHeader
                  navItems={section}
                  toggleMegaMenuOpen={toggleMegaMenuOpen}
                  menuIndex={megaMenuIndex}
                  toggleCart={toggleCart}
                  toggleCountrySelector={toggleCountrySelector}
                  toggleLanguageSelector={toggleLanguageSelector}
                  selectedCountry={countries[selectedCountryCode].name}
                  selectedLanguage={languagesByCode[selectedLanguageCode].name}
                  isLanguageSelectorOpen={isLanguageSelectorOpen}
                  showroomLocation={showroomLocation}
                />
              </div>
              <AnimatePresence>
                <motion.div
                  key="slide-in-header"
                  initial={isHome ? 'collapsed' : 'open'}
                  animate={isStickyNavShowing || !isHome ? 'open' : 'collapsed'}
                  exit="collapsed"
                  variants={{
                    open: { y: 0, opacity: 1 },
                    collapsed: { y: -300, opacity: 0 },
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  style={{
                    position: isHome ? 'fixed' : 'sticky',
                    top: 0,
                  }}
                  className="slide-in-header"
                >
                  <div ref={compactHeaderRef}>
                    <CompactHeader
                      ref={compactHeaderRef}
                      navItems={section}
                      toggleMegaMenuOpen={toggleMegaMenuOpen}
                      menuIndex={megaMenuIndex}
                      toggleCart={toggleCart}
                    />
                  </div>
                </motion.div>

                {isHome && isLoaded && (
                  <MegaMenu
                    navItems={section}
                    megaMenuIndex={megaMenuIndex}
                    headerHeight={combinedHeight}
                    isCompactMenuVisible={isCompactMenuVisible}
                  />
                )}
              </AnimatePresence>
            </>
          )}
        </FullHeaderStyles>

        {isCountrySelectorOpen && (
          <Modal title="Please select your location" className="modal--lg" onClose={() => setIsCountrySelectorOpen(false)}>
            <CountrySelector toggleCountrySelector={toggleCountrySelector} />
          </Modal>
        )}
        <AnimatePresence>
          {isCartOpen && (
            <Cart
              closeCart={() =>
                updateGlobalContext({
                  isCartOpen: false,
                })
              }
            />
          )}
        </AnimatePresence>
      </HeaderWrapper>

      {!isHome && (
        <CompactHeaderWrapper onMouseLeave={() => setMegaMenuIndex(-1)}>
          <CompactHeader
            ref={compactHeaderRef}
            navItems={section}
            toggleMegaMenuOpen={toggleMegaMenuOpen}
            menuIndex={megaMenuIndex}
            toggleCart={toggleCart}
          />
          {isLoaded && (
            <MegaMenu
              navItems={section}
              megaMenuIndex={megaMenuIndex}
              headerHeight={combinedHeight}
              isCompactMenuVisible={isCompactMenuVisible}
            />
          )}
        </CompactHeaderWrapper>
      )}

      <MobileHeader
        navItems={section}
        headerHeight={headerHeight}
        toggleCart={toggleCart}
        mobileMenuRef={mobileMenuRef}
        topBarRef={topBarRef}
        isTopBarVisible={isTopBarVisible}
        showroomLocation={showroomLocation}
      />
    </>
  );
};

export { Header };

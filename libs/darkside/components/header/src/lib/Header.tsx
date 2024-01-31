import { useAnalytics } from '@diamantaire/analytics';
import { Cart } from '@diamantaire/darkside/components/cart';
import { CountrySelector, Modal } from '@diamantaire/darkside/components/common-ui';
import { GlobalUpdateContext } from '@diamantaire/darkside/context/global-context';
import { useCartData, useGlobalContext } from '@diamantaire/darkside/data/hooks';
import { countries, languagesByCode, parseValidLocale } from '@diamantaire/shared/constants';
import { isUserCloseToShowroom } from '@diamantaire/shared/geolocation';
import { media } from '@diamantaire/styles/darkside-styles';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
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
  isTopbarShowing: boolean;
  setIsTopbarShowing: React.Dispatch<React.SetStateAction<boolean>>;
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

const Header: FC<HeaderProps> = ({ headerData, isTopbarShowing, setIsTopbarShowing }): JSX.Element => {
  const [isCompactMenuVisible, setIsCompactMenuVisible] = useState(true);
  const [isCountrySelectorOpen, setIsCountrySelectorOpen] = useState(false);
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);

  const { cartViewed } = useAnalytics();
  const router = useRouter();
  const { data: checkout } = useCartData(router?.locale);
  const { isCartOpen } = useGlobalContext();
  const updateGlobalContext = useContext(GlobalUpdateContext);
  const { section } = headerData;

  const { countryCode: selectedCountryCode, languageCode: selectedLanguageCode } = parseValidLocale(router.locale);
  const mobileMenuRef = useRef(null);
  const topBarRef = useRef(null);
  const stackedHeaderRef = useRef(null);
  const [megaMenuIndex, setMegaMenuIndex] = useState(-1);
  const [isLoaded, setIsLoaded] = useState(false);
  const isHome = router.pathname === '/';
  const [showroomLocation, setShowroomLocation] = useState(null);

  const mainHeaderRef = useRef(null); // Ref for the main Header
  const compactHeaderRef = useRef(null); // Ref for the Compact Header

  const [isMainHeaderVisible, setIsMainHeaderVisible] = useState(true); // State to track visibility
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.onChange(() => {
      // Close the MegaMenu when the user starts scrolling
      toggleMegaMenuClose();
    });

    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        setIsMainHeaderVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    if (mainHeaderRef.current) {
      observer.observe(mainHeaderRef.current);
    }

    return () => {
      if (mainHeaderRef.current) {
        observer.unobserve(mainHeaderRef.current);
      }
    };
  }, []);

  const getMegaMenuPosition = () => {
    if (isHome) {
      // On the homepage, position below the main header
      const rect = mainHeaderRef.current?.getBoundingClientRect();
      return (rect?.top || 0) + (rect?.height || 0);
    } else {
      // On non-home pages, calculate position based on visibility of TopBar and CompactHeader
      const topBarRect = topBarRef.current?.getBoundingClientRect();
      const compactHeaderHeight = compactHeaderRef.current?.offsetHeight || 0;

      // Check if TopBar is currently visible in the viewport
      const isTopBarVisible = topBarRect && topBarRect.bottom > 0;

      // Position is just the height of the CompactHeader if TopBar is not visible
      return isTopBarVisible ? topBarRect.height + compactHeaderHeight : compactHeaderHeight;
    }
  };

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
        const [entry] = entries;
        const isHeaderVisible = entry.isIntersecting;

        setIsMainHeaderVisible(isHeaderVisible);

        // Show Compact Header when main Header is not visible and it's the homepage
        if (!isHeaderVisible && isHome) {
          setIsCompactMenuVisible(true);
        } else {
          setIsCompactMenuVisible(false);
        }
      },
      { threshold: 0 },
    );

    const mainHeaderEl = mainHeaderRef.current;

    if (mainHeaderEl) {
      observer.observe(mainHeaderEl);
    }

    return () => {
      if (mainHeaderEl) {
        observer.unobserve(mainHeaderEl);
      }
    };
  }, [isHome]);

  useEffect(() => {
    const showroomLocationTemp = isUserCloseToShowroom();

    setShowroomLocation(showroomLocationTemp);
  }, []);

  const dynamicTop = getMegaMenuPosition();

  return (
    <>
      <HeaderWrapper
        ref={mainHeaderRef}
        $isHome={isHome}
        id="primary-navigation--parent"
        onMouseLeave={() => setMegaMenuIndex(-1)}
      >
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
                  animate={isCompactMenuVisible || !isHome ? 'open' : 'collapsed'}
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
                    isCompactMenuVisible={isCompactMenuVisible}
                    dynamicTop={dynamicTop}
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
              isCompactMenuVisible={isCompactMenuVisible}
              dynamicTop={dynamicTop}
            />
          )}
        </CompactHeaderWrapper>
      )}

      <MobileHeader
        navItems={section}
        toggleCart={toggleCart}
        mobileMenuRef={mobileMenuRef}
        showroomLocation={showroomLocation}
      />
    </>
  );
};

export { Header };

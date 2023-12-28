import { useAnalytics } from '@diamantaire/analytics';
import { Cart } from '@diamantaire/darkside/components/cart';
import { CountrySelector, Modal } from '@diamantaire/darkside/components/common-ui';
import { GlobalUpdateContext } from '@diamantaire/darkside/context/global-context';
import { useCartData, useGlobalContext } from '@diamantaire/darkside/data/hooks';
import { countries, languagesByCode, parseValidLocale } from '@diamantaire/shared/constants';
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
  headerRef: React.RefObject<HTMLDivElement>;
};

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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--color-white);
  box-shadow: 0 0.1rem 0 var(--color-white);
  ${media.medium`${({ $isHome }) => ($isHome ? 'position: static;' : 'position: fixed;')}`}
`;

const Header: FC<HeaderProps> = ({
  headerData,
  headerRef,
  headerHeight,
  isTopbarShowing,
  setIsTopbarShowing,
}): JSX.Element => {
  const [isStickyNavShowing, setIsStickyNavShowing] = useState(false);
  const [isCompactMenuVisible, setIsCompactMenuVisible] = useState(true);
  const [isCountrySelectorOpen, setIsCountrySelectorOpen] = useState(false);
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);

  const { cartViewed } = useAnalytics();
  const router = useRouter();

  const { data: checkout } = useCartData(router?.locale);
  const { isCartOpen } = useGlobalContext();
  const updateGlobalContext = useContext(GlobalUpdateContext);

  const { section } = headerData;
  const { scrollY } = useScroll();
  const { countryCode: selectedCountryCode, languageCode: selectedLanguageCode } = parseValidLocale(router.locale);

  const compactHeaderRef = useRef(null);

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

  const [megaMenuIndex, setMegaMenuIndex] = useState(-1);
  const [isLoaded, setIsLoaded] = useState(false);

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

  const isHome = router.pathname === '/';

  console.log('isHome', isHome);

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

  return (
    <HeaderWrapper $isHome={isHome}>
      <div ref={headerRef} onMouseLeave={() => toggleMegaMenuClose()}>
        <FullHeaderStyles id="primary-navigation--stacked" $isHome={isHome}>
          {isTopbarShowing && <TopBar setIsTopbarShowing={setIsTopbarShowing} />}
          {isHome && (
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
            />
          )}
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
                position: isHome ? 'fixed' : 'relative',
              }}
              className="slide-in-header"
            >
              <div>
                <CompactHeader
                  navItems={section}
                  toggleMegaMenuOpen={toggleMegaMenuOpen}
                  menuIndex={megaMenuIndex}
                  compactHeaderRef={compactHeaderRef}
                  toggleCart={toggleCart}
                />
              </div>
            </motion.div>

            {isLoaded && (
              <MegaMenu
                navItems={section}
                megaMenuIndex={megaMenuIndex}
                headerHeight={headerHeight}
                isCompactMenuVisible={isCompactMenuVisible}
              />
            )}
          </AnimatePresence>
        </FullHeaderStyles>

        {/* {isHome ? (
          <FullHeaderStyles id="primary-navigation--stacked" $isHome={isHome}>
            {isTopbarShowing && <TopBar setIsTopbarShowing={setIsTopbarShowing} />}
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
            />
            <AnimatePresence>
              <motion.div
                key="slide-in-header"
                initial="collapsed"
                animate={isStickyNavShowing ? 'open' : 'collapsed'}
                exit="collapsed"
                variants={{
                  open: { y: 0, opacity: 1 },
                  collapsed: { y: -300, opacity: 0 },
                }}
                transition={{
                  duration: 0.5,
                }}
                className="slide-in-header"
              >
                <div>
                  <CompactHeader
                    navItems={section}
                    toggleMegaMenuOpen={toggleMegaMenuOpen}
                    menuIndex={megaMenuIndex}
                    compactHeaderRef={compactHeaderRef}
                    toggleCart={toggleCart}
                  />
                </div>
              </motion.div>

              {isLoaded && (
                <MegaMenu
                  navItems={section}
                  megaMenuIndex={megaMenuIndex}
                  headerHeight={headerHeight}
                  isCompactMenuVisible={isCompactMenuVisible}
                />
              )}
            </AnimatePresence>
          </FullHeaderStyles>
        ) : (
          <FullHeaderStyles id="primary-navigation--compact" $isHome={isHome}>
            {isTopbarShowing && <TopBar setIsTopbarShowing={setIsTopbarShowing} />}
            <CompactHeader
              navItems={section}
              toggleMegaMenuOpen={toggleMegaMenuOpen}
              menuIndex={megaMenuIndex}
              toggleCart={toggleCart}
            />

            {isLoaded && (
              <MegaMenu
                navItems={section}
                megaMenuIndex={megaMenuIndex}
                headerHeight={headerHeight}
                isCompactMenuVisible={isCompactMenuVisible}
              />
            )}
          </FullHeaderStyles>
        )} */}
        <MobileHeader navItems={section} headerHeight={headerHeight} toggleCart={toggleCart} />
      </div>

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
  );
};

export { Header };

import { media } from '@diamantaire/styles/darkside-styles';
import { useMotionValueEvent, useScroll, motion, AnimatePresence } from 'framer-motion';
import { FC, useEffect, useRef, useState } from 'react';
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
  z-index: 5000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;

  ${media.medium`${({ $isHome }) => ($isHome ? 'position: static;' : 'position: fixed;')}`}

  .slide-in-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 5000;
  }
`;

const Header: FC<HeaderProps> = ({
  headerData,
  isHome = false,
  headerRef,
  headerHeight,
  isTopbarShowing,
  setIsTopbarShowing,
}): JSX.Element => {
  const [isStickyNavShowing, setIsStickyNavShowing] = useState(false);
  const [isCompactMenuVisible, setIsCompactMenuVisible] = useState(true);
  const { section } = headerData.headerNavigationDynamic;
  const { scrollY } = useScroll();

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

  // const [isSearchOpen, setIsSearchOpen] = useState(false);

  function toggleMegaMenuOpen(index: number) {
    return setMegaMenuIndex(index);
  }

  function toggleMegaMenuClose() {
    setMegaMenuIndex(-1);
  }

  useEffect(() => {
    setIsLoaded(true);
    if (isHome) {
      setIsCompactMenuVisible(false);
    }
  }, []);

  return (
    <FullHeaderStyles $isHome={isHome}>
      <div ref={headerRef} onMouseLeave={() => toggleMegaMenuClose()}>
        {isTopbarShowing && <TopBar setIsTopbarShowing={setIsTopbarShowing} />}

        {isHome ? (
          <>
            <StackedHeader navItems={section} toggleMegaMenuOpen={toggleMegaMenuOpen} menuIndex={megaMenuIndex} />

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
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <CompactHeader navItems={section} toggleMegaMenuOpen={toggleMegaMenuOpen} menuIndex={megaMenuIndex} />
        )}

        <MobileHeader navItems={section} headerHeight={headerHeight} />

        {isLoaded && (
          <MegaMenu
            navItems={section}
            megaMenuIndex={megaMenuIndex}
            headerHeight={isCompactMenuVisible ? compactHeaderRef?.current?.offsetHeight : headerHeight}
            isCompactMenuVisible={isCompactMenuVisible}
          />
        )}

        {/* <AnimatePresence>{isSearchOpen && <Search />}</AnimatePresence> */}
      </div>
    </FullHeaderStyles>
  );
};

export { Header };

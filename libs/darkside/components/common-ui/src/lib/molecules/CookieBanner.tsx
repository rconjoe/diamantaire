import { useCookieBanner } from '@diamantaire/darkside/data/hooks';
import { getIsUserInEu, getUserGeo } from '@diamantaire/shared/geolocation';
import { useCookieConsentContext } from '@use-cookie-consent/react';
import { AnimatePresence, motion } from 'framer-motion';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { CheckSquare, DarksideButton, Heading, Markdown } from './';

const CookieBannerStyles = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  color: var(--color-black);
  width: 100%;
  z-index: var(--z-index-modal);

  .container {
    background: var(--color-header-bg);
    border-top: 0.1rem solid var(--color-dark-grey);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: top;
    padding: 2rem 0;
    margin: 0 auto;
    max-width: 144rem;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      flex-direction: row;
      padding: 5rem 0;
    }

    @media (min-width: ${({ theme }) => theme.sizes.xxl}) {
      max-width: 100%;
      padding: 0 10rem;
    }

    @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
      padding: 0;
    }

    a {
      color: var(--color-teal);
    }
  }
  .title {
    font-size: var(--font-size-large);
    font-weight: 400;
    line-height: 1;
  }
  .col {
    margin: 3rem;
  }
  .col-left {
    max-width: 520px;

    @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
      margin: 2.5rem 3rem 2.5rem 3rem;
    }
  }
  .col-right {
    display: flex;
    flex-direction: column;
    @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
      margin: 0 3rem 2.5rem 3rem;

      button {
        font-size: var(--font-size-xxsmall);
      }
    }
  }
  .button-select button {
    font-size: var(--font-size-xxxsmall);
    margin-top: 0.5rem;
  }
  .checkbox-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: var(--font-size-xxxsmall);
    position: relative;
    gap: 1rem;
    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      flex-direction: row;
    }
  }
  .copy {
    margin: 2rem 0 2.5rem !important;

    p {
      @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
        font-size: var(--font-size-xxsmall);
      }
    }
  }
`;

const CookieBanner = () => {
  const router = useRouter();
  const banner = useRef(null);
  const selectedLocale = router.locale;
  const { acceptCookies, consent, acceptAllCookies } = useCookieConsentContext();
  const { data: { cookieBanner: cookieBannerContent } = {} } = useCookieBanner(selectedLocale);

  const {
    text,
    title,
    acceptAllCtaText,
    acceptSelectionCtaText,
    essentialCookiesCategoryName,
    statisticsCookiesCategoryName,
    marketingCookiesCategoryName,
    customerSupportCookiesCategoryName,
  } = cookieBannerContent || {};
  // Initialize the state to manage cookie consent options
  const [cookieConsentOptions, setCookieConsentOptions] = useState({
    statistics: false,
    marketing: false,
    preferences: false,
  });

  const [showBanner, setShowBanner] = useState(false);

  const handleAcceptPrivacy = () => {
    Cookies.set('didAcceptPrivacy', 'true', { expires: 365 });
    setShowBanner(false);
  };

  // Function to update the state when a user selects an option
  const handleOptionClick = (option) => {
    setCookieConsentOptions((prevState) => ({
      ...prevState,
      [option]: !prevState[option], // Toggle the option
    }));
  };

  // Function to accept cookies based on the user's selections
  const handleAcceptSelectedCookieOptions = () => {
    const selectedOptions = Object.fromEntries(Object.entries(cookieConsentOptions).filter(([, selected]) => selected));

    // Call acceptCookies with the selected options
    acceptCookies(selectedOptions);
    handleAcceptPrivacy();
  };

  const handleAcceptAllCookies = () => {
    acceptAllCookies();
    handleAcceptPrivacy();
  };

  useEffect(() => {
    const checkGeoAndDecideOnBanner = () => {
      const geo = getUserGeo();

      if (!geo) {
        setTimeout(() => {
          const retryGeo = getUserGeo();

          if (!retryGeo) {
            return;
          }

          decideOnShowingBanner();
        }, 1000);

        return;
      }

      decideOnShowingBanner();
    };

    const decideOnShowingBanner = () => {
      const isUserInEu = getIsUserInEu();
      const didAcceptPrivacy = Cookies.get('didAcceptPrivacy') === 'true';
      const shouldShowBanner = isUserInEu && !didAcceptPrivacy;

      if (shouldShowBanner) {
        setCookieConsentOptions({
          statistics: consent.statistics || false,
          marketing: consent.marketing || false,
          preferences: consent.preferences || false,
        });
        setShowBanner(true);
      } else {
        setShowBanner(false);
      }
    };

    checkGeoAndDecideOnBanner();
  }, [consent]);

  if (!showBanner) {
    return null;
  }

  return (
    <CookieBannerStyles>
      <AnimatePresence>
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        >
          <div className="container" ref={banner}>
            <div className="col col-left">
              {title && <Heading className="title">{title}</Heading>}
              {text && <Markdown extraClass="copy">{text}</Markdown>}
              <div className="checkbox-container">
                <CheckSquare checkSquareId="chk-essential" checked={true}>
                  {essentialCookiesCategoryName}
                </CheckSquare>

                <CheckSquare
                  checkSquareId="statistics"
                  onCheckSquareClick={() => handleOptionClick('statistics')}
                  checked={cookieConsentOptions.statistics}
                >
                  {statisticsCookiesCategoryName}
                </CheckSquare>

                <CheckSquare
                  checkSquareId="chk-marketing"
                  onCheckSquareClick={() => handleOptionClick('marketing')}
                  checked={cookieConsentOptions.marketing}
                >
                  {marketingCookiesCategoryName}
                </CheckSquare>

                <CheckSquare
                  checkSquareId="chk-customerSupport"
                  onCheckSquareClick={() => handleOptionClick('preferences')}
                  checked={cookieConsentOptions.preferences}
                >
                  {customerSupportCookiesCategoryName}
                </CheckSquare>
              </div>
            </div>
            <div className="col col-right">
              <DarksideButton onClick={handleAcceptAllCookies}>{acceptAllCtaText}</DarksideButton>
              <DarksideButton type="text-underline" className="button-select" onClick={handleAcceptSelectedCookieOptions}>
                {acceptSelectionCtaText}
              </DarksideButton>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </CookieBannerStyles>
  );
};

export { CookieBanner };

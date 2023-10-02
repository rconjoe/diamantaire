import { Markdown, Heading, DarksideButton, CheckSquare } from '@diamantaire/darkside/components/common-ui';
import { useCookieBanner } from '@diamantaire/darkside/data/hooks';
import { HEADER_BACKGROUND, GREY_DARK, NAV_Z_INDEX, BLACK, TEAL, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import { useCookieConsentContext } from '@use-cookie-consent/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const CookieBannerStyles = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${HEADER_BACKGROUND};
  color: ${BLACK};
  width: 100%;
  border-top: 1px solid ${GREY_DARK};
  z-index: ${NAV_Z_INDEX};
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: top;
    padding: 20px 0;
    margin: 0 auto;
    max-width: 1440px;
    ${tabletAndUp(`
      flex-direction: row;
      padding: 50px 0;
    `)}
    a {
      color: ${TEAL};
    }
  }
  .title {
    font-size: var(--font-size-large);
    font-weight: 400;
    line-height: 1;
  }
  .col {
    margin: 30px;
  }
  .col-left {
    max-width: 520px;
  }
  .col-right {
    display: flex;
    flex-direction: column;
  }
  .button-select button {
    font-size: var(--font-size-xxxsmall);
    margin-top: 5px;
  }
  .checkbox-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: var(--font-size-xxxsmall);
    position: relative;
    gap: 10px;
    ${tabletAndUp(`
        flex-direction: row;
    `)}
  }
  .copy {
    margin: 20px 0 25px !important;
  }
`;

const CookieBanner = () => {
  const router = useRouter();
  const selectedLocale = router.locale;
  const { acceptCookies, consent } = useCookieConsentContext();
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
    customerSupport: false,
  });
  const [showBanner, setShowBanner] = useState(false);

  // Function to update the state when a user selects an option
  const handleOptionClick = (option) => {
    setCookieConsentOptions((prevState) => ({
      ...prevState,
      [option]: !prevState[option], // Toggle the option
    }));
  };

  // Function to accept cookies based on the user's selections
  const handleAcceptCookies = () => {
    const selectedOptions = Object.fromEntries(Object.entries(cookieConsentOptions).filter(([, selected]) => selected));

    // Call acceptCookies with the selected options
    acceptCookies(selectedOptions);
    setShowBanner(false);
  };
  const handleAcceptAllCookies = () => {
    acceptCookies({
      statistics: true,
      marketing: true,
      customerSupport: true,
    });
    setShowBanner(false);
  };

  // Use useEffect to update the state with the values from cookies when available
  // TODO: add a check if user is in EU based on middleware geo data
  useEffect(() => {
    if (consent) {
      setCookieConsentOptions({
        statistics: consent.statistics || false,
        marketing: consent.marketing || false,
        customerSupport: consent.customerSupport || false,
      });
    }
  }, [consent]);

  if (!showBanner) {
    return null;
  }

  return (
    <CookieBannerStyles>
      <div className="container">
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
              onCheckSquareClick={() => handleOptionClick('customerSupport')}
              checked={cookieConsentOptions.customerSupport}
            >
              {customerSupportCookiesCategoryName}
            </CheckSquare>
          </div>
        </div>
        <div className="col col-right">
          <DarksideButton onClick={handleAcceptAllCookies}>{acceptAllCtaText}</DarksideButton>
          <DarksideButton type="text-underline" className="button-select" onClick={handleAcceptCookies}>
            {acceptSelectionCtaText}
          </DarksideButton>
        </div>
      </div>
    </CookieBannerStyles>
  );
};

export default CookieBanner;

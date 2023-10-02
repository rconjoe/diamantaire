import { useCookieBanner } from '@diamantaire/darkside/data/hooks';
import { useCookieConsentContext } from '@use-cookie-consent/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const CookieBanner = () => {
  const router = useRouter();
  const selectedLocale = router.locale;
  const { acceptCookies, consent } = useCookieConsentContext();
  const cookieBannerData = useCookieBanner(selectedLocale);
  console.log('cookieBannerData', cookieBannerData);
  // Initialize the state to manage cookie consent options
  const [cookieConsentOptions, setCookieConsentOptions] = useState({
    statistics: false,
    marketing: false,
    customerSupport: false,
  });

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
  };

  // Use useEffect to update the state with the values from cookies when available
  useEffect(() => {
    if (consent) {
      setCookieConsentOptions({
        statistics: consent.statistics || false,
        marketing: consent.marketing || false,
        customerSupport: consent.customerSupport || false,
      });
    }
  }, [consent]);

  return (
    <div style={{ position: 'fixed', bottom: '100px', zIndex: '100' }}>
      <button onClick={handleAcceptCookies}>Accept Selected Cookies</button>
      <button onClick={() => handleOptionClick('statistics')}>
        {cookieConsentOptions.statistics ? 'Deselect Statistics' : 'Select Statistics'}
      </button>
      <button onClick={() => handleOptionClick('marketing')}>
        {cookieConsentOptions.marketing ? 'Deselect Marketing' : 'Select Marketing'}
      </button>
      <button onClick={() => handleOptionClick('customerSupport')}>
        {cookieConsentOptions.customerSupport ? 'Deselect Customer Support' : 'Select Customer Support'}
      </button>
    </div>
  );
};

export default CookieBanner;

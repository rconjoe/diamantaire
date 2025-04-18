import { sendHubspotForm } from '@diamantaire/darkside/data/api';
import { useEmailPopup } from '@diamantaire/darkside/data/hooks';
import { getCurrency, HUBSPOT_EMAIL_POPUP_LISTDATA } from '@diamantaire/shared/constants';
import { getUserCountry, makeCurrency } from '@diamantaire/shared/helpers';
import { media } from '@diamantaire/styles/darkside-styles';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { DarksideButton, DatoImage, Form, FormSchemaType, Heading, Markdown, Modal, UIString } from './';

const EmailPopUpStyles = styled.div`
  .wrapper {
    max-width: 860px !important;
    border-radius: 0 !important;
  }
  .modal-emailpopup-wrapper {
    overflow-y: auto;
    display: flex;
    max-height: 100%;
    max-width: 86rem;
    max-height: 43rem;
    .emailpopup-title {
      font-size: 4rem;
      font-weight: 500 !important;
      line-height: 1;
    }
    .emailpopup-image {
      display: none;
      ${media.medium`display:block;`}
      flex: 0 0 33rem;

      > div {
        height: 100%;
        img {
          height: 100% !important;
        }
      }
    }
    .emailpopup-content {
      flex: 1;
      display: flex;
      align-items: center;

      .emailpopup-content__inner {
        flex: 1;
        margin: 0 auto;
        padding: 20px;
        h2 {
          margin-bottom: 1rem;
        }
        p {
          font-size: 1.6rem;
        }
      }
    }
  }
  .form {
    flex-direction: column;
    .input-container {
      width: 100%;
    }
    .input-opt-in {
      height: 4rem;
    }
    .react-international-phone-country-selector-button {
      height: 100%;
    }
  }
  .button--decline button {
    font-size: var(--font-size-xxxsmall);
    margin-top: 1rem;
  }
`;

const EmailPopUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [formSubmissionResult, setFormSubmissionResult] = useState(null);
  const router = useRouter();

  const { locale, pathname } = router || {};

  const shouldShowEmailPopup = () => {
    // Check if the pop-up should render on this page
    const shouldRenderOnThisPage = getShouldRenderOnThisPage(pathname);

    // Check if the 'email-popup' cookie is set (pop-up was recently closed)
    const isEmailPopupCookieSet = !!Cookies.get('email-popup');

    // Show the pop-up if it should render on this page,
    // and 'email-popup' is not set
    return shouldRenderOnThisPage && !isEmailPopupCookieSet;
  };

  const setupEmailPopup = () => {
    // initializeUserState();
    if (shouldShowEmailPopup()) {
      return setTimeout(openEmailPopup, 30000);
    }
  };

  useEffect(() => {
    if (Cookies.get('email-popup')) return;
    const timeoutId = setupEmailPopup();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const countryCode = getUserCountry();
  const { data: { emailPopup: emailPopUpContent } = {} } = useEmailPopup(locale);
  const {
    title,
    copy,
    copyPrices,
    countrySpecificCopy,
    errorCopy,
    image,
    placeholder1,
    placeholder2,
    // privacyctacopy,
    // privacyctalink,
    submitCopy,
    successCopy,
    // supportedCountries,
    optInCopy,
  } = emailPopUpContent || {};

  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const userTitle = getUserTitle({ title, countryCode, dataPrices: copyPrices?.prices });
  const userCopy = selectCountrySpecificCopy({
    countryCode,
    countrySpecificCopy,
    copy,
  });

  const [isValid, setIsValid] = useState(true);

  const onSubmit = async (e, formState) => {
    e.preventDefault();

    const { email, isConsent, phone } = formState;
    const smsSubscription = phone.length > 0 ? 'Yes' : 'No';
    const smsConsentSource = phone.length > 0 ? 'popup' : '';
    const sendSMS = phone.length > 0 ? 'subscribed' : '';

    if (!isConsent) {
      setIsValid(false);

      return;
    }

    try {
      if (isConsent) {
        await sendHubspotForm({
          email,
          phone,
          listData: HUBSPOT_EMAIL_POPUP_LISTDATA,
          isConsent,
          countryCode,
          locale,
          smsSubscription,
          smsConsentSource,
          sendSMS,
        });
        Cookies.set('email-popup', 'true', { expires: 365 }); //fallback if hubspot not loaded via gtm
        setIsSuccessful(true);
        setFormSubmissionResult(successCopy);
        setTimeout(() => {
          setIsModalOpen(false);
        }, 1000);
      }
    } catch (error) {
      toast.error(errorCopy, {
        autoClose: 3000,
      });

      console.error('Error submitting form data to HubSpot:', error);
    }
  };
  const handleClose = () => {
    setEmailPopupCookies();
    toggleModal();
  };

  const openEmailPopup = () => {
    setIsModalOpen(true);
  };

  const setEmailPopupCookies = () => {
    Cookies.set('email-popup', 'true', { expires: 7 });
  };
  const lowercaseUserCountryCode = countryCode?.toLowerCase();
  const schema: FormSchemaType[] = [
    {
      inputType: 'email',
      name: 'email',
      placeholder: placeholder2,
      required: true,
    },
    {
      inputType: 'phone',
      name: 'phone',
      placeholder: placeholder1,
      defaultCountry: lowercaseUserCountryCode,
      required: false,
    },
  ];

  if (!isModalOpen) return null;

  return (
    <EmailPopUpStyles>
      <Modal title={false} onClose={() => toggleModal()} onCloseIcon={handleClose} className="modal--position-bottom-left">
        <div className="modal-emailpopup-wrapper">
          <div className="emailpopup-image">
            <DatoImage image={image} />
          </div>
          <div className="emailpopup-content">
            <div className="emailpopup-content__inner">
              <Heading type="h2" className={' emailpopup-title -medium'}>
                {userTitle}
              </Heading>
              <Markdown>{userCopy}</Markdown>

              <Form
                onSubmit={onSubmit}
                formGridStyle="single"
                flexDirection="column"
                stackedSubmit={true}
                showOptIn={true}
                ctaCopy={submitCopy}
                optInCopy={optInCopy}
                extraClass="-links-teal -opt-in"
                isValid={isValid}
                setIsValid={setIsValid}
                schema={schema}
                isSuccessful={isSuccessful}
                formSubmissionResult={formSubmissionResult}
              />

              <DarksideButton type="text-underline" onClick={handleClose} colorTheme="teal" className="button--decline">
                <UIString>Decline Offer</UIString>
              </DarksideButton>
            </div>
          </div>
        </div>
      </Modal>
    </EmailPopUpStyles>
  );
};

export { EmailPopUp };

export const selectCountrySpecificCopy = ({ countryCode, countrySpecificCopy, copy }) => {
  if (countrySpecificCopy && Array.isArray(countrySpecificCopy)) {
    const userCopyData = countrySpecificCopy.find((data) => data.countryCode === countryCode);

    if (userCopyData) {
      return userCopyData.copy;
    }
  }

  return copy;
};

/**
 * Parses a string for a currency symbol / value and replace it with a formatted currency value based on
 * the currency provided.  It will parse $,€,£ with and without a space between the symbol and value.
 * It will also replace a placeholder of '%%value%%'.
 * @param {string} str - string which will be parsed
 * @param {string} currencyCode - currency in which the output will be formatted to
 * @param {object} valueMap - map for determining specific currency value
 * @returns {string} - the parsed string with the currency symbol / value replaced with a formatted currency value
 */
export function replaceMoneyByCurrency(str, currencyCode = 'USD', valueMap) {
  if (!valueMap) {
    return str;
  }
  let finalStr = str;
  const currencyValue = str.match(/%%value%%/) || str.match(/[$|€|£]+ ?[0-9]+\.?[0-9]{2}?/);
  const newValue = valueMap[currencyCode];

  if (currencyValue && newValue) {
    const [value] = currencyValue;
    const formatterValue = makeCurrency(newValue, currencyCode === 'EUR' ? 'nl-NL' : 'en-US', currencyCode);

    finalStr = str.replace(value, formatterValue);
  }

  return finalStr;
}

export function getUserTitle({ title = '', countryCode = 'US', dataPrices = [] }) {
  if (typeof title !== 'string') {
    return title;
  }

  const currencyCode = getCurrency(countryCode);

  if (!currencyCode) {
    return title;
  }

  const formattedPrice = dataPrices.find((price) => price.currencyCode === currencyCode);

  if (!formattedPrice) {
    return title;
  }

  const { priceValue } = formattedPrice;

  // Replace the placeholder in the title with the formatted price
  const replacedTitle = replaceMoneyByCurrency(title, currencyCode, {
    [currencyCode]: priceValue * 100,
  });

  return replacedTitle;
}

/**
 * Based on the pathname property of the Router object
 * from the next/router module. This is a blacklist for
 * which pages should not show the email popup.
 *
 * @param {string} pagePathname - The pathname of the current page.
 * @returns {boolean} - Returns true if the popup should render, false otherwise.
 */
export default function getShouldRenderOnThisPage(pagePathname) {
  const blockedPages = [
    '/',
    '/diamonds/inventory',
    '/diamonds',
    '/customize',
    '/account/[accountPageSlug]',
    '/diamonds/results/[diamondType]',
    '/book-appointment',
    // VNO-SITE
    // TODO:
    // '/jewelry/diamond',
    // '/jewelry/summary',
    // DONE
    // '/builderDiamonds',
    // '/builderEngagementRingSummary',
    // '/account/login',
    // '/account/register',
    // '/account/details',
    // '/account/ordersPage',
    // '/account/reset',
    // '/home',
    // '/diamonds',
    // '/cut-for-you-results',
  ];

  return blockedPages.indexOf(pagePathname) === -1;
}

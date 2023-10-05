import { sendHubspotForm } from '@diamantaire/darkside/data/api';
import { useEmailPopup } from '@diamantaire/darkside/data/hooks';
import { getCurrency, HUBSPOT_EMAIL_POPUP_LISTDATA } from '@diamantaire/shared/constants';
import { getIsUserInEu, getUserCountry, makeCurrency } from '@diamantaire/shared/helpers';
import { media } from '@diamantaire/styles/darkside-styles';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { DatoImage, Heading, Modal, Form, Markdown, UIString } from './';

const EmailPopUpStyles = styled.div`
  .wrapper {
    max-width: 860px !important;
    max-height: 500px !important;
  }
  .modal-emailpopup-wrapper {
    overflow-y: auto;
    display: flex;
    max-height: 100%;

    .emailpopup-image {
      display: none;
      ${media.medium`display:block;`}
      flex: 1;

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
        padding: 40px;
        flex: 1;
        max-width: 450px;
        margin: 0 auto;

        h2 {
          margin-bottom: 10px;
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
      height: 40px;
    }
    .react-international-phone-country-selector-button {
      height: 100%;
    }
  }
`;

const EmailPopUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [showOptIn, setShowOptIn] = useState(false);
  const [userCountryCode, setUserCountryCode] = useState(null);
  // showOptIn is true if isUserInEurope is true

  useEffect(() => {
    const isUserInEu = getIsUserInEu();
    const countryCode = getUserCountry();

    if (isUserInEu) {
      setShowOptIn(true);
    }
    if (countryCode) {
      setUserCountryCode(countryCode);
    }
  }, []);

  const router = useRouter();
  const selectedLocale = router.locale;

  const { data: { emailPopup: emailPopUpContent } = {} } = useEmailPopup(selectedLocale);
  const {
    title,
    copy,
    copyPrices,
    countrySpecificCopy,
    // errorCopy,
    image,
    placeholder1,
    placeholder2,
    // privacyctacopy,
    // privacyctalink,
    submitCopy,
    // successCopy,
    // supportedCountries,
    optInCopy,
  } = emailPopUpContent || {};

  console.log({ emailPopUpContent });
  function toggleModal() {
    if (isModalOpen) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  }
  const userTitle = getUserTitle({ title, countryCode: userCountryCode, dataPrices: copyPrices?.prices });
  const userCopy = selectCountrySpecificCopy({
    userCountryCode,
    countrySpecificCopy,
    copy,
  });

  // const [message, setMessage] = useState(null);
  const [isValid, setIsValid] = useState(true);

  const onSubmit = async (e, formState) => {
    e.preventDefault();

    const { email, isConsent } = formState;

    if (showOptIn && !isConsent) {
      setIsValid(false);

      return;
    }

    try {
      if (!showOptIn || (showOptIn && isConsent)) {
        const response = await sendHubspotForm({
          email,
          listData: HUBSPOT_EMAIL_POPUP_LISTDATA,
          isConsent,
          countryCode: userCountryCode,
          locale: selectedLocale,
        });

        // setMessage(response.inlineMessage);
      }
    } catch (error) {
      console.error('Error submitting form data to HubSpot:', error);
    }
  };

  const lowercaseUserCountryCode = userCountryCode?.toLowerCase();
  const schema = [
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
    },
  ];

  if (isModalOpen) {
    return (
      <EmailPopUpStyles>
        <Modal title={false} onClose={() => toggleModal()} className="modal--position-bottom-left">
          <div className="modal-emailpopup-wrapper">
            <div className="emailpopup-image">
              <DatoImage image={image} />
            </div>
            <div className="emailpopup-content">
              <div className="emailpopup-content__inner">
                <Heading type="h2" className="h1 primary">
                  {userTitle}
                </Heading>
                <Markdown>{userCopy}</Markdown>
                {userCountryCode ? (
                  <Form
                    onSubmit={onSubmit}
                    formGridStyle="single"
                    stackedSubmit={true}
                    showOptIn={showOptIn}
                    ctaCopy={submitCopy}
                    optInCopy={optInCopy}
                    extraClass="-links-teal -opt-in"
                    isValid={isValid}
                    setIsValid={setIsValid}
                    schema={schema}
                  />
                ) : null}
                <UIString>Decline Offer</UIString>
              </div>
            </div>
          </div>
        </Modal>
      </EmailPopUpStyles>
    );
  }

  return;
};

export { EmailPopUp };

export const selectCountrySpecificCopy = ({ userCountryCode, countrySpecificCopy, copy }) => {
  if (countrySpecificCopy && Array.isArray(countrySpecificCopy)) {
    const userCopyData = countrySpecificCopy.find((data) => data.countryCode === userCountryCode);

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

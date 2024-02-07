import { sendHubspotForm } from '@diamantaire/darkside/data/api';
import { useTranslations, useEmailPopup, useGlobalData } from '@diamantaire/darkside/data/hooks';
import { HUBSPOT_NEED_TIME_TO_THINK_LISTDATA, VO_ROOT_URL, DEFAULT_LOCALE } from '@diamantaire/shared/constants';
import { getIsUserInEu } from '@diamantaire/shared/geolocation';
import { getCountry } from '@diamantaire/shared/helpers';
import * as EmailValidator from 'email-validator';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { Form } from './';

const NeedTimeToThinkFormStyles = styled.div<{ isUserInEu?: boolean }>`
  h4 {
    font-size: 2rem;
  }

  .form {
    ${(props) => (props.isUserInEu ? `padding: 0 0 3.5rem;` : '')}
    position: relative;
  }

  .input-opt-in {
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

const NeedTimeToThinkForm = ({ productData }) => {
  const router = useRouter();
  const isUserInEu = getIsUserInEu();
  const [valid, setValid] = useState(true);
  const { locale, asPath } = router || {};
  const globalTemplateData = useGlobalData(locale);
  const footerData = globalTemplateData.data?.footerNavigation;
  const { optInCopy = '' } = footerData.emailSignUpCopy[0] as { optInCopy?: string };
  const [pageTitle, setPageTitle] = useState('VRAI: Engagement Rings & Jewelry | Sustainable Diamonds');
  const countryCode = getCountry(locale);
  const { data: { emailPopup: emailPopUpContent } = {} } = useEmailPopup(locale);
  const { errorCopy, successCopy } = emailPopUpContent || {};
  const { _t } = useTranslations(locale);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [formSubmissionResult, setFormSubmissionResult] = useState('');
  const {
    cms: {
      image: { src: productImage },
    },
  } = productData || { cms: { image: { src: '' } } };

  const getCurrentUrl = () => {
    const localeSubdir = locale !== DEFAULT_LOCALE ? `/${locale}` : '';

    return `${VO_ROOT_URL}${localeSubdir}${asPath}`;
  };

  const handleSubmit = async (e, formState) => {
    e.preventDefault();

    if (!valid) {
      setGdprError(true);

      return;
    }

    const { email, isConsent = true } = formState;

    if (!EmailValidator.validate(email)) {
      toast.error(_t('Please enter a valid email address.'), {
        autoClose: 3000,
      });

      setIsSuccessful(false);

      return;
    }

    try {
      await sendHubspotForm({
        email,
        listData: HUBSPOT_NEED_TIME_TO_THINK_LISTDATA,
        isConsent,
        locale,
        productImageUrl: getCurrentUrl(),
        productImage,
        countryCode,
        pageTitle,
      });
      setIsSuccessful(true);
      setFormSubmissionResult(successCopy);
    } catch (error) {
      setIsSuccessful(false);
      toast.error(errorCopy, {
        autoClose: 3000,
      });

      console.error('Error submitting form data to HubSpot:', error);
    }
  };

  useEffect(() => {
    // Set the page title from document.title on the client side
    setPageTitle(document.title);
  }, []);

  return (
    <NeedTimeToThinkFormStyles isUserInEu={isUserInEu}>
      <Form
        title={_t('Need more time to think?')}
        onSubmit={handleSubmit}
        ctaCopy={_t('Submit')}
        isSuccessful={isSuccessful}
        formSubmissionResult={formSubmissionResult}
        showOptIn={isUserInEu}
        optInCopy={optInCopy}
        isValid={isValid}
        setIsValid={setValid}
      />
    </NeedTimeToThinkFormStyles>
  );
};

export { NeedTimeToThinkForm };

import { sendHubspotForm } from '@diamantaire/darkside/data/api';
import { useTranslations, useEmailPopup } from '@diamantaire/darkside/data/hooks';
import { HUBSPOT_NEED_TIME_TO_THINK_LISTDATA, VO_ROOT_URL, DEFAULT_LOCALE } from '@diamantaire/shared/constants';
import { getCountry } from '@diamantaire/shared/helpers';
import * as EmailValidator from 'email-validator';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Form } from './';

const NeedTimeToThinkForm = ({ productData }) => {
  const [pageTitle, setPageTitle] = useState('VRAI: Engagement Rings & Jewelry | Sustainable Diamonds');

  useEffect(() => {
    // Set the page title from document.title on the client side
    setPageTitle(document.title);
  }, []);

  const router = useRouter();
  const { locale, asPath } = router || {};
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

    const { email, isConsent = true } = formState;

    if (!EmailValidator.validate(email)) {
      setFormSubmissionResult(_t('Please enter a valid email address.'));
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
      setFormSubmissionResult(errorCopy);
      console.error('Error submitting form data to HubSpot:', error);
    }
  };

  return (
    <Form
      title={_t('Need more time to think?')}
      onSubmit={handleSubmit}
      ctaCopy={_t('Submit')}
      isSuccessful={isSuccessful}
      formSubmissionResult={formSubmissionResult}
    />
  );
};

export { NeedTimeToThinkForm };

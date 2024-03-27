import { Form, FormSchemaType, Heading, Loader } from '@diamantaire/darkside/components/common-ui';
import { sendHubspotForm } from '@diamantaire/darkside/data/api';
import { useTranslations, useEmailPopup } from '@diamantaire/darkside/data/hooks';
import { HUBSPOT_CONTENT_BLOCK_LIST } from '@diamantaire/shared/constants';
import { getIsUserInUs } from '@diamantaire/shared/geolocation';
import { isCountrySupported, getUserCountry } from '@diamantaire/shared/helpers';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { ModularEmailSignupBlockContainer } from './ModularEmailSignup.style';

type ModularEmailSignupBlockProps = {
  title?: string;
  copy?: string;
  listData?: object;
  shouldLazyLoad?: boolean;
  enableStackedView?: boolean;
  countryCode: string;
  headingType?: string;
  headingAdditionalClass?: string;
  additionalClass?: string;
  enablePhoneField?: boolean;
  supportedCountries: Array<{
    code: string;
  }>;
  ctaCopy?: string;
  optInCopy?: string;
  emailList?: object;
};

const ModularEmailSignupBlock = ({
  title,
  copy,
  listData: defaultListData = HUBSPOT_CONTENT_BLOCK_LIST,
  ctaCopy,
  //optInCopy = 'Opt me in',
  // enablePhoneFieldTitle,
  //   enableStackedView,
  enablePhoneField,
  supportedCountries,
  // countryCode,
  additionalClass,
  headingType,
  headingAdditionalClass,
  emailList,
}: ModularEmailSignupBlockProps) => {
  const [loading, setLoading] = useState(false);
  const [showOptIn, setShowOptIn] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [formSubmissionResult, setFormSubmissionResult] = useState(null);
  const [phoneInputCountry, setPhoneInputCountry] = useState(null);

  const router = useRouter();

  const { locale } = router || {};

  const countryCode = getUserCountry();

  // Using translated email popup content
  // TODO: Should we create a generic dato email content model
  const { data: { emailPopup: emailPopUpContent } = {} } = useEmailPopup(locale);
  const { errorCopy, successCopy, optInCopy } = emailPopUpContent || {};
  const listData = { ...defaultListData, ...emailList };

  useEffect(() => {
    const initializeData = async () => {
      // Fetch user country
      const userCountry = await getUserCountry();

      setPhoneInputCountry(userCountry.toLowerCase());

      // Determine if user is in the US
      const isUserInUs = getIsUserInUs();

      setShowOptIn(!isUserInUs);

      setLoading(false);
    };

    initializeData();
  }, []);

  const onSubmit = async (e, formState) => {
    e.preventDefault();

    const { email, isConsent } = formState;

    if (showOptIn && !isConsent) {
      setIsValid(false);

      return;
    }

    try {
      if (!showOptIn || (showOptIn && isConsent)) {
        await sendHubspotForm({ email, listData, isConsent, countryCode, locale });

        setIsSuccessful(true);
        setFormSubmissionResult(successCopy);
      }
    } catch (error) {
      toast.error(errorCopy, {
        autoClose: 3000,
      });
      console.error('Error submitting form data to HubSpot:', error);
    }
  };

  const { _t } = useTranslations(locale);

  // If country is not supported, do not render
  if (!isCountrySupported(supportedCountries, countryCode)) {
    return null;
  }

  const formSchema: FormSchemaType[] = [
    {
      name: 'email',
      inputType: 'email',
      defaultValue: '',
      placeholder: _t('Enter your email'),
    },
  ];

  if (enablePhoneField && phoneInputCountry) {
    formSchema.push({
      name: 'phone',
      inputType: 'phone',
      defaultValue: '',
      placeholder: _t('Enter your phone number'),
      defaultCountry: phoneInputCountry,
      required: false,
    });
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <ModularEmailSignupBlockContainer className={additionalClass}>
      <div className="email-signup__wrapper">
        <div className={clsx('email-signup__section-title', additionalClass)}>
          {title && (
            <Heading
              type={headingType ? headingType : 'h2'}
              className={clsx('email-signup__title primary', headingAdditionalClass ? headingAdditionalClass : 'h1')}
            >
              {title}
            </Heading>
          )}
          {title && copy && <p className={clsx('email-signup__subtitle')}>{copy}</p>}
        </div>
      </div>
      <div className="email-signup__form-container">
        <div className="email-signup__form-wrapper">
          <Form
            formGridStyle="single"
            flexDirection="column"
            schema={formSchema}
            onSubmit={onSubmit}
            showOptIn={showOptIn}
            ctaCopy={ctaCopy}
            optInCopy={optInCopy}
            isValid={isValid}
            setIsValid={setIsValid}
            extraClass="-modular-block"
            stackedSubmit={true}
            isSuccessful={isSuccessful}
            formSubmissionResult={formSubmissionResult}
          />
        </div>
      </div>
    </ModularEmailSignupBlockContainer>
  );
};

ModularEmailSignupBlock.defaultProps = {
  listData: HUBSPOT_CONTENT_BLOCK_LIST,
};

export default ModularEmailSignupBlock;

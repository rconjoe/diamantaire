import { Form, FormSchemaType, Heading, Loader } from '@diamantaire/darkside/components/common-ui';
import { sendHubspotForm } from '@diamantaire/darkside/data/api';
import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { HUBSPOT_CONTENT_BLOCK_LIST } from '@diamantaire/shared/constants';
import { getIsUserInUs } from '@diamantaire/shared/geolocation';
import { isCountrySupported, getUserCountry } from '@diamantaire/shared/helpers';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
};

const ModularEmailSignupBlock = ({
  title,
  copy,
  listData = HUBSPOT_CONTENT_BLOCK_LIST,
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
}: ModularEmailSignupBlockProps) => {
  const [loading, setLoading] = useState(false);
  const [showOptIn, setShowOptIn] = useState(false);
  const [message, setMessage] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const countryCode = getUserCountry();

  useEffect(() => {
    const isUserInUs = getIsUserInUs();

    setShowOptIn(!isUserInUs);
    setLoading(false);
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
        const response = await sendHubspotForm({ email, listData, isConsent, countryCode, locale });

        setMessage(response.inlineMessage);
      }
    } catch (error) {
      console.error('Error submitting form data to HubSpot:', error);
    }
  };
  const { locale } = useRouter();
  const { _t } = useTranslations(locale);

  // If country is not supported, do not render
  if (!isCountrySupported(supportedCountries, countryCode)) {
    return null;
  }
  const lowercaseUserCountryCode = countryCode?.toLowerCase();
  const optInCopy = _t('optInCopy');
  const formSchema: FormSchemaType[] = [
    {
      name: 'email',
      inputType: 'email',
      defaultValue: '',
      placeholder: _t('Enter your email'),
    },
  ];

  if (enablePhoneField) {
    formSchema.push({
      name: 'phone',
      inputType: 'phone',
      defaultValue: '',
      placeholder: _t('Enter your phone number'),
      defaultCountry: lowercaseUserCountryCode,
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
          {message ? (
            <div dangerouslySetInnerHTML={{ __html: message }}></div>
          ) : (
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
            />
          )}
        </div>
      </div>
    </ModularEmailSignupBlockContainer>
  );
};

ModularEmailSignupBlock.defaultProps = {
  listData: HUBSPOT_CONTENT_BLOCK_LIST,
};

export default ModularEmailSignupBlock;

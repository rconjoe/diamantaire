import { Form, FormSchemaType, Heading } from '@diamantaire/darkside/components/common-ui';
import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { isCountrySupported } from '@diamantaire/shared/helpers';
import clsx from 'clsx';
import { useRouter } from 'next/router';

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
};

const ModularEmailSignupBlock = ({
  title,
  copy,
  //   listData,
  //   ctaCopy,
  // enablePhoneFieldTitle,
  //   enableStackedView,
  enablePhoneField,
  supportedCountries,
  countryCode,
  additionalClass,
  headingType,
  headingAdditionalClass,
}: ModularEmailSignupBlockProps) => {
  const { locale } = useRouter();
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

  if (enablePhoneField) {
    formSchema.push({
      name: 'phone',
      inputType: 'phone',
      defaultValue: '',
      placeholder: _t('Enter your phone number'),
    });
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
            flexDirection={formSchema?.length > 1 ? 'column' : 'row'}
            schema={formSchema}
            onSubmit={(e) => e.preventDefault()}
          />
        </div>
      </div>
    </ModularEmailSignupBlockContainer>
  );
};

export default ModularEmailSignupBlock;

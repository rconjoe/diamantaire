import { Heading } from '@diamantaire/darkside/components/common-ui';
import { isCountrySupported } from '@diamantaire/shared/helpers';
import clsx from 'clsx';

import { ModularEmailSignupBlockContainer } from './ModularEmailSignup.style';

type ModularEmailSignupBlock = {
  title?: string;
  copy?: string;
  listData?: object;
  shouldLazyLoad?: boolean;
  enableStackedView?: boolean;
  countryCode: string;
  headingType?: string;
  headingAdditionalClass?: string;
  additionalClass?: string;
  supportedCountries: Array<{
    code: string;
  }>;
};

const ModularEmailSignupBlock = ({
  title,
  copy,
  //   listData,
  //   ctaCopy,
  //   enablePhoneField,
  //   enablePhoneFieldTitle,
  //   enableStackedView,
  supportedCountries,
  countryCode,
  additionalClass,
  headingType,
  headingAdditionalClass,
}: ModularEmailSignupBlock) => {
  // If country is not supported, do not render
  if (!isCountrySupported(supportedCountries, countryCode)) {
    return null;
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
          FORM
          {/* <HubspotEmailForm
            ctaCopy={ctaCopy}
            listData={listData}
            gtmLabel={EMAIL_FORM_GTM_LABELS.contentBlockMailingList}
            shouldIncludePhoneField={enablePhoneField}
            shouldIncludePhoneFieldTitle={enablePhoneFieldTitle}
            emailFormType={enableStackedView ? 'stacked' : null}
          /> */}
        </div>
      </div>
    </ModularEmailSignupBlockContainer>
  );
};

export default ModularEmailSignupBlock;

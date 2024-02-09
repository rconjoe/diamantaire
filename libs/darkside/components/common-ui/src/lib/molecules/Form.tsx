/*

This is the master form component, we should never need to manually create a customer facing form that doesn't use this

*/

import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { allCountries } from '@diamantaire/shared/constants';
import { getIsUserInUs } from '@diamantaire/shared/geolocation';
import clsx from 'clsx';
import { Provinces } from 'country-and-province';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import Select from 'react-select';
import styled from 'styled-components';

import { DarksideButton } from './DarksideButton';
import { Heading } from './Heading';
import { Markdown } from './Markdown';

import 'react-international-phone/style.css';

type FormProps = {
  headingType?: 'h1' | 'h2' | 'h3' | 'h4';
  onSubmit?: (e: React.SyntheticEvent, formState: object) => void;
  caption?: string;
  id?: string;
  title?: string;
  schema?: FormSchemaType[];
  formGridStyle?: 'single' | 'split';
  stackedSubmit?: boolean;
  formState?: object;
  setFormState?: (state: object) => void;
  showOptIn?: boolean;
  ctaCopy?: string;
  optInCopy?: string;
  extraClass?: string;
  setIsValid?: (state: boolean) => void;
  gridStyle?: 'single' | 'split';
  emailPlaceholderText?: string;
  flexDirection?: 'column' | 'row';
  isSuccessful?: boolean;
  formSubmissionResult?: string;
  isValid?: boolean;
};

type FormStateType = {
  id?: number;
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  address1?: string;
  address2?: string;
  city?: string;
  zip?: string;
  country_code?: {
    label: string;
    value: string;
  };
  province_code?: {
    label?: string;
    value: string;
  };
  isConsent?: boolean;
};

type InputType =
  | 'hidden'
  | 'text'
  | 'textarea'
  | 'phone'
  | 'number'
  | 'country-dropdown'
  | 'state-dropdown'
  | 'email'
  | 'password';

export type FormSchemaType = {
  name: string;
  placeholder?: string;
  inputType?: InputType;
  defaultValue?: string;
  required?: boolean;
  defaultCountry?: string;
};

const FormContainer = styled.div<{
  flexDirection?: string;
  gridStyle?: string;
  stackedSubmit?: boolean;
  fieldsLength: number;
  extraClass?: string;
}>`
  p {
    margin-top: calc(var(--gutter) / 20);
    font-size: var(--font-size-xxsmall);
  }

  .form {
    display: flex;
    margin-top: 1rem;
    flex-direction: ${({ flexDirection }) => (flexDirection ? flexDirection : 'row')};

    .input-container {
      display: flex;
      flex-wrap: ${({ stackedSubmit }) => (stackedSubmit ? 'wrap' : 'nowrap')};
      margin-bottom: ${({ fieldsLength }) => (fieldsLength === 1 ? 0 : ` 1rem;`)};
      flex: 1;

      &.submit {
        margin-bottom: 0px;
        flex: 0.5;
      }

      > * {
        flex: 1;
      }

      label {
        font-weight: bold;
      }

      * {
        font-size: var(--font-size-xxsmall);
      }

      input {
        border: 0.1rem solid #ccc;
        height: 4.5rem;
        padding-left: 1rem;
        font-size: var(--font-size-xxsmall);
        width: 100%;
      }

      .dropdown__single-value {
        font-size: var(--font-size-xxsmall);
        color: #000;
      }

      .dropdown__option {
        font-size: var(--font-size-xxsmall);
        color: #000;
      }

      .react-international-phone-country-selector-button {
        height: 100%;
      }
    }
  }

  .input-opt-in {
    width: 100%;
    position: relative;

    input[type='checkbox'] {
      cursor: pointer;
      width: 1.3rem;
      height: 1.3rem;
      appearance: none;
      background-color: #fff;
      margin: 0;
      font: inherit;
      color: currentColor;
      border: 0.1rem solid currentColor;
    }

    input[type='checkbox']::before {
      display: block;
      content: '';
      width: 100%;
      height: 100%;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1.3rem 1.3rem currentColor;
    }

    input[type='checkbox']:checked {
      &::before {
        transform: scale(1);
      }

      &::after {
        content: '';
        display: inline-block;
        position: absolute;
        height: 6px;
        width: 11px;
        border-left: 1.75px solid;
        border-bottom: 1.75px solid;
        transform: rotate(-45deg);
        border-color: white;
        left: 1px;
        top: 8px;
      }
    }

    &.-error {
      color: red;
      a {
        color: red;
      }
    }
  }

  ${({ extraClass }) =>
    extraClass === '-modular-block' &&
    `
     .input-opt-in {
      text-align:left;
     }
      `}
`;

const Form = ({
  onSubmit,
  title,
  caption,
  schema,
  id,
  formGridStyle = 'single',
  stackedSubmit = true,
  showOptIn,
  ctaCopy = 'Submit',
  optInCopy,
  extraClass,
  setIsValid,
  emailPlaceholderText = 'Enter your email',
  headingType = 'h4',
  flexDirection,
  isSuccessful,
  formSubmissionResult,
  isValid,
}: FormProps) => {
  const { locale } = useRouter();

  const { _t } = useTranslations(locale);

  const initialCountryCode = schema?.find((v) => v.inputType === 'country-dropdown')?.defaultValue || null;

  const initialRegionCode = schema?.find((v) => v.inputType === 'state-dropdown')?.defaultValue || null;

  const [allRegions, setAllRegions] = useState(initialCountryCode ? getRegions(initialCountryCode) : []);
  const isUserInUs = getIsUserInUs();
  const initialFormState = { isConsent: isUserInUs };
  const showGdprError = showOptIn && !isValid;

  schema?.forEach((field) => {
    if (field.inputType === 'state-dropdown') {
      initialFormState[field.name] = null;
    } else if (field.inputType === 'country-dropdown') {
      initialFormState[field.name] = allCountries.find((country) => country.value === field.defaultValue) || null;
    } else {
      initialFormState[field.name] = field.defaultValue || '';
    }
  });

  const [formState, setFormState] = useState<FormStateType>(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    const regions = getRegions(formState.country_code);

    setAllRegions(regions);

    setFormState((prevState) => ({
      ...prevState,
      province_code:
        regions.find((region) => region.value === (prevState?.province_code?.value || initialRegionCode)) || null,
    }));
  }, [formState?.country_code]);

  return (
    <FormContainer
      gridStyle={formGridStyle}
      stackedSubmit={stackedSubmit}
      flexDirection={flexDirection}
      fieldsLength={schema?.length | 1}
      extraClass={extraClass}
    >
      {title && (
        <Heading type={headingType} className="primary">
          {title}
        </Heading>
      )}
      {caption && <p className="small">{caption}</p>}
      <form onSubmit={(e) => onSubmit(e, formState)}>
        <div className="form">
          {!schema ? (
            <div className="input-container">
              <input
                type="email"
                name="email"
                id="email"
                placeholder={_t(emailPlaceholderText)}
                pattern="^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$"
                required
                onChange={(e) => {
                  const { name, value } = e.target;

                  setFormState((prevState) => ({ ...prevState, [name]: value }));
                }}
              />
            </div>
          ) : (
            schema?.map((field, index) => {
              const { inputType, required, placeholder, name, defaultCountry } = field || {};

              if (inputType === 'text') {
                return (
                  <div className="input-container" key={`${id}-${index}`}>
                    <input
                      type="text"
                      required={required}
                      name={name}
                      value={formState?.[name]}
                      placeholder={placeholder}
                      onChange={handleInputChange}
                    />
                  </div>
                );
              } else if (inputType === 'email') {
                return (
                  <div className="input-container" key={`${id}-${index}`}>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder={placeholder}
                      pattern="^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$"
                      required
                      value={formState?.[name]}
                      onChange={handleInputChange}
                    />
                  </div>
                );
              } else if (inputType === 'phone') {
                return (
                  <div className="input-container" key={`${id}-${index}`}>
                    <PhoneInput
                      value={formState?.[name]}
                      placeholder={placeholder}
                      onChange={(selectedPhone) => {
                        setFormState({ ...formState, [name]: selectedPhone });
                      }}
                      defaultCountry={defaultCountry}
                    />
                  </div>
                );
              } else if (inputType === 'country-dropdown') {
                return (
                  <div className="input-container" key={`${id}-${index}`}>
                    <Select
                      options={allCountries}
                      classNamePrefix="dropdown"
                      value={formState?.[name]}
                      onChange={(newValue) => {
                        setFormState({ ...formState, [name]: newValue });
                      }}
                    />
                  </div>
                );
              } else if (inputType === 'state-dropdown') {
                if (allRegions.length < 1) return;

                return (
                  <div className="input-container" key={`${id}-${index}`}>
                    <Select
                      options={allRegions}
                      classNamePrefix="dropdown"
                      value={formState?.[name]}
                      onChange={(newValue) => {
                        setFormState({ ...formState, [name]: newValue });
                      }}
                    />
                  </div>
                );
              } else if (inputType === 'hidden') {
                return (
                  !!field.defaultValue && (
                    <input key={`${id}-${index}`} type="hidden" name={name} value={field.defaultValue} />
                  )
                );
              }
            })
          )}
          {showOptIn && stackedSubmit && (
            <div
              className={clsx('input-opt-in', {
                '-error': showGdprError,
              })}
            >
              <input
                id="optin"
                type="checkbox"
                name="isConsent"
                checked={formState?.isConsent}
                onChange={(e) => {
                  const { name, checked } = e.target;

                  setFormState((prevState) => ({ ...prevState, [name]: checked }));

                  setIsValid(checked);
                }}
              />

              <label htmlFor="optin">
                <Markdown options={{ forceBlock: false }} extraClass="-opt-in">
                  {optInCopy}
                </Markdown>
              </label>
            </div>
          )}
          <div className="input-container submit">
            <DarksideButton type="solid" colorTheme="black" buttonType="submit">
              {isSuccessful ? formSubmissionResult : _t(ctaCopy)}
            </DarksideButton>
          </div>
        </div>
        {showOptIn && !stackedSubmit && (
          <div
            className={clsx('input-opt-in', {
              '-error': showGdprError,
            })}
          >
            <input
              type="checkbox"
              name="isConsent"
              id="optin"
              checked={formState?.isConsent}
              onChange={(e) => {
                const { checked } = e.target;

                setFormState((prevState) => ({ ...prevState, isConsent: checked }));

                setIsValid(checked);
              }}
            />

            <label htmlFor="optin">
              <Markdown options={{ forceBlock: false }} extraClass="-opt-in">
                {optInCopy}
              </Markdown>
            </label>
          </div>
        )}
      </form>
    </FormContainer>
  );
};

export { Form };

function getRegions(countryCode) {
  if (!countryCode) {
    return [];
  }

  const country = countryCode.value;

  return Provinces.byCountryCode(country).map((v) => ({
    value: v.code,
    label: v.name,
  }));
}
